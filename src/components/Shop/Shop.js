import React, { useState } from 'react';
import fakeData from '../../fakeData'
import { addToDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
const Shop = () => {
    const first10 = fakeData.slice(0, 10)
    const [products, setProducts] = useState(first10)
    const [cart, setCart] = useState([])
    const handleAddProduct = (product) =>{
        const newCArt = [...cart,product];
        setCart(newCArt);
        const sameProduct = newCArt.filter(pd => pd.key === product.key)
        const count = (sameProduct.length);
        addToDatabaseCart(product.key,count);
    }

    return (
        <div className="shop-container">
            <div className="product-container">
               
                {
                    products.map(pd => <Product product={pd} key={pd.key} handleProduct ={handleAddProduct} showAddToCart ={true}></Product>)
                }
                
            </div>
            <div className ="cart-container">
                    {/* <h3>this is cart</h3>
                    <h4> Order Summary : {cart.length}</h4> */}
                    <Cart tcart ={cart}></Cart>
            </div>



        </div>
    );
};

export default Shop;