import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';
import Carousel from 'react-bootstrap/Carousel';
import { CarouselItem } from 'react-bootstrap';
import { ProductContext } from '../../context/ProductContext';

const Inicio = () => {

    const { getProducts } = useContext(ProductContext)
    const [cardsProducts, setCardsProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
            const data = await getProducts();
            setCardsProducts(data.results);
            setLoading(false);
            } catch (error) {
            console.error('Error:', error);
            };
        };
        fetchData();
    }, [getProducts]);

    if (loading === true){
        return (
        <div className='container-fluid' id='spinner'>
            <h1>Cargando...</h1>
        <Spinner className='spinner' animation="border"/>
        </div>
        )
    }

    return (
        <>
        <Link target="_blank" rel="noreferrer" className="nav-link" aria-current="page" to={'/products'}>
            <div className='divTodos'>
                <div className='TodosProd'>
                    <span>Productos Destacados&nbsp;&nbsp;&nbsp;</span>
                </div>
                <div className='TodosProd2'>
                    <span>Productos Destacados&nbsp;&nbsp;&nbsp;</span>
                </div>
            </div>
        </Link>
        <div id='Video'>
                {/* <div id="products">
                    <Carousel variant="dark rounded">
                    {
                    cardsProducts.map((product)=>(
                        <CarouselItem key={product.id} className='text-center'>
                            <Link id="link" className="nav-link" aria-current="page" to={`/Producto/${product.id}`}>
                                <div className="card text-dark mt-5">
                                    <img src={product.img1} className="card-img-top mt-2 img-fluid" alt={`slide ${product.id}`} srcSet="" />
                                    <div className="card-body">
                                        <h1 className="card-title">{product.nombre}</h1>
                                        <h2>Talle {product.talle}</h2>
                                        <h1 className="card-text shadow-lg p-3 mb-5 bg-white rounded">${product.precio}</h1>
                                    </div>
                                </div>
                            </Link>
                        </CarouselItem>
                    ))
                    }
                    </Carousel>
                </div> */}
                <ToastContainer/>
            <video controls>
                <source type='video/mp4' src='https://res.cloudinary.com/dsdicaf5h/video/upload/v1677263045/cenicero/Untitled_2_of5elw.mp4'/>
            </video>
        </div>
        </>
    )
}

export default Inicio