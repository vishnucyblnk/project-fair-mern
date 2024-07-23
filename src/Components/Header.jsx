import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaStackOverflow } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";



function Header({ insideDashboard }) {
    const navigate = useNavigate()

    const handleLogout =()=>{
        localStorage.removeItem('existingUser');
        localStorage.removeItem("Role");
        sessionStorage.removeItem('token');
        navigate('/')
    }

    return (
        <Navbar style={{ backgroundColor: '#90ee90', zIndex: '1' }} className="w-100 position-fixed top-0">
            <Container >
                <Navbar.Brand >
                    <Link to={'/'} className='fw-bold d-flex justify-content-center align-items-center' style={{ textDecoration: 'none' }} ><FaStackOverflow className='me-1'/> Project Fair</Link>
                </Navbar.Brand>
                {
                    insideDashboard &&
                    <div style={{ textDecoration: 'none' }} className=' btn btn-link ms-auto text-light fw-bolder fs-5 d-flex justify-content-center align-items-center ' onClick={handleLogout}><FaArrowRight className='me-1'/> LOGOUT </div>
                }
            </Container>
        </Navbar>
    )
}

export default Header