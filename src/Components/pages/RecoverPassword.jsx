import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom'

const RecoverPassword = () => {
    const { validateTokenToRecover, changePassword } = useContext(UserContext)
    let userEmail = null
    useEffect(() => {
        const verifyToken = async () => {
            const validate = await validateTokenToRecover();
            if (validate) {
                userEmail = validate.data;
            }
        };
        verifyToken();
    }, [validateTokenToRecover]); 
    const handleSubmitRecoverPass = (event) => {
        event.preventDefault();
        const email = userEmail
        const newPassword = document.querySelector('#newPassword').value
        const repeatPassword = document.querySelector('#repeatPassword').value
        changePassword(email, newPassword, repeatPassword)
    };
    return (
        <>
        <div className="d-flex justify-content-center p-4">
        <Link target="_blank" rel="noreferrer" className="nav-link btn btn-primary p-2 text-white fs-4" aria-current="page" to={'/register'}>Register</Link>
        </div>
            <div className="container text-white py-5 h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card userCard shadow-2-strong card-registration">
                            <div className="card-body p-4 p-md-5">
                            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Change your password</h3>
                                <form id="formLogin" onSubmit={handleSubmitRecoverPass}>
                                    <div className='row'>
                                        <div className="col-md-6 mb-4 d-flex align-items-center">
                                            <div className="form-outline">
                                                <input required placeholder='New Password' type="password" name="newPassword" id="newPassword" className="form-control form-control-lg" />
                                                <label className="form-label" htmlFor="newPassword">New Password</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4 d-flex align-items-center">
                                            <div className="form-outline">
                                                <input required placeholder='Repeat the password' type="password" name="repeatPassword" id="repeatPassword" className="form-control form-control-lg" />
                                                <label className="form-label" htmlFor="repeatPassword">Repeat the password</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center p-4">
                                        <input className="btn btn-primary btn-lg" type="submit" value="Submit" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecoverPassword