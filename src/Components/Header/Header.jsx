import React, { useEffect, useState } from 'react'
import BotonCarrito from './BotonCarrito/Modal'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import ButtonInst from './ButtonInst'

const Header = () => {
    const [showMenu, setShowMenu] = useState(true);
    const location = useLocation();
    const path = location.pathname
    useEffect(() => {
        if (path === '/' || path === '/register') {
            setShowMenu(false);
        }
    }, [path]);
    return (
    <>
    <header>
        <h2 className="cenic">Cenicero.com.ar</h2>
        <div id="header">
            <img alt='logo image' src="https://res.cloudinary.com/dsdicaf5h/image/upload/v1674159144/cenicero/Sin_t%C3%ADtulo-1_cscv6i.png" id="imgLogo" className='img-fluid'/>
            <div className="d-flex flex-wrap justify-content-center py-3 mb-4">
                {
                    showMenu  && (
                        <>
                            <div id="menu">
                                <ul className="nav nav-pills">
                                    <li className="nav-item"><Link target="_blank" rel="noreferrer" className="nav-link" aria-current="page" to={'/products'}>Productos</Link></li>
                                    <li className="nav-item" id='navInicio'><Link target="_blank" rel="noreferrer" className="nav-link" aria-current="page" to={'/cenicero-backend'}>Inicio</Link></li>
                                    <li className="nav-item"><Link target="_blank" rel="noreferrer" className="nav-link" aria-current="page" to={'/Nosotros'}>Nosotros</Link></li>
                                </ul>
                            </div>
                            <div className='divButtons'>
                                <BotonCarrito/>
                                <ButtonInst/>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    </header>
    </>
    )
}

export default Header