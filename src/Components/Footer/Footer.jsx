import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer id='footer' className="py-3">
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                <li className="nav-item"><Link target="_blank" rel="noreferrer" className="nav-link px-2 text-white" aria-current="page" to={`/Category/todos`}>Productos</Link></li>
                <li className="nav-item"><Link target="_blank" rel="noreferrer" className="nav-link px-2 text-white" aria-current="page" to={`/cenicero-backend`}>Inicio</Link></li>
                <li className="nav-item"><Link target="_blank" rel="noreferrer" className="nav-link px-2 text-white" aria-current="page" to={`/Nosotros`}>Nosotros</Link></li>
            </ul>
            <p className="text-center text-white">© 2022 Company, Inc</p>
        </footer>
    )
}

export default Footer