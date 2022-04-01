import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import fakeData from '../../fakeData';
import { Link } from 'react-router-dom';

const Shop = () => {

    // useEffect(() => {
    //     fetch('https://raw.githubusercontent.com/ProgrammingHero1/ema-john-simple-resources/master/fakeData/products.JSON')
    //         .then(res => res.json())
    //         .then(data => processData(data))
    // }, [])

    // const processData = (fakeData) => {
    //     const first10 = fakeData.slice(0, 10);
    //     setProducts(first10);
    // }

    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    // const handleAddProduct = (product) => {
    //     const newCart = [...cart, product];
    //     setCart(newCart);
    //     addToDb(product.key);
    // }

    useEffect(() => {
        const savedCart = getStoredCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        })
        setCart(previousCart);
    }, [])

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDb(product.key);
    }

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.map(product => <Product showAddToCart={true} handleAddProduct={handleAddProduct} product={product} key={product.key}></Product>)
                }
            </div>

            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-button">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;