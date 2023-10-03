import React, { createContext } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { fetchUrl, frontUrl } from '../index.js';
export const UserContext = createContext();

const UserProvider = ({children}) =>{

    const generateNotifyError = (msg) => toast.error(msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        content : 0,
        theme: "colored",
    });

    const generateNotifySuccess = (msg) => toast.success(msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        content : 0,
        theme: "colored",
    });

    const register = async (userData) =>{
        try {
            const response = await fetch(`${fetchUrl}/api/user/register`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                window.location.href = `${frontUrl}/`
                await response.json();
            } else {
                const error = await response.json()
                if(error.errors){
                    if(error.errors[0].msg === 'VeryShort'){
                        generateNotifyError('Password must have 6 or more characters!')
                    }
                    if(error.errors === 'EmailAlreadyRegistered'){
                        generateNotifyError('There is already a registered user with this email!')
                    }
                    if(error.errors[0].msg === 'InvalidEmail'){
                        generateNotifyError('Enter a valid email!')
                    }
                } else{
                    throw new Error('Error en la solicitud');
                }
            }
        } catch (error) {
            throw new Error(error)
        };
    };

    const login = async (userEmail, userPassword) =>{
        try {
            const userData = {email: userEmail, password: userPassword}
            const response = await fetch(`${fetchUrl}/api/user/login`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                const res = await response.json()
                const token = res.accessToken
                localStorage.setItem('token', token);
                window.location.href = `${frontUrl}/products`
            } else {
                const error= await response.json()
                if(error.errors === 'isGithub') generateNotifyError('This user was registered from github!')
                else generateNotifyError('Wrong email or password!');
            };
        } catch (error) {
            throw new Error(error)
        };
    };

    const registerGithub = async () =>{
        try {
            window.location.href = `${fetchUrl}/api/user/register-github`
        } catch (error) {
            throw new Error(error)
        };
    };

    const logout = async () =>{
        try {
            const response = await fetch(`${fetchUrl}/api/user/logout`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                await response.json();
            } else {
                throw new Error('Error en la solicitud');
            }
        } catch (error) {
            throw new Error(error)
        };
    };

    const sendRecoverPassEmail = async (userEmail) =>{
        try {
            const userData = {email: userEmail}
            const response = await fetch(`${fetchUrl}/api/email/recover`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                const res = await response.json()
                const token = res.validateToken;
                localStorage.setItem('tokenRecoverPass', token);
                generateNotifySuccess('Email sent correctly check your inbox!')
                return response
            } else {
                const error= await response.json()
                if(error.errors === 'isGithub') generateNotifyError('This user was registered from github!')
                if(error.errors === 'theMailIsNotRegistered') generateNotifyError('No user was found with this email');
            };
        } catch (error) {
            throw new Error(error)
        };
    };

    const validateTokenToRecover = async () =>{
        try {
            const tokenRecover = localStorage.getItem('tokenRecoverPass');
            const response = await fetch(`${fetchUrl}/api/user/recover`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tokenRecover,
                },
            });
            if (response.ok) {
                const res = await response.json();
                return res
            } else {
                generateNotifyError('The time has passed to recover your password, try again!')
                setTimeout( ()=>{window.location.href = `${frontUrl}/`}, 2000)
            }
        } catch (error) {
            throw new Error(error)
        };
    };

    const changePassword = async (email, newPassword, repeatPassword) =>{
        try {
            if(newPassword === repeatPassword) {
                const userData = {
                    email: email,
                    newPassword: newPassword
                }
                const response = await fetch(`${fetchUrl}/api/user/recover`, {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });
                if (response.ok) {
                    await response.json();
                    localStorage.removeItem('tokenRecoverPass');
                    window.location.href = `${frontUrl}/`
                } else {
                    const error = await response.json()
                    if(error.errors){
                        if(error.errors[0].msg === 'VeryShort'){
                            generateNotifyError('Password must have 6 or more characters!')
                        }
                        if(error.errors === 'thePasswordsAreTheSame'){
                            generateNotifyError('This is the current password!')
                        }
                    } else{
                        throw new Error('Error en la solicitud');
                    }
                }
            } else{
                generateNotifyError('Passwords have to be the same')
                return false
            }
        } catch (error) {
            throw new Error(error)
        };
    };

    return(
        <UserContext.Provider value={{ changePassword, validateTokenToRecover, sendRecoverPassEmail, register, login, registerGithub, logout}}>
        {children}
        </UserContext.Provider>
    )
}



export default UserProvider;  