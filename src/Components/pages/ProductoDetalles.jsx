import React, { useState, useEffect, Fragment, useContext} from 'react'
import { useParams } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductContext } from '../../context/ProductContext';
import { CartContext } from '../../context/CartContext';
import Spinner from 'react-bootstrap/Spinner';
import { fetchUrl } from '../../index.js';


const  Producto = () => {
    const { getProductById } = useContext(ProductContext);
    const { addProductToCart } = useContext(CartContext);
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
            const data = await getProductById(id);
            setProduct(data);
            setLoading(false);
            } catch (error) {
            throw new Error (error);
            };
        };
        fetchData();
    }, [id]);

    if (loading === true){
        return (
        
        <div className='container-fluid' id='spinner'>
            <h1>Cargando...</h1>
        <Spinner className='spinner' animation="border"/>
        </div>
        )
    }
    return (
        <div key={product._id} id='detalleProducto'>
            <>
                <React.Fragment key={product._id}>
                    <div id='carousel'>
                        <Carousel variant="dark rounded">
                            <Carousel.Item>
                                <img
                                className="d-block w-100 img-fluid rounded"
                                src={fetchUrl+product.img}
                                alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100 rounded"
                                src={fetchUrl+product.img}
                                alt="Second slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100 rounded"
                                src={fetchUrl+product.img}
                                alt="Third slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </div>
                    <div id='cardDetalles'>
                        <Card>
                            <Card.Body className='text-center'>
                                <Card.Title id='nombre' className="display-1 shadow-lg p-3 mb-5 bg-white rounded">{product.title}</Card.Title>
                                <Card.Text id='medidas' className="display-3 shadow-lg p-3 mb-5 bg-white rounded">
                                Talle {product.size} <br />
                                {product.description} 
                                </Card.Text>
                                <Card.Text id='precio' className="display-1 shadow-lg p-3 mb-5 bg-white rounded">
                                ${product.price}
                                </Card.Text>
                                <div className="d-grid gap-2 col-6 mx-auto">
                                <button id='botonAgregar' onClick={()=>{
                                    addProductToCart(product._id)
                                }} type="button" className='btn btn-lg btn-outline-primary'>agregar</button>
                                </div>
                                <ToastContainer/>
                            </Card.Body>
                        </Card>
                    </div>
                </React.Fragment>
            </>
        </div>
    )
};



export default Producto