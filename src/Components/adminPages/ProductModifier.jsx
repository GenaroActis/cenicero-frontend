import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductContext } from '../../context/ProductContext';
import Spinner from 'react-bootstrap/Spinner';
import { AdminContext } from '../../context/AdminContext';
import Carousel from 'react-bootstrap/Carousel';
const ProductModifier = () => {
        const { getProductById } = useContext(ProductContext);
        const { updateProduct } = useContext(AdminContext);
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
                console.log(error);
                };
            };
            fetchData();
        }, [getProductById, id]);

        const handleMod= async (event) => {
            try {
                event.preventDefault();
                const title = document.querySelector("#title").value
                const size = document.querySelector("#size").value
                const description = document.querySelector("#description").value
                const price = document.querySelector("#price").value
                const stock = document.querySelector("#stocks").value
                const category = document.querySelector("#categorys").value
                const prodUpdated = {
                    title: title === '' ? product.title : title,
                    size: size === '' ? product.size : size,
                    description: description === '' ? product.description : description,
                    price: price === '' ? product.price : price,
                    stock: stock === '' ? product.stock : stock,
                    category: category === '' ? product.category : category,
                }
                await updateProduct(id, prodUpdated)
            } catch (error) {
                console.error(error);
            }
        };

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
            <div className="d-flex justify-content-center m-4 p-4">
                <Link target="_blank" rel="noreferrer" className="nav-link btn btn-primary p-4 text-white fs-4" aria-current="page" to={'/admin'}>Admin Menu</Link>
            </div>
            <div key={id} id='detalleProducto'>
                <>
                    <React.Fragment key={product.id}>
                        <div id='carousel'>
                            <Carousel variant="dark rounded">
                                <Carousel.Item>
                                    <img
                                    className="d-block w-100 img-fluid rounded"
                                    src={product.img}
                                    alt="First slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                    className="d-block w-100 rounded"
                                    src={product.img}
                                    alt="Second slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                    className="d-block w-100 rounded"
                                    src={product.img}
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
                                    Size {product.size} <br />
                                    {product.description} 
                                    </Card.Text>
                                    <Card.Text id='precio' className="display-1 shadow-lg p-3 mb-5 bg-white rounded">
                                    ${product.price}
                                    </Card.Text>
                                    <Card.Text id='stock' className="display-1 shadow-lg p-3 mb-5 bg-white rounded">
                                    Stock: {product.stock}
                                    </Card.Text>
                                    <Card.Text id='category' className="display-1 shadow-lg p-3 mb-5 bg-white rounded">
                                    Category: {product.category}
                                    </Card.Text>
                                    <ToastContainer/>
                                </Card.Body>
                            </Card>
                        </div>
                        <div id='cardDetalles'>
                            <Card>
                                <Card.Body className='text-center'>
                                <form onSubmit={handleMod}>
                                    <div className="form-group m-4">
                                        <label htmlFor="title" className='display-4'>Title</label>
                                        <input type="text" placeholder={product.title} className="form-control px-5" id="title" />
                                    </div>
                                    <div className="form-group m-4">
                                        <label htmlFor="size" className='display-4'>Size</label>
                                        <input type="text" placeholder={product.size} className="form-control" id="size" />
                                    </div>
                                    <div className="form-group m-4">
                                        <label htmlFor="description" className='display-4'>Description</label>
                                        <input type="text" placeholder={product.description} className="form-control" id="description" />
                                    </div>
                                    <div className="form-group m-4">
                                        <label htmlFor="price" className='display-4'>Price</label>
                                        <input type="number" placeholder={product.price} className="form-control" id="price" />
                                    </div>
                                    <div className="form-group m-4">
                                        <label htmlFor="stock" className='display-4'>Stock</label>
                                        <input type="number" className="form-control" id="stocks" placeholder={product.stock} />
                                    </div>
                                    <div className="form-group m-4">
                                        <label htmlFor="category" className='display-4'>Category</label>
                                        <input type="text" placeholder={product.category} className="form-control" id="categorys" />
                                    </div>
                                    <div className="d-flex justify-content-center mt-4 pt-2">
                                        <input className="btn btn-primary btn-lg" type="submit" value="Guardar Cambios" />
                                    </div>
                                </form>
                                </Card.Body>
                            </Card>
                        </div>
                    </React.Fragment>
                </>
            </div>
            </>
        )
}

export default ProductModifier