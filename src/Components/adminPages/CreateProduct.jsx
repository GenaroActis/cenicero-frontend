import React, { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { Link } from 'react-router-dom'

const CreateProduct = () => {
    const { newProduct } = useContext(AdminContext)
    const handleSubmitNewProduct = (event) =>{
        event.preventDefault()
        const prodData ={
            title: document.querySelector('#title').value,
            description: document.querySelector('#description').value,
            price: document.querySelector('#price').value,
            stock: document.querySelector('#stock').value,
            category: document.querySelector('#category').value,
            size: document.querySelector('#size').value
        }
        const formData = new FormData();
        formData.append('prodData', JSON.stringify(prodData))
        const inputImg = document.querySelector('#img')
        formData.append('img', inputImg.files[0]);
        newProduct(formData)
    }
    return (
        <>
        <div className="d-flex justify-content-center m-4 p-4">
            <Link target="_blank" rel="noreferrer" className="nav-link btn btn-primary p-4 text-white fs-4" aria-current="page" to={'/admin'}>Admin Menu</Link>
        </div>
        <div className="card userCard m-5 text-white">
            <div className="card-body text-center">
                <h2 className="card-title m-3 display-2">New Product</h2>
                <form id='form' onSubmit={handleSubmitNewProduct}>
                    <div className="form-group m-4">
                        <label htmlFor="title" className='display-4'>Title</label>
                        <input type="text" required className="form-control" id="title" />
                    </div>
                    <div className="form-group m-4">
                        <label htmlFor="description" className='display-4'>Description</label>
                        <input type="text" required className="form-control" id="description" />
                    </div>
                    <div className="form-group m-4">
                        <label htmlFor="price" className='display-4'>Price</label>
                        <input type="number" required className="form-control" id="price" />
                    </div>
                    <div className="form-group m-4">
                        <label htmlFor="stock" className='display-4'>Stock</label>
                        <input type="number" required className="form-control" id="stock" />
                    </div>
                    <div className="form-group m-4">
                        <label htmlFor="category" className='display-4'>Category</label>
                        <input type="text" className="form-control" id="category" />
                    </div>
                    <div className="form-group m-4">
                        <label htmlFor="size" className='display-4'>Size</label>
                        <input type="text" required className="form-control" id="size" />
                    </div>
                    <div className="form-group m-4">
                        <label htmlFor="img" className='display-4'>Image</label>
                        <input type="file" required className="form-control" id="img" />
                    </div>
                    <div className="d-flex justify-content-center mt-4 pt-2">
                        <input className="btn btn-primary btn-lg" type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default CreateProduct