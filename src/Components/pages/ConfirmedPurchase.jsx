import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { PurchaseContext } from '../../context/PurchaseContext';
import Spinner from 'react-bootstrap/Spinner';

const ConfirmedPurchase = () => {
    const { code } = useParams();
    const { getTicketByCode } = useContext(PurchaseContext)
    const [loading, setLoading] = useState(true);
    const [ticket, setTicket ] = useState([])

    useEffect(() => {
        const getTicket = async() =>{
            const ticketGenerate = await getTicketByCode(code)
            if( ticketGenerate ) {
                const date = new Date(ticketGenerate.purchaseDataTime)
                const normalDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}hs`;
                ticketGenerate.purchaseDataTime = normalDate
                setTicket(ticketGenerate)
                setLoading(false)
            }
        };
        getTicket();
    });

    if (loading === true){
        return (
        <div className='container-fluid' id='spinner'>
            <h1>Cargando...</h1>
        <Spinner className='spinner' animation="border"/>
        </div>
        )
    } else {
        return(
                <>
                    <div className="form-group table-responsive">
                        <h1 className='text-center pt-4'>Completed Purchase</h1>
                        <div className='card m-4 py-2 text-center shadow-lg rounded'>
                            <h1>Buyer</h1>
                            <h4>{ticket.purchaser.fullName}</h4>
                            <h2>Email</h2>
                            <h4>{ticket.purchaser.emailBuyer}</h4>
                            <h2>Date</h2>
                            <h4>{ticket.purchaseDataTime}</h4>
                        </div>
                        <div className='card m-2 shadow-lg rounded'>
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
                                <Link target="_blank" rel="noreferrer" className="btn btn-primary btn-block" aria-current="page" to={'/products'}>Keep buying</Link>
                            </div>
                        </div>
                        </div>
                    </div>
                </>
        )
    }
}

export default ConfirmedPurchase