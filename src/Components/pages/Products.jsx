import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer} from 'react-toastify';
import { ProductContext } from '../../context/ProductContext'
import { fetchUrl } from '../../index.js';

const Products = () => {
    const { getProducts } = useContext(ProductContext)
    const [cardsProducts, setCardsProducts] = useState([]);
    const [pagData, setPagData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { page, limit, key, value, sortField, sortOrder } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
            const data = await getProducts(page, limit, key, value, sortField, sortOrder);
            setCardsProducts(data.results);
            setPagData(data.info);
            setLoading(false);
            } catch (error) {
            console.error('Error:', error);
            };
        };
        fetchData();
    }, [getProducts, page, limit, key, value, sortField, sortOrder]);

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
            <DropdownButton id="dropdown-button-drop-down-centered" drop="down-centered" variant="warning" title="Categorias">
                <Dropdown.Item href='/products' className='text-center'>Todos</Dropdown.Item>
                <Dropdown.Item href='/products/limit=10/key=category/value=chombas' className='text-center'>Chombas</Dropdown.Item>
                <Dropdown.Item href='/products/limit=10/key=category/value=remeras' className='text-center'>Remeras</Dropdown.Item>
                <Dropdown.Item href='/products/limit=10/key=category/value=pantalones' className='text-center'>Pantalones</Dropdown.Item>
                <Dropdown.Item href='/products/limit=10/key=category/value=bermudas' className='text-center'>Bermudas</Dropdown.Item>
            </DropdownButton>
                <div className="row" id="productos">
                {cardsProducts.map((product) => (
                    <Link target="_blank" rel="noreferrer" key={product._id} className="nav-link" aria-current="page" to={`/producto/${product._id}`}>
                        <div className="card text-dark mt-5">
                            <img src= {fetchUrl + product.img} className="card-img-top mt-2 img-fluid" alt="product image" srcSet="" />
                            <img src={fetchUrl + product.img} className="card-img img-fluid" id="img2" alt="" srcSet="" />
                            <div className="card-body">
                                <h1 className="card-title">{product.title}</h1>
                                <h2>Talle {product.size}</h2>
                                <h1 className="card-text shadow-lg p-3 mb-5 bg-white rounded">${product.price}</h1>
                            </div>
                        </div>
                    </Link>
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

export default Products