import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import { deleteProjectAPI, userProjectAPI } from '../services/allApis'
import { addProjectResponseContext, editProjectResponseContext } from '../Context/ContextShare'
import EditProject from './EditProject';
import { FaGithub } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

function MyProjects() {
    const { editProjectResponse, setEditProjectResponse } = useContext(editProjectResponseContext)
    const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContext)
    const [projects, setProjects] = useState([])
    const [token, setToken] = useState("")

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }
    }, [])

    useEffect(() => {
        if (token) {
            getUserProjects()
        }
    }, [token, addProjectResponse, editProjectResponse])

    const getUserProjects = async () => {
        const reqHeader = {
            "Content-Type": "application/json", "Authorization": `Bearer ${token}`
        }
        const result = await userProjectAPI(reqHeader)
        if (result.status === 200) {
            setProjects(result.data)
        } else {
            alert(result.response.data)
        }
    }

    const handleDelete = async (e, id) => {
        e.preventDefault()
        const reqHeader = {
            "Content-Type": "application/json", "Authorization": `Bearer ${token}`
        }
        const result = await deleteProjectAPI(id, reqHeader)
        if (result.status === 200) {
            getUserProjects()
        } else {
            console.log(result);
            alert(result.response.data)
        }
    }

    return (
        <div className='card shadow p-3 mt-5'>
            <div className='d-flex'>
                <h3>My Projects</h3>
                <div className='ms-auto'>
                    <AddProject />
                </div>
            </div>
            <div className='mt-4'>
                {/* display user projects */}
                {
                    projects?.length > 0 ? projects?.map(project => (
                        <div className='border d-flex align-items-center rounded text-primary p-2'>
                            <h4>{project.title}</h4>
                            <div className=' icons ms-auto'>
                                <EditProject displayData={project} />
                                <a className='btn' href={`${project.github}`} target='_blank'><FaGithub size={30}/> </a>
                                <button onClick={(e) => handleDelete(e, project._id)} className='btn'><FaTrash size={30}/> </button>
                            </div>
                        </div>
                    ))
                        :
                        <p className='text-danger fs-3'>No projects uploaded</p>
                }
            </div>
        </div>
    )
}

export default MyProjects