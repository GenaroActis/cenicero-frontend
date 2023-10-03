import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext';
import { Link, useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer} from 'react-toastify';

const SalesHistory = () => {
    const { getPurchases } = useContext(AdminContext)
    const [cardsPurchases, setCardsPurchases] = useState([]);
    const [pagData, setPagData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const { page, limit, key, value, sortField, sortOrder } = useParams()
    
    const fetchData = async () => {
        try {
        const data = await getPurchases(page, limit, key, value, sortField, sortOrder);
        setCardsPurchases(data.results);
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
                    {cardsPurchases.map((purchase) => (
                            <div key={purchase._id} className="card text-dark mt-5">
                                <div className="card-body">
                                    <h1 className="card-title">Comprador: {purchase.purchaser.fullName}</h1>
                                    <h2>Email: {purchase.purchaser.emailBuyer}</h2>
                                    <h5>Code: {purchase.code}</h5>
                                    <h4>Fecha: {purchase.purchaseDataTime}</h4>
                                    <h4>Telefono: {purchase.purchaser.cellPhone}</h4>
                                    <h1 className="card-text shadow-lg p-3 mb-2 bg-white rounded">Precio: ${purchase.totalPrice}</h1>
                                    <Link target="_blank" rel="noreferrer" key={purchase._id} className="btn btn-warning" aria-current="page" to={`/confirmedPurchase/${purchase.code}`}>
                                    Ver productos
                                    </Link>
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

export default SalesHistory