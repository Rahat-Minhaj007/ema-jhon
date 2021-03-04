import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart, setCart] = useState([])

    const removeItem =(productKey) =>{
        // console.log("clicked",productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart (productKey);
    }
    useEffect(() => {
        const savedCart = getDatabaseCart()
        // console.log(savedCart);
        const productKeys = Object.keys(savedCart)
        // console.log(productKeys);
        // const count = productKeys.map(key => savedCart[key])
        // console.log(count);
           const cartProducts  = productKeys.map(key =>{

            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
     
           });
           
          setCart(cartProducts);
    }, [])
    return (
        <div>
            
            <h1>Cart Items : {cart.length}</h1>
            { 
                cart.map(pd => <ReviewItem product={pd} key ={pd.key} removeItem={removeItem}></ReviewItem>)
            }
        </div>
    );
};

export default Review;