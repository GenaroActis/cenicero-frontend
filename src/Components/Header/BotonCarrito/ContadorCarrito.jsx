import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../../context/CartContext';


function ContadorCarrito() {
    let { addedProducts, inAddedProducts } = useContext(CartContext);
    const [load, setLoad] = useState(true);

    // recuperamos la cantidad elegida
    let inQuantities = 0;
    if (addedProducts.length > 0 ) {
        inQuantities = inAddedProducts.reduce((acumulador, product) => acumulador + product.elegidos, 0)
    } 

    const [totalQuantities, setQuantities] = useState(inQuantities);

    // actualizamos con useEffect
    useEffect(() => {
        if (load) {
        setLoad(false);
        }
    setQuantities(addedProducts.reduce((acumulador, product) => acumulador + product.elegidos, 0));
    }, [addedProducts]);

    return (
        <div>
            <h1 id='numCarro'>{totalQuantities}</h1>
        </div>
    );
}

export default ContadorCarrito;






