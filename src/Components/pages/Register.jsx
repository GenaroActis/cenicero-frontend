import React, { useContext } from 'react'
import {UserContext} from '../../context/UserContext';
import { Link } from 'react-router-dom'

const Register = () => {
    const { register } = useContext(UserContext)
    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            firstName: document.querySelector('#firstName').value,
            lastName: document.querySelector('#lastName').value,
            email: document.querySelector('#email').value,
            age: document.querySelector('#age').value,
            password: document.querySelector('#password').value
        }
        register(userData)
    };
    return (
        <>  
            <div>
            <div className="d-flex justify-content-center p-4">
                <Link target="_blank" rel="noreferrer" className="nav-link btn btn-primary p-2 text-white fs-4" aria-current="page" to={'/'}>Login</Link>
            </div>  
                <div className="container text-white py-5 h-100">
                    <div className="row justify-content-center align-items-center h-100">
                        <div className="col-12 col-lg-9 col-xl-7">
                            <div className="card userCard shadow-2-strong card-registration" style={{ borderRadius: '15px' }}>
                                <div className="card-body p-4 p-md-5">
                                <h3 className="registerText mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
                                    <form id="formRegister" onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                <label className="form-label" htmlFor="firstName">
                                                    First Name
                                                </label>
                                                <input
                                                    placeholder='First Name'
                                                    type="text"
                                                    required
                                                    id="firstName"
                                                    name="firstName"
                                                    className="form-control form-control-lg"
                                                />
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                <label className="form-label" htmlFor="lastName">
                                                    Last Name
                                                </label>
                                                <input
                                                    placeholder='Last Name'
                                                    type="text"
                                                    required
                                                    id="lastName"
                                                    name="lastName"
                                                    className="form-control form-control-lg"
                                                />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-4 d-flex align-items-center">
                                                <div className="form-outline datepicker w-100">
                                                <label className="form-label" htmlFor="email">
                                                    Email
                                                </label>
                                                <input
                                                    placeholder='Email'
                                                    type="email"
                                                    required
                                                    className="form-control form-control-lg"
                                                    name="email"
                                                    id="email"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="column">
                                                <div>
                                                    <div className="form-outline">
                                                    <label className="form-label" htmlFor="age">
                                                        Age
                                                    </label>
                                                    <input
                                                        placeholder='Age'
                                                        type="number"
                                                        required
                                                        id="age"
                                                        name="age"
                                                        className="form-control form-control-lg"
                                                    />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="form-outline mt-2">
                                                    <label className="form-label" htmlFor="password">
                                                    Password
                                                    </label>
                                                    <input
                                                        placeholder='Password'
                                                        type="password"
                                                        required
                                                        id="password"
                                                        name="password"
                                                        className="form-control form-control-lg"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="d-flex justify-content-center mt-4 pt-2">
                                            <input className="btn btn-primary btn-lg" type="submit" value="Submit" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register