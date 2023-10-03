import React, { createContext } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { fetchUrl, frontUrl } from '../index.js';
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
            const url = `${fetchUrl}/api/ticket/${id}`;
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
            throw new Error(error)
        };
    };

    const sendEmail = async (code) =>{
        try {
            const token = localStorage.getItem('token');
            const url = `${fetchUrl}/api/email/${code}`;
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
                window.location.href = `${frontUrl}/`
                throw new Error('Error en la solicitud');
            }
        } catch (error) {
            throw new Error(error)
        };
    };

    const finalizeTicket = async (ticketData) =>{
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${fetchUrl}/api/ticket/finalizePurchase`, {
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
                setTimeout( ()=>{window.location.href = `${frontUrl}/confirmedPurchase/${res.data.code}`}, 2000)
            } else {
                notifyFetchError()
                setTimeout( ()=>{window.location.href = `${frontUrl}/products`}, 2000)
                throw new Error('Error en la solicitud');
            }
        } catch (error) {
            throw new Error(error)
        };
    };

    const getTicketByCode = async (code) =>{
        try{
            const token = localStorage.getItem('token');
            const url = `${fetchUrl}/api/ticket/purchase/${code}`;
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
                window.location.href = `${frontUrl}/`
                throw new Error('Error en la solicitud');
            }
        } catch (error) {
            throw new Error(error)
        };
    };

    return(
        <PurchaseContext.Provider value={{ sendEmail, getTicketByCode, generateTicket, finalizeTicket}}>
        {children}
        </PurchaseContext.Provider>
    )
}



export default PurchaseProvider;  