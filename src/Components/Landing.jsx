import React from 'react'

import Header from './Header/Header'
import Footer from './Footer/Footer'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Nosotros from './pages/Nosotros'
import ProductoDetalles from './pages/ProductoDetalles'
import Inicio from './Inicio/Inicio'
import FinalizePurchase from './pages/FinalizePurchase'
import CartProvider from '../context/CartContext'
import UserProvider from '../context/UserContext'
import ProductProvider from '../context/ProductContext'
import AdminProvider from '../context/AdminContext'
import PurchaseProvider from '../context/PurchaseContext'
import Products from './pages/Products'
import Register from './pages/Register'
import Login from './pages/Login'
import GithubRes from './pages/GithubRes'
import CreateProduct from './adminPages/CreateProduct'
import AdminMenu from './adminPages/AdminMenu'
import ProductManager from './adminPages/ProductManager'
import SalesHistory from './adminPages/SalesHistory'
import ProductModifier from './adminPages/ProductModifier'
import ConfirmedPurchase from './pages/ConfirmedPurchase'
import RecoverPassword from './pages/RecoverPassword'
import Users from './adminPages/Users'
import '../scss/modal.css'
import '../scss/detalleProductos.css'
import  '../scss/reset.css'
import  '../scss/Header&Footer.css'
import  '../scss/body.css'
import  '../scss/Inicio.css'
import  '../scss/user.css'
import 'react-toastify/dist/ReactToastify.css';



const Landing = () => {

    return (
    <div id='landing'>
        <>
            <UserProvider>
            <CartProvider>
            <ProductProvider>
            <AdminProvider>
            <PurchaseProvider>
                <BrowserRouter>
                    <Header/>
                        <Routes>
                            <Route exact path="/cenicero-backend" element={<Inicio/>}/>
                            <Route exact path="/nosotros" element={<Nosotros/>}/>
                            <Route exact path="/producto/:id" element={<ProductoDetalles/>}/>
                            <Route exact path="/finalizePurchase/:id" element={<FinalizePurchase/>}/>
                            <Route exact path="/products/:page?/:limit?/:key?/:value?/:sortField?/:sortOrder?" element={<Products/>}/>
                            <Route exact path="/register" element={<Register/>}/>
                            <Route exact path="/" element={<Login/>}/>
                            <Route exact path="/github/:token" element={<GithubRes/>}/>
                            <Route exact path="/admin" element={<AdminMenu/>}/>
                            <Route exact path="/admin/createProduct" element={<CreateProduct/>}/>
                            <Route exact path="/admin/productManager/:page?/:limit?/:key?/:value?/:sortField?/:sortOrder?" element={<ProductManager/>}/>
                            <Route exact path="/admin/salesHistory" element={<SalesHistory/>}/>
                            <Route exact path="/admin/users" element={<Users/>}/>
                            <Route exact path="/productModifier/:id" element={<ProductModifier/>}/>
                            <Route exact path="/confirmedPurchase/:code" element={<ConfirmedPurchase/>}/>
                            <Route exact path="/recover" element={<RecoverPassword/>}/>
                        </Routes>
                    <Footer/>
                </BrowserRouter>
            </PurchaseProvider>
            </AdminProvider>
            </ProductProvider>
            </CartProvider>
            </UserProvider>
        </>
    </div>
    )
}
export default Landing