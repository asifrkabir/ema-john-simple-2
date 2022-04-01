import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import fakeData from '../../fakeData';

const ProductDetail = () => {

    const { productKey } = useParams();
    const product = fakeData.find(pd => pd.key === productKey);

    // const [product, setProduct] = useState([]);

    // useEffect(() => {
    //     fetch('https://raw.githubusercontent.com/ProgrammingHero1/ema-john-simple-resources/master/fakeData/products.JSON')
    //         .then(res => res.json())
    //         .then(data => processData(data))

    //     const processData = (fakeData) => {
    //         const first10 = fakeData.slice(0, 10);
    //         setProduct(first10.find(pd => pd.key === productKey));
    //     }
    // }, [])

    // const processData = (fakeData) => {
    //     const first10 = fakeData.slice(0, 10);
    //     setProduct(first10.find(pd => pd.key === productKey));
    // }

    return (
        <div>
            <h1>Your Product Details</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;