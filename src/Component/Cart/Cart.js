import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
    console.log(cart);

    // const totalPrice = cart.reduce((total, prd) => total + prd.price , 0)

    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
    }

    let shipping = 0;
    if(total > 35){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99;
    }

    const tax = (total / 10).toFixed(2);

    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    const formateNumber = num =>{
        const precision =  num.toFixed(2)
        return Number(precision)
    }

    return (
        <div>
            <h4>order summary</h4>
            <p>Item Orderd: {cart.length}</p>
            <p>Product price: {formateNumber(total)}</p>
            <p><small>Shipping cost: {shipping}</small></p>
            <p>tax + vat : {tax}</p>
            <p>Total Price: {grandTotal}</p>
            {
             props.children
            }
        </div>
    );
};

export default Cart;