import React from 'react';

const Cart = ({ cart }) => {

    const total = cart.reduce((total, prd) => total + prd.price, 0);

    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    }
    else if (total > 15) {
        shipping = 4.99;
    }
    else if (total > 0){
        shipping = 12.99;
    }

    const tax = (total / 10).toFixed(2);

    const grandTotal = Number((total + shipping + Number(tax)).toFixed(2));

    const formatNumber = (num) => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: {formatNumber(total)}</p>
            <p>Shipping Cost: {shipping}</p>
            <p><small>Tax + VAT: {tax}</small></p>
            <p>Total Price: {grandTotal}</p>
        </div>
    );
};

export default Cart;