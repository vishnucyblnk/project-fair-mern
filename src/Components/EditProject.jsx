import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { BASEURL } from '../services/baseUrl';
import { editProjectAPI } from '../services/allApis';
import { editProjectResponseContext } from '../Context/ContextShare';
import { FaPenToSquare } from "react-icons/fa6";

function EditProject({ displayData }) {

    const { editProjectResponse, setEditProjectResponse } = useContext(editProjectResponseContext)
    const [show, setShow] = useState(false);
    const [preview, setPreview] = useState("")
    const [project, setProject] = useState({
        id: displayData._id, title: displayData.title, languages: displayData.languages, github: displayData.github, website: displayData.website, overview: displayData.overview, projectImage: ""
    })

    useEffect(() => {
        if (project.projectImage) {
            setPreview(URL.createObjectURL(project.projectImage))
        } else {
            setPreview("")
        }
    }, [project.projectImage])

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false)
        setPreview("")
        setProject({
            id: displayData._id, title: displayData.title, languages: displayData.languages, github: displayData.github, website: displayData.website, overview: displayData.overview, projectImage: ""
        })
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const { id, title, languages, github, website, overview, projectImage } = project
        if (!title || !languages || !github || !website || !overview) {
            alert("please fill the form completely")
        } else {
            const token = sessionStorage.getItem("token")
            const reqBody = new FormData()
            reqBody.append("title", title)
            reqBody.append("languages", languages)
            reqBody.append("github", github)
            reqBody.append("website", website)
            reqBody.append("overview", overview)
            projectImage ? reqBody.append("projectImage", projectImage) : reqBody.append("projectImage", displayData.projectImage)
            if (preview) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}`
                }
                const result = await editProjectAPI(id, reqBody, reqHeader)
                if (result.status === 200) {
                    // modal closed
                    handleClose()
                } else {
                    console.log(result);
                    alert(result.response.data)
                }

            } else {
                const reqHeader = {
                    "Content-Type": "application/json", "Authorization": `Bearer ${token}`
                }
                const result = await editProjectAPI(id, reqBody, reqHeader)
                if (result.status === 200) {
                    // modal closed
                    handleClose()
                    // share response with my project
                    setEditProjectResponse(result.data)

                } else {
                    console.log(result);
                    alert(result.response.data)
                }
            }
        }
    }

    return (
        <>
            <button onClick={handleShow} className='btn border border-black me-1'>
                <FaPenToSquare size={30}/>
            </button>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size='lg' Centered>
                <Modal.Header closeButton>
                    <Modal.Title>Project Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <label className='text-center' htmlFor="projectpic">
                                <input id='projectpic' type="file" style={{ display: 'none' }} onChange={e => setProject({ ...project, projectImage: e.target.files[0] })} />
                                <img width={'100%'} height={'200px'} src={preview ? preview : `${BASEURL}/uploads/images/${displayData.projectImage}`} alt="profile-pic" />
                            </label>
                        </div>
                        <div className='col-lg-6'>
                            <input type="text" className='form-control' placeholder='Project Name' value={project.title ? project.title : displayData.title} onChange={e => setProject({ ...project, title: e.target.value })} />
                            <input type="text" className='form-control' placeholder='Language Used' value={project.languages ? project.languages : displayData.languages} onChange={e => setProject({ ...project, languages: e.target.value })} />
                            <input type="text" className='form-control' placeholder='Github Link' value={project.github ? project.github : displayData.github} onChange={e => setProject({ ...project, github: e.target.value })} />
                            <input type="text" className='form-control' placeholder='Website Link' value={project.website ? project.website : displayData.website} onChange={e => setProject({ ...project, website: e.target.value })} />
                        </div>
                    </div>
                    <input type="text" className='form-control' placeholder='Project Overview' value={project.overview ? project.overview : displayData.overview} onChange={e => setProject({ ...project, overview: e.target.value })} />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} variant="primary">
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditProject