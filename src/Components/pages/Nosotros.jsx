import React from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer} from 'react-toastify';

const nosotros = () => {
    return (
        <>
        <div id='nosotros'>
            <h1>Cenicero.com.ar</h1>
            <h2> Nosotros somos un pequeño empredimiento  <br />  consciente de la situación del país, <br />
            que busca ofrecer prendas de primera marca <br /> a precios razonables y en buen estado
            </h2>
            <h3>Si tienen alguna duda o consulta, <br /> pueden contactarnos en nuestro Instagram.</h3>
            <Link target="_blank" rel="noreferrer" className="nav-link px-2 text-white" aria-current="page" to={`/products`}>
                <img  src="https://res.cloudinary.com/dsdicaf5h/image/upload/v1674159144/cenicero/footer_nozkhv.png" alt="description image" className='img-fluid' id='imgNosotros' />
            </Link>
        </div>
        <ToastContainer/>
        </>
    )
}

export default nosotros