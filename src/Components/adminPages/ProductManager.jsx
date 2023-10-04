import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {ProductContext} from '../../context/ProductContext.jsx'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer} from 'react-toastify';
import { AdminContext } from '../../context/AdminContext.jsx';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fetchUrl } from '../../index.js';

const ProductManager = () => {
    const { getProducts } = useContext(ProductContext)
    const { deleteProduct } = useContext(AdminContext)
    const [cardsProducts, setCardsProducts] = useState([]);
    const [pagData, setPagData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const { page, limit, key, value, sortField, sortOrder } = useParams()
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedProductTitle, setSelectedProductTitle] = useState('');
    
    const handleClose = () => setShow(false);
    const handleShow = (productId, productTitle) => {
        setSelectedProductId(productId);
        setSelectedProductTitle(productTitle);
        setShow(true)
    };

        useEffect(() => {
            const fetchData = async () => {
                try {
                const data = await getProducts(page, limit, key, value, sortField, sortOrder);
                setCardsProducts(data.results);
                setPagData(data.info);
                setLoading(false);
                } catch (error) {
                console.log(error);
                };
            };
            fetchData();
        }, [getProducts, page, limit, key, value, sortField, sortOrder]);

        const handleDelete = async(prodId) =>{
            try {
                await deleteProduct(prodId)
                setShow(false)
            } catch (error) {
                console.log(error)
            }
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
                <div className="d-flex justify-content-center m-2 p-4">
                    <Link target="_blank" rel="noreferrer" className="nav-link btn btn-primary p-4 text-white fs-4" aria-current="page" to={'/admin'}>Admin Menu</Link>
                </div>
            <Modal id="modal" className='text-center' show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>¿ Estas seguro que quieres eliminar {selectedProductTitle} ?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={()=>
                        handleDelete(selectedProductId)
                        }>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
                <div className='d-flex flex-column justify-content-center align-items-center mt-2'>
                    <DropdownButton id="dropdown-button-drop-down-centered" drop="down-centered" variant="warning" title="Categorias">
                        <Dropdown.Item href='/admin/productManager' className='text-center'>Todos</Dropdown.Item>
                        <Dropdown.Item href='/admin/productManager/limit=10/key=category/value=chombas' className='text-center'>Chombas</Dropdown.Item>
                        <Dropdown.Item href='/admin/productManager/limit=10/key=category/value=remeras' className='text-center'>Remeras</Dropdown.Item>
                        <Dropdown.Item href='/admin/productManager/limit=10/key=category/value=pantalones' className='text-center'>Pantalones</Dropdown.Item>
                        <Dropdown.Item href='/admin/productManager/limit=10/key=category/value=bermudas' className='text-center'>Bermudas</Dropdown.Item>
                    </DropdownButton>
                        <div className="row" id="productos">
                        {cardsProducts.map((product) => (
                            <React.Fragment key={product._id}>
                            <div>
                                <Link target="_blank" rel="noreferrer" className="nav-link" aria-current="page" to={`/productModifier/${product._id}`}>
                                    <div className="card text-dark mt-2">
                                        <img src={fetchUrl + product.img} className="card-img-top mt-2 img-fluid" alt="product image" srcSet="" />
                                        <img src={fetchUrl + product.img} className="card-img img-fluid" id="img2" alt="product image" srcSet="" />
                                        <div className="card-body">
                                            <h1 className="card-title">{product.title}</h1>
                                            <h2>Talle {product.size}</h2>
                                            <h1 className="card-text shadow-lg p-3 mb-5 bg-white rounded">${product.price}</h1>
                                            <h4>code: {product.code}</h4>
                                            <h4>description: {product.description}</h4>
                                            <h4>stock: {product.stock}</h4>
                                        </div>
                                    </div>
                                </Link>
                                <button onClick={()=> handleShow( product._id, product.title )} className='trashButton btn btn-link'>
                                    <img className='trashImg' src="https://res.cloudinary.com/dsdicaf5h/image/upload/v1690465202/cenicero/trash-bin_iljdwu.png" alt="trash" />
                                </button>
                            </div>
                            </React.Fragment>
                        ))}
                    <ToastContainer/>
                    </div>
                </div>
                <div className="d-flex justify-content-center m-5">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li id='1' className={`page-item ${pagData.actualPage === 1 ? 'active' : ''}`}><Link target="_blank" rel="noreferrer" className="page-link" to={`/admin/productManager`}>1</Link></li>
                            <li id='2' className={`page-item ${pagData.actualPage === 2 ? 'active' : ''}`}><Link target="_blank" rel="noreferrer" className="page-link" to={`/admin/productManager/page=2`}>2</Link></li>
                            <li id='3' className={`page-item ${pagData.actualPage === 3 ? 'active' : ''}`}><Link target="_blank" rel="noreferrer" className="page-link" to={`/admin/productManager/page=3`}>3</Link></li>
                            <li id='4' className={`page-item ${pagData.actualPage === 4 ? 'active' : ''}`}><Link target="_blank" rel="noreferrer" className="page-link" to={`/admin/productManager/page=4`}>4</Link></li>
                        </ul>
                    </nav>
                </div>
            </>
            )
        }
}

export default ProductManager