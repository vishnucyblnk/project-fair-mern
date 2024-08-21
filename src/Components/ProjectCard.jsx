import React, { useState } from 'react'
import { Card, Col, Modal, Row } from 'react-bootstrap'
import PROJECT1IMG from "../Assets/project1.png"
import { BASEURL } from '../services/baseUrl';
import { FaGithub } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";



function ProjectCard({ project }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            {project && <Card className='shadow mb-5 btn' onClick={handleShow}>
                <Card.Img variant="top" src={project?.projectImage ? `${BASEURL}/uploads/images/${project.projectImage}` : PROJECT1IMG} />
                <Card.Body>
                    <Card.Title>{project.title}</Card.Title>
                </Card.Body>
            </Card>}

            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Project Details</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col>
                            <img style={{ height: '200px' }} className='img-fluid' src={`${BASEURL}/uploads/images/${project.projectImage}`} alt="single project" />
                        </Col>
                        <Col>
                            <h2>{project.title}</h2>
                            <p>{project.overview}</p>
                            <div className='d-flex justify-content-around align-items-center mb-3'>
                                <a className='btn border border-black me-5' target='_blank' href={project.website} ><TbWorldWww size={30}/> </a>
                                <a className='btn border border-black me-5' target='_blank' href=   {project.github} ><FaGithub size={30}/> </a>
                                
                            </div>
                            <p>Language Used: <span className='ms-2 fw-bolder'>{project.languages}</span></p>
                            
                            
                        </Col>
                    </Row>
                    
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ProjectCard