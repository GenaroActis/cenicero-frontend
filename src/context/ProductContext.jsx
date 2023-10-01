import React, { createContext } from 'react'
import 'react-toastify/dist/ReactToastify.css';

export const ProductContext = createContext();

const ProductProvider = ({children}) =>{

    const getProducts = async (page, limit, key, value, sortField, sortOrder) =>{
        try{
            const token = localStorage.getItem('token');
            const url = `http://localhost:8080/api/products?${page ?? 'page=1'}&${limit ?? 'limit=5'}&${key}&${value}&${sortField ?? 'sortField=title'}&${sortOrder ?? 'sortOrder=asc'}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                },
            });
            if (response.ok) {
                const data = await response.json();
                return data.data
            } else {
                const res = await response.json();
                window.location.href = 'http://localhost:3000/'
                throw new Error('Error en la solicitud');
            }
        } catch (error) {
            console.log(error)
        };
    };

    const getProductById = async (prodId) =>{
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/products/${prodId}`, {
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

    const serchProduct = async (key, value) =>{
        try {
            const response = await fetch(`http://localhost:8080/api/products/search/${key}/${value}`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                await response.json();
            } else {
                window.location.href = 'http://localhost:8080/'
                throw new Error('Error en la solicitud');
            }
        } catch (error) {
            console.log(error)
        };
    };

    return(
        <ProductContext.Provider value={{ getProducts, getProductById, serchProduct,}}>
        {children}
        </ProductContext.Provider>
    )
}



export default ProductProvider;  