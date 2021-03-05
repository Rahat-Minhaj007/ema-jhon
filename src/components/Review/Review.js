import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart, } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart] = useState([])
    const [orderPlaced, setOrderPlaced] = useState(false);
    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

    const removeItem = (productKey) => {
        // console.log("clicked",productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
        const savedCart = getDatabaseCart()
        // console.log(savedCart);
        const productKeys = Object.keys(savedCart)
        // console.log(productKeys);
        // const count = productKeys.map(key => savedCart[key])
        // console.log(count);
        const cartProducts = productKeys.map(key => {

            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;

        });

        setCart(cartProducts);
    }, [])
    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={happyImage} alt="" />
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                {/* <h1>Cart Items : {cart.length}</h1> */}
                {
                    cart.map(pd => <ReviewItem product={pd} key={pd.key} removeItem={removeItem}></ReviewItem>)
                }
                {
                   thankYou
                }
            </div>

            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="button"> Place Order</button>
                </Cart>
            </div>

        </div>
    );
};

export default Review;