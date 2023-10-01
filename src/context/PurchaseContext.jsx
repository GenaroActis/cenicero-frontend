import React, { createContext } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export const PurchaseContext = createContext();

const PurchaseProvider = ({children}) =>{
    const notifyFetchError = () => toast.error(`Error sending the purchase! I try again later`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    }
    );

    const notifySuccessful = () => toast.success('Successful purchase!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    }
    )

    const generateTicket = async (id) =>{
        try{
            const token = localStorage.getItem('token');
            const url = `http://localhost:8080/api/ticket/${id}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                },
            });
            if (response.ok) {
                const res = await response.json();
                return res.data
            } else {
                const error = await response.json();
                if(error.errors === 'Products are out of stock'){
                    return 'ProductsAreOutOfStock'
                } else{
                    throw new Error('Error en la solicitud');
                }
            }
        } catch (error) {
            console.log(error)
        };
    };

    const sendEmail = async (code) =>{
        try {
            const token = localStorage.getItem('token');
            const url = `http://localhost:8080/api/email/${code}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                },
            });
            if (response.ok) {
                const res = await response.json();
                return res.data
            } else {
                window.location.href = 'http://localhost:3000/'
                throw new Error('Error en la solicitud');
            }
        } catch (error) {
            console.log(error)
        };
    };

    const finalizeTicket = async (ticketData) =>{
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/ticket/finalizePurchase`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(ticketData),
            });
            if (response.ok) {
                const res = await response.json()
                notifySuccessful()
                sendEmail(res.data.code)
                setTimeout( ()=>{window.location.href = `http://localhost:3000/confirmedPurchase/${res.data.code}`}, 2000)
            } else {
                notifyFetchError()
                setTimeout( ()=>{window.location.href = 'http://localhost:3000/products'}, 2000)
                throw new Error('Error en la solicitud');
            }
        } catch (error) {
            console.log(error)
        };
    };

    const getTicketByCode = async (code) =>{
        try{
            const token = localStorage.getItem('token');
            const url = `http://localhost:8080/api/ticket/purchase/${code}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                },
            });
            if (response.ok) {
                const res = await response.json();
                return res.data
            } else {
                window.location.href = 'http://localhost:3000/'
                throw new Error('Error en la solicitud');
            }
        } catch (error) {
            console.log(error)
        };
    };

    return(
        <PurchaseContext.Provider value={{ sendEmail, getTicketByCode, generateTicket, finalizeTicket}}>
        {children}
        </PurchaseContext.Provider>
    )
}



export default PurchaseProvider;  