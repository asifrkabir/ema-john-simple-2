import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/ProgrammingHero1/ema-john-simple-resources/master/fakeData/products.JSON')
            .then(res => res.json())
            .then(data => processData(data))
    }, [])

    const processData = (fakeData) => {
        const first10 = fakeData.slice(0, 10);
        setProducts(first10);
    }

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    const handleAddProduct = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(product => <Product handleAddProduct={handleAddProduct} product={product}></Product>)
                }
            </div>

            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;