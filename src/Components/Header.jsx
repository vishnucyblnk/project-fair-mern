import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';



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
            <Container>
                <Navbar.Brand >
                    <Link to={'/'} style={{ textDecoration: 'none' }} ><i className='fa-brands fa-stack-overflow fa-bounce'></i>project fair</Link>
                </Navbar.Brand>
                {
                    insideDashboard &&
                    <div style={{ textDecoration: 'none' }} className=' btn btn-link ms-auto text-light fw-bolder fs-5' onClick={handleLogout}><i className="fa-solid fa-right-from-bracket ms-2 fa-beat "></i> LOGOUT </div>
                }
            </Container>
        </Navbar>
    )
}

export default Header