import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { addProjectAPI } from '../services/allApis';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { addProjectResponseContext } from '../Context/ContextShare';

function AddProject() {
    const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContext)
    const [show, setShow] = useState(false);
    const [token, setToken] = useState("");
    const [projectdetails, setProjectdetails] = useState({
        title: "", languages: "", github: "", website: "", overview: "", image: "", userId: ""
    })
    const [preview, setPreview] = useState("")

    useEffect(() => {
        if (localStorage.getItem("existingUser") && sessionStorage.getItem("token")) {
            setProjectdetails({ ...projectdetails, userId: JSON.parse(localStorage.getItem("existingUser"))._id })
            setToken(sessionStorage.getItem("token"))
        }
    }, [])

    useEffect(() => {
        if (projectdetails.image) {
            setPreview(URL.createObjectURL(projectdetails.image))
        }
    }, [projectdetails.image])

    //console.log(projectdetails);

    const handleClose = () => {
        setShow(false)
        setPreview("")
        setProjectdetails({
            title: "", languages: "", github: "", website: "", overview: "", image: "", userId: ""
        })
    }
    const handleShow = () => setShow(true);

    const handleSave = async (e) => {
        e.preventDefault()
        const { title, languages, github, website, overview, image, userId } = projectdetails
        if (!title || !languages || !github || !website || !overview || !image || !userId) {
            toast.info("please fill the form completely")
        } else {
            const reqBody = new FormData()
            reqBody.append("title", title)
            reqBody.append("languages", languages)
            reqBody.append("github", github)
            reqBody.append("website", website)
            reqBody.append("overview", overview)
            reqBody.append("projectImage", image)
            reqBody.append("userId", userId)
            const reqHeader = {
                "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}`
            }
            const result = await addProjectAPI(reqBody, reqHeader)
            if (result.status === 200) {
                toast.success(`Project ${result.data.title} added Successfully...`)
                setProjectdetails({
                    title: "", languages: "", github: "", website: "", overview: "", image: ""
                })
                setAddProjectResponse(result.data)
                handleClose()
            } else {
                toast.warning(result.response.data)
                console.log(result);
            }
        }
    }


    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add Project
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size='lg' Centered>
                <Modal.Header closeButton>
                    <Modal.Title>Project Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <label className='text-center' htmlFor="projectpic">
                                <input id='projectpic' onChange={e => setProjectdetails({ ...projectdetails, image: e.target.files[0] })} type="file" style={{ display: 'none' }} />
                                <img width={'100%'} height={'200px'} src={preview ? preview : "https://www.pngkey.com/png/full/233-2332677_ega-png.png"} alt="profile-pic" />
                            </label>
                        </div>
                        <div className='col-lg-6'>
                            <input type="text" className='form-control' placeholder='Project Name' value={projectdetails.title} onChange={e => setProjectdetails({ ...projectdetails, title: e.target.value })} />
                            <input type="text" className='form-control' placeholder='Language Used' value={projectdetails.languages} onChange={e => setProjectdetails({ ...projectdetails, languages: e.target.value })} />
                            <input type="text" className='form-control' placeholder='Github Link' value={projectdetails.github} onChange={e => setProjectdetails({ ...projectdetails, github: e.target.value })} />
                            <input type="text" className='form-control' placeholder='Website Link' value={projectdetails.website} onChange={e => setProjectdetails({ ...projectdetails, website: e.target.value })} />
                        </div>
                    </div>
                    <input type="text" className='form-control' placeholder='Project Overview' value={projectdetails.overview} onChange={e => setProjectdetails({ ...projectdetails, overview: e.target.value })} />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position="top-center" autoClose={5000} theme="colored" />
        </>
    )
}

export default AddProject