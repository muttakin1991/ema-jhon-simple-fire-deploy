import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
const Product = (props) => {
    const {name, img, seller, price, stock, key} = props.product;
    return (
        <div
        className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div >
                <h4 className="product-name"><Link to={"/product/"+key}>{name}</Link> </h4>
                <br/>
                <p><small>by:{seller}</small></p>
                <p><small>${price}</small></p>
                <p><small>only {stock} left in stock - order soon</small></p>
               { props.shwoAddToCart && <button 
                    onClick={() => props.handleAddProduct(props.product)} className="main-button"><FontAwesomeIcon icon={faShoppingCart}/>Add to cart
                    </button>}
            </div>
            
        </div>
    );
};

export default Product;