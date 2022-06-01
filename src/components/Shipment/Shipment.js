import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';
import { clearTheCart, getStoredCart } from '../../utilities/fakedb';

const Shipment = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        const savedCart = getStoredCart();
        const orderDetails = { ...loggedInUser, products: savedCart, shipment: data, orderTime: new Date() };

        fetch('http://localhost:5000/addOrder', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                if(data){
                    clearTheCart();
                    alert('Your order has been placed successfully');
                }
            })
    };

    return (
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

            <input defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder="Your Name" />
            {
                errors.name && <span className="error">Name is required</span>
            }

            <input defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="Your Email" />
            {
                errors.email && <span className="error">Email is required</span>
            }

            <input {...register("address", { required: true })} placeholder="Your Address" />
            {
                errors.address && <span className="error">Address is required</span>
            }

            <input {...register("phone", { required: true })} placeholder="Your Phone Number" />
            {
                errors.phone && <span className="error">Phone number is required</span>
            }

            <input type="submit" />

        </form>
    );
};

export default Shipment;