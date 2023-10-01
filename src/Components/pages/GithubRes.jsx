import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from 'react-router-dom';


const GithubRes = () => {
    const { token } = useParams()
    if(token){
        localStorage.setItem('token', token);
        window.location.href = 'http://localhost:3000/products'
    }
    return (
        <div className='container-fluid' id='spinner'>
            <h1>Cargando...</h1>
        <Spinner className='spinner' animation="border"/>
        </div>
    )
}

export default GithubRes