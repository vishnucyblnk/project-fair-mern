import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Img1 from '../Assets/landingpageimg.webp'
import HomeProjects from '../Components/HomeProjects'
import { Link } from 'react-router-dom'
import { homeProjectsAPI } from '../services/allApis';
import { FaStackOverflow } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

function PFHome() {
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [allProjects, setAllProjects] = useState([])

    const getHomeProject = async () => {
        const result = await homeProjectsAPI()
        if (result.status === 200) {
            setAllProjects(result.data)
        } else {
            alert(result.response.data)
        }
    }
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
        getHomeProject()
    }, [])

    return (
        <>
            {/* landing section */}
            <div className='container-fluid rounded' style={{ width: '100%', height: '100vh', backgroundColor: '#90ee90' }}>
                <Row className='align-items-center p-5'>
                    <Col sm={12} md={6}>
                        <h1 style={{ fontSize: '80px' }} className='text-light d-flex justify-content-center align-items-center'><FaStackOverflow /> Project Fair</h1>
                        <p>One step destination for all software development projects....</p>
                        {
                            isLoggedIn ?
                                <Link to={'/dashboard'} className='btn btn-warning'>Manage your project <FaArrowRight /></Link>
                                :
                                <Link to={'/login'} className='btn btn-warning'>START TO EXPLORE <FaArrowRight /></Link>
                        }
                    </Col>
                    <Col sm={12} md={6}>
                        <img style={{ marginTop: '100px' }} className='img-fluid w-75' src={Img1} alt=" project fair" />
                    </Col>
                </Row>
            </div>
            {/* glimps of all projects */}
            <div className='all-projects mt-5'>
                <HomeProjects allProjects={allProjects} />
            </div>
        </>
    )
}

export default PFHome