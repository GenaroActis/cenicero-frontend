import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AdminContext } from '../../context/AdminContext'
import Spinner from 'react-bootstrap/Spinner';

const AdminMenu = () => {
    const { ensureIsAdmOrPrem } = useContext(AdminContext)
    const [loading, setLoading] = useState(true);
    const verifyAdmOrPrem = async() =>{
        const ensureFunct = await ensureIsAdmOrPrem()
        if(ensureFunct) setLoading(false)
    };
    useEffect(() => {
        verifyAdmOrPrem();
    });

    if (loading === true){
        return (
        <div className='container-fluid' id='spinner'>
            <h1>Cargando...</h1>
        <Spinner className='spinner' animation="border"/>
        </div>
        )
    } else {
        
        return (
            <>
            <div className='userCard m-5'>
                <div className="d-flex justify-content-center m-4 p-4">
                    <Link target="_blank" rel="noreferrer" className="nav-link btn btn-light p-4 text-dark fs-4" aria-current="page" to={'/admin/createProduct'}>Crear Producto</Link>
                </div>
                <div className="d-flex justify-content-center m-4 p-4">
                    <Link target="_blank" rel="noreferrer" className="nav-link btn btn-light p-4 text-dark fs-4" aria-current="page" to={'/admin/productManager'}>Modificar Productos</Link>
                </div>
                <div className="d-flex justify-content-center m-4 p-4">
                    <Link target="_blank" rel="noreferrer" className="nav-link btn btn-light p-4 text-dark fs-4" aria-current="page" to={'/admin/salesHistory'}>Historial de Ventas</Link>
                </div>
                <div className="d-flex justify-content-center m-4 p-4">
                    <Link target="_blank" rel="noreferrer" className="nav-link btn btn-light p-4 text-dark fs-4" aria-current="page" to={'/admin/users'}>Usuarios</Link>
                </div>
            </div>
            </>
        )
    }
}
export default AdminMenu
