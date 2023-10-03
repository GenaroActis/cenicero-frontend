import React, { useContext, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';
import { PurchaseContext } from '../../context/PurchaseContext';

const FinalizePurchase = () => {
    const { generateTicket, finalizeTicket } = useContext(PurchaseContext)
    const [loading, setLoading] = useState(true);
    const [ticket, setTicket ] = useState([])
    const { id } = useParams(); 

    useEffect(() => {
        const getTicket = async() =>{
            const ticketGenerate = await generateTicket(id)
            if(ticketGenerate === 'ProductsAreOutOfStock'){
                const spinner0 = document.getElementById('spinner0')
                const prodQuantityError = document.getElementById('prodQuantityError')
                spinner0.classList.add("container-fluid-hidden")
                spinner0.classList.remove("container-fluid")
                prodQuantityError.classList.remove("d-none")
                setTimeout( ()=>window.location.href = 'http://localhost:3000/products' , 2500)
            } else{
                setTicket(ticketGenerate)
                setLoading(false)
            }
        };
        getTicket();
    });

    const handlePostTicket = async (e) =>{
        e.preventDefault()
        ticket.purchaser.cellPhone = document.querySelector('#phone').value
        const spinner1 = document.getElementById('spinner1')
        spinner1.classList.add("container-fluid")
        await finalizeTicket(ticket)
    }

    if (loading === true){
        return (
            <>
            <div className='container-fluid' id='spinner0'>
                <h1>Cargando...</h1>
                <Spinner className='spinner' animation="border"/>
            </div>
            <div id='prodQuantityError' className="container d-none mt-5">
                <div className="card m-5 text-center shadow-lg border-danger">
                    <div className="card-body text-danger">
                        <h5 className="card-title">No Stock for Selected Products</h5>
                        <p className="card-text">None of the selected products have stock available at the moment.</p>
                    </div>
                </div>
            </div>
            </>
        )
    } else {
        return(
                <>
                    <div className='container-fluid-hidden' id='spinner1'>
                        <h1>Procesando Compra...</h1>
                        <Spinner className='spinner' animation="border"/>
                    </div>
                    <form id="form" className='m-5' onSubmit={handlePostTicket}>
                        <div className="form-group mt-5">
                            <div className="form-group h4">
                                <label htmlFor="phone" className="col-12 col-md-2 col-form-label h2">Phone Number :</label>
                                <div className="col-12 col-md-10">
                                    <input type="tel" className="form-control" id="phone" placeholder="Phone Number" required/>
                                </div>
                            </div>
                        </div>
                        {ticket.remainingProducts.length > 0 && (
                            <div className="mt-5">
                            <h4>Products with insufficient stock:</h4>
                            <ul>
                                {ticket.remainingProducts.map((product) => (
                                <li className='h4' key={product._id._id}>
                                    <strong>Product: </strong> {product._id.title}, <strong>Requested amount: </strong> {product.quantity + product._id.stock}, <strong> Available stock: </strong> {product._id.stock}, <strong>Remaining amount: </strong> {product.quantity}
                                </li>
                                ))}
                            </ul>
                            <h4>The products that you could not buy will be saved in your cart.</h4>
                            </div>
                        )}
                        <div className="form-group table-responsive">
                            <table  className="mt-5 mb-5 table">
                                <thead className='h3'>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Sub Total</th>
                                    </tr>
                                </thead>
                                {ticket.products.map(product =>                  
                                <tbody className='h4' key={product._id.code}>
                                    <tr>
                                        <td>{product._id.title}</td>
                                        <td>${product._id.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>${product.quantity * product._id.price}</td>
                                    </tr>
                                </tbody>
                                )}
                                <tbody>
                                    <tr>
                                        <th colSpan="4" scope="col" className="text-right">
                                            <h2>Total Price ${ticket.totalPrice}</h2>
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-center">
                                <div className="p-2">
                                    <Link target="_blank" rel="noreferrer" className="btn btn-primary btn-block" aria-current="page" to={'/products'}>Seguir Comprando</Link>
                                </div>
                                <div className="p-2">
                                    <button className="btn btn-success btn-block" id="button"> Finalizar Compra</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <ToastContainer/>
                </>
        )
    }
}

export default FinalizePurchase