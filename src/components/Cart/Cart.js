import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.tcart;
   
    // const totalPrice = cart.reduce((total,prd)=>total+prd.price,0);
    let totalPrice =0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        totalPrice = Math.round(totalPrice + product.price);
    }
    let shipping = 0;
    if(totalPrice>35){
        shipping = 0;
    }
    else if(totalPrice>15){
        shipping = 4.99;
    }
    else if(totalPrice>0){
        shipping = 12.99
    }
 const tax = totalPrice/10;
 const formatNumber = num =>{
     const precision = num.toFixed(2);
     return Number(precision);
 }
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered : {cart.length}</p>
            <p>Product Price $:{ formatNumber(totalPrice)}</p>
            <p><small>Shipping Cost $: { formatNumber(shipping)}</small></p>
            <p><small>Tax + Vat $: { formatNumber(tax)}</small></p>
            <p>Total Price $: { formatNumber(totalPrice + shipping + tax)}</p>
            <Link to="/review"><button className="button">Review Order</button></Link>
        </div>
    );
};

export default Cart;