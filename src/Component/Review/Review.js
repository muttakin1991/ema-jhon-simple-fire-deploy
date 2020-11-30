import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';
const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const removeProduct = (producKey) => {
        const newCart = cart.filter(pd => pd.key !== producKey);
        setCart(newCart);
        removeFromDatabaseCart(producKey);
    }
    useEffect(()=> {
        // cart
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);

        const cartProducts = productKeys.map(key => {
           const product = fakeData.find(pd => pd.key === key);
           product.quantity = saveCart[key]; 
           return product;
        });
        setCart(cartProducts);
    }, [])

    const history = useHistory();
    const handleProccedCheckOut = () => {
        history.push('/shipment')
    }
    let thankYou;
    if(orderPlaced){
      thankYou = <img src={happyImage} alt=""/>   
    }

    return (
        <div className="twin-container">
           <div className="product-container">
                {
                    cart.map( pd => <ReviewItem
                        key={pd.key}
                        removeProduct = {removeProduct}
                        product={pd}>

                        </ReviewItem>)
                }
               {
                   thankYou
               }
           </div>
           <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProccedCheckOut} className="main-button">Procced Check out</button>
                </Cart>
           </div>
        </div>
    );
};

export default Review;