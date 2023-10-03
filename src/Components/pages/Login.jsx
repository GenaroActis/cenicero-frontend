import React, { useContext, useState } from 'react'
import {UserContext} from '../../context/UserContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom'

const Login = () => {
    const { login, registerGithub, sendRecoverPassEmail  } = useContext(UserContext)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmitLogin = (event) => {
        event.preventDefault();
        const email = document.querySelector('#email').value
        const password = document.querySelector('#password').value
        login(email, password)
    };
    const handleSubmitGithub = (event) => {
        event.preventDefault();
        registerGithub()
    };
    const handleSubmitRecoverPass = async (event) => {
        event.preventDefault();
        const email = document.querySelector('#recoverEmail').value
        const res = await sendRecoverPassEmail(email)
        if(res) handleClose()
    };
    return (
    <>  
    <div className="d-flex justify-content-center p-4">
        <Link target="_blank" rel="noreferrer" className="nav-link btn btn-primary p-2 text-white fs-4" aria-current="page" to={'/register'}>Register</Link>
    </div>
    <div className="d-flex justify-content-center p-4">
        <button onClick={handleSubmitGithub} className="btn btn-success">
            <svg aria-hidden="true" className="octicon octicon-mark-github" height="24" version="1.1" viewBox="0 0 16 16" width="24"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
        </button>
    </div>  
        <div className="container text-white py-5 h-100">
            <div className="row justify-content-center align-items-center h-100">
                <div className="col-12 col-lg-9 col-xl-7">
                    <div className="card userCard shadow-2-strong card-registration">
                        <div className="card-body p-4 p-md-5">
                        <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Login Form</h3>
                            <form id="formLogin" onSubmit={handleSubmitLogin}>
                                <div className="row">
                                    <div className="col-md-6 mb-4 d-flex align-items-center">
                                        <div className="form-outline datepicker w-100">
                                            <input required placeholder='Email' type="email" name="email" className="form-control form-control-lg" id="email" />
                                            <label htmlFor="email" className="form-label">Email</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4 d-flex align-items-center">
                                        <div className="form-outline">
                                            <input required placeholder='Password' type="password" name="password" id="password" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="password">Password</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center p-4">
                                    <input className="btn btn-primary btn-lg" type="submit" value="Submit" />
                                </div>
                            </form>
                            <Button variant="primary" onClick={handleShow}>
                            Forgot my password
                            </Button>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Enter your email</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <input required placeholder='Email' type="email" name="recoverEmail" id="recoverEmail" className="form-control form-control-lg" />
                                    <label className="form-label" htmlFor="recoverEmail">Email</label>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleSubmitRecoverPass}>
                                    Send recovery email
                                </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Login