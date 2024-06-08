import React, { useEffect, useState } from 'react'
import { Container, Navbar, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Header from '../Components/Header'
import MyProjects from '../Components/MyProjects'
import Profile from '../Components/Profile'



function Dashboard() {
    const [username, setUsername] = useState("")

    useEffect(() => {
        if (localStorage.getItem("existingUser")) {
            setUsername(JSON.parse(localStorage.getItem("existingUser")).username)
        }
    }, [])
    return (
        <>
            <Header insideDashboard={true} />

            <Row style={{ marginTop: '100px' }} className='container-fluid'>
                <Col sm={12} md={8} className='mt-5'>

                    <h1 >Welcome <span className='text-warning'>{username}</span></h1>
                    {/* my projects */}
                    <MyProjects />

                </Col>
                <Col sm={12} md={4} className='mt-5'>
                    {/* profile section */}
                    <Profile />
                </Col>
            </Row>


        </>
    )
}

export default Dashboard