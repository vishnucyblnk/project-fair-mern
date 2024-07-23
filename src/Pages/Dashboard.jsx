import React, { useEffect, useState } from 'react'
import { Container, Navbar, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../Components/Header'
import MyProjects from '../Components/MyProjects'
import Profile from '../Components/Profile'



function Dashboard() {
    const [username, setUsername] = useState("")
    const [token,setToken] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
            const existingUser = localStorage.getItem("existingUser")
            if (existingUser) {
                try {
                    const user = JSON.parse(existingUser)
                    setUsername(user.username)
                } catch (error) {
                    console.error("Error parsing existingUser from localStorage", error)
                }
            } else {
                console.error("existingUser not found in localStorage")
            }
        } else {
            setUsername('')
            alert("Please Login!!!")
            navigate('/login')
        }
    }, [username])


    return (
        <>
            <Header insideDashboard={true} />

            <Row style={{ marginTop: '100px' }} className='container-fluid'>
                <Col sm={12} md={8} className='mt-5'>

                    <h1 >Welcome <span className='text-warning'>{username}</span></h1>
                    {/* my projects */}
                    { token && <MyProjects /> }

                </Col>
                <Col sm={12} md={4} className='mt-5'>
                    {/* profile section */}
                    {token && <Profile /> }
                </Col>
            </Row>


        </>
    )
}

export default Dashboard