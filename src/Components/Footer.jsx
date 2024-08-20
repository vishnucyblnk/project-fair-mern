import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin, FaStackOverflow } from "react-icons/fa";

function Footer() {
    return (
        <div className='d-flex flex-column align-items-center justify-content-center mt-2' style={{ backgroundColor: '#90ee90', zIndex: '1', width: '100%', height: '400px' }}>
            <div className='footer d-flex flex-wrap justify-content-evenly w-100'>
                <div style={{ width: '400px' }} className='website'>
                    <h4 className='d-flex fw-bold'>
                        <FaStackOverflow />
                        Project Fair
                    </h4>
                    <h5>Designed and build with all the love in the world by the Bootstrap team with the help of our contributors</h5>
                    <h6>Code licensed MIT</h6>
                    <p>Currently v5.3.2</p>
                </div>
                <div className='link d-flex flex-column '>
                    <h4>Links</h4>
                    <Link to={'/'} style={{ textDecoration: 'none', color: '#444' }}>PFHome page</Link>
                    <Link to={'/login'} style={{ textDecoration: 'none', color: '#444' }}>Login page</Link>
                    <Link to={'/register'} style={{ textDecoration: 'none', color: '#444' }}>Register page </Link>
                    <Link to={'/dashboard'} style={{ textDecoration: 'none', color: '#444' }}>Dashboard </Link>
                    <Link to={'/projects'} style={{ textDecoration: 'none', color: '#444' }}>projects page</Link>



                </div>
                <div className='guide d-flex flex-column '>
                    <h4>Guides</h4>
                    <Link to={'https://react.dev/'} target='_blank' style={{ textDecoration: 'none', color: '#444' }}>React</Link>
                    <Link to={'https://react-bootstrap.netlify.app/'} target='_blank' style={{ textDecoration: 'none', color: '#444' }}>React Bootstrap</Link>
                    <Link to={'https://www.w3schools.com/react/react_router.asp'} target='_blank' style={{ textDecoration: 'none', color: '#444' }}>Routing </Link>
                    <Link to={'https://redux-toolkit.js.org/'} target='_blank' style={{ textDecoration: 'none', color: '#444' }}>Redux-Toolkit </Link>

                </div>
                <div>
                    <h4>Contact Us</h4>
                    <input className='p-1 rounded' type="email" placeholder='enter your email id' />
                    <button className='btn btn-primary p-1 ms-3 '>Subscribe</button>
                    <div className='m-4 icons '>
                        <Link className='p-3 text-dark text-decoration-none ' to="https://github.com/vishnucyblnk" target="_blank" rel="noopener noreferrer">
                            <FaGithub size={50} />
                        </Link>
                        <Link className='p-3 text-dark text-decoration-none ' to="https://www.instagram.com/vishnunair_b/" target="_blank" rel="noopener noreferrer">
                            <FaInstagram size={50} />
                        </Link>
                        <Link className='p-3 text-dark text-decoration-none ' to="https://www.linkedin.com/in/vishnu-nair-b-dev" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin size={50} />
                        </Link>
                    </div>
                </div>
            </div>
            <p>Copyright © 2023 Project Fair. Build with React.  </p>
        </div>
    )
}

export default Footer