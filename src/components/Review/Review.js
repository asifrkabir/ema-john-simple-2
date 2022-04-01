import React, { useEffect, useState } from 'react';
import { getStoredCart, deleteFromDb, clearTheCart } from '../../utilities/fakedb';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';

const Review = () => {

    // useEffect(() => {
    //     fetch('https://raw.githubusercontent.com/ProgrammingHero1/ema-john-simple-resources/master/fakeData/products.JSON')
    //         .then(res => res.json())
    //         .then(data => processData(data))

    //     const processData = (fakeData) => {
    //         const first10 = fakeData.slice(0, 10);
    //         setProducts(first10);
    //     }
    // }, [])

    // const first10 = fakeData.slice(0,10);
    // const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlaceOrder = () => {
        setOrderPlaced(true);
        setCart([]);
        clearTheCart();
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        deleteFromDb(productKey);
    }

    useEffect(() => {
        const savedCart = getStoredCart();
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    }, [])

    let thankyou;
    if(orderPlaced) {
        thankyou = <img src={happyImage} alt="" />;
    }

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem removeProduct={removeProduct} product={pd} key={pd.key}></ReviewItem>)
                }
                {
                    thankyou
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="main-button">Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;