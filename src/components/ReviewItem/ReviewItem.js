import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity,key} = props.product
    const removeItem = props.removeItem;
    var reviewStyle = {
        borderBottom : "1px solid lightGray",
        marginBottom : "10px",
        paddingBottom : "10px",
        marginLeft : "200px",


    }
    return (
        <div style ={reviewStyle} className="review-item">
            <h4 className="product-name">{name}</h4>
            <p>Quantity: {quantity}</p>
            <br/>
            <button onClick={()=>removeItem(key)}  className="button">Remove Item</button>
        </div>
    );
};

export default ReviewItem;