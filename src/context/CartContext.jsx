import React, { createContext } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchUrl, frontUrl } from '../index.js';
export const CartContext = createContext();

const CartProvider = ({children}) =>{

    // toastify
    const notify2 = () => toast.error('Limite Stock!', {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        content : 0,
        theme: "colored",
    });
    const notify1 = () => toast.success('Agregado!', {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        content : 0,
        theme: "colored",
    });
    
    // funcion cambio agregar a agregado en boton
    function added() {
        const botonAgregar = document.querySelector("#botonAgregar")
        botonAgregar.textContent = "agregado";
        botonAgregar.style.backgroundColor = "#da8a0d";
        botonAgregar.style.color = "white";
            setTimeout(function() {
                botonAgregar.textContent = "agregar";
                botonAgregar.style.backgroundColor = "white";
                botonAgregar.style.color = "#0d6efd";
            }, 3000);
    };

    const getCart = async () =>{
        try { 
            const token = localStorage.getItem('token');
            const response = await fetch(`${fetchUrl}/api/carts`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                },
            });
            if (response.ok) {
                const data = await response.json()
                return data.data
            } else {
                window.location.href =  `${frontUrl}/`
                throw new Error('Error en la solicitud');
            }
        } catch (error) {
            throw new Error(error)
        };
    };

    const addProductToCart = async (prodId) =>{
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${fetchUrl}/api/carts/${prodId}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                },
            });
            if (response.ok) {
                await response.json();
                notify1()
            } else {
                window.location.href = `${frontUrl}/`
                throw new Error('Error en la solicitud');
            }
        } catch (error) {
            throw new Error(error)
        };
    };

    const deleteProductToCart = async (prodId) =>{
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${fetchUrl}/api/carts/${prodId}`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                },
            });
            if (response.ok) {
                await response.json();
            } else {
                window.location.href = `${frontUrl}/`
                throw new Error('Error en la solicitud');
            }
        } catch (error) {
            throw new Error(error)
        };
    };

    const deleteAllProductsToCart = async () =>{
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${fetchUrl}/api/carts`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                },
            });
            if (response.ok) {
                await response.json();
            } else {
                window.location.href = `${frontUrl}/`
                throw new Error('Error en la solicitud');
            }
        } catch (error) {
            throw new Error(error)
        };
    };

    const updateQuantityToCart = async (quantity, prodId) =>{
        try {
            const response = await fetch(`${fetchUrl}/api/carts/quantity/${prodId}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(quantity),
            });
            if (response.ok) {
                await response.json();
            } else {
                window.location.href = `${frontUrl}/`
                throw new Error('Error en la solicitud');
            }
        } catch (error) {
            throw new Error(error)
        };
    };

    const totalPriceFunction = async () =>{
        try {
            const cart = await getCart()
            const totalPrice = cart.products.reduce((accumulator, product) => {
                return accumulator + product.quantity * product._id.price;
            }, 0);
            return totalPrice;
        } catch (error) {
            throw new Error(error)
        }
    };

    return(
        <CartContext.Provider value={{totalPriceFunction, getCart, addProductToCart, deleteProductToCart, deleteAllProductsToCart, updateQuantityToCart, added, notify1, notify2}}>
        {children}
        </CartContext.Provider>
    )
}



export default CartProvider;       