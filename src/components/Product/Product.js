import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
const Product = (props) => {
    // console.log(props);
    const { name, img, price, seller, stock } = props.product
    return (
        <div className="product">
            <div className="product-img">
                <img src={img} alt="" />
            </div>
            <div className="product-info">
                <h4 className="product-name">{name}</h4>
                <p><small>by : {seller}</small></p>
                <p>${price}</p>
                <p><small>only {stock} left in stock - order soon</small></p>
                <button onClick ={() => props.handleProduct(props.product)} id="btn"> <FontAwesomeIcon icon={faShoppingCart} />         Add to Cart</button>

            </div>
        </div>
    );
};

export default Product;