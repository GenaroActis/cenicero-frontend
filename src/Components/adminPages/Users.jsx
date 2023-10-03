import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext';
import { Link, useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer} from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Users = () => {
    const { getUsers, changeRole } = useContext(AdminContext)
    const [cardsUsers, setCardsUsers] = useState([]);
    const [pagData, setPagData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const { page, limit, key, value, sortField, sortOrder } = useParams()
    
    const fetchData = async () => {
        try {
        const data = await getUsers(page, limit, key, value, sortField, sortOrder);
        setCardsUsers(data.results);
        setPagData(data.info);
        if(data.userData.role === 'admin') setIsAdmin(true)
        setLoading(false);
        } catch (error) {
        throw new Error (error)
        };
    };
    useEffect(() => {
        fetchData();
    });
    const handleChange = async (user) =>{
        const res = await changeRole(user)
        if(res.message === 'Success') fetchData()
    }

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
        <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
                <div className="row" id="productos">
                {cardsUsers.map((user) => (
                        <div key={user._id} className="card text-dark mt-5">
                            <div className="card-body">
                                <h1 className="card-title">Nombre: {user.firstName}</h1>
                                <h2>Apellido: {user.lastName}</h2>
                                <h3>{user.email}</h3>
                                <h4>Id: {user.id}</h4>
                                <h1 className="card-text shadow-lg p-3 mb-5 bg-white rounded">role: {user.role}</h1>
                                {user.role !== 'admin' && 
                                    isAdmin === true &&  
                                    <>
                                    <Button variant="primary" onClick={()=> handleChange(user)}>
                                        {user.role === 'premium' && 'Modificar Role a User'}
                                        {user.role === 'user' && 'Modificar Role a Premium'}
                                    </Button>
                                    </> 
                                }   
                            </div>
                        </div>
                ))}
            <ToastContainer/>
            </div>
        </div>
        <div className="d-flex justify-content-center m-5">
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                {pagData.hasPrevPage && (
                    <li className="page-item">
                        <Link target="_blank" rel="noreferrer" className="page-link" to={pagData.prevPageLink}>
                            Previous
                        </Link>
                    </li>
                )}
                    <li id='1' className={`page-item ${pagData.actualPage === 1 ? 'active' : ''}`}><Link target="_blank" rel="noreferrer" className="page-link" to={`/products`}>1</Link></li>
                    <li id='2' className={`page-item ${pagData.actualPage === 2 ? 'active' : ''}`}><Link target="_blank" rel="noreferrer" className="page-link" to={`/products/page=2`}>2</Link></li>
                    <li id='3' className={`page-item ${pagData.actualPage === 3 ? 'active' : ''}`}><Link target="_blank" rel="noreferrer" className="page-link" to={`/products/page=3`}>3</Link></li>
                    <li id='4' className={`page-item ${pagData.actualPage === 4 ? 'active' : ''}`}><Link target="_blank" rel="noreferrer" className="page-link" to={`/products/page=4`}>4</Link></li>
                {pagData.hasNextPage && (
                    <li className="page-item">
                        <Link target="_blank" rel="noreferrer" className="page-link" to={pagData.nextPageLink}>
                            Next
                        </Link>
                    </li>
                )}
                </ul>
            </nav>
        </div>
        </>
        )
    }
}

export default Users