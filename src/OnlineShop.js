import React, { useState } from 'react';
import { FaMinusCircle, FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import Data from './data';

const OnlineShop = () => {
    const [cartList, setCartList] = useState([]);
    const [cartNum, setCartNum] = useState(0);

    // this to add the cart to the list
    function addCart(item) {
        setCartList(prevCartList => [...prevCartList, {...item, quantity: 1}]);
        setCartNum(prevCartNum => prevCartNum + 1);
    }

    // this to remove the cart from the list
    function removeItemFromCart(index) {
        setCartList(prevCartList => {
            const newList = [...prevCartList];
            newList.splice(index, 1);
            return newList;
        });
        setCartNum(prevCartNum => prevCartNum - 1);
    }
    
    
  
// this to decrease the quantity of an item in the cart
function decreaseQuantity(index, currentQuantity) {
    if (currentQuantity > 1) {
        setCartList(prevCartList => {
            const newList = [...prevCartList];
            newList[index].quantity = currentQuantity - 1;
            return newList;
        });
    }
    console.log("minus 1")
}

// this to increase the quantity of an item in the cart
function increaseQuantity(index, currentQuantity) {
    setCartList(prevCartList => {
        const newList = [...prevCartList];
        newList[index].quantity = currentQuantity + 1;
        return newList;
    });
    console.log("aadded 1")
}

    // this to clear all items from the cart
    function clearAllItems() {
        setCartList([]);
        setCartNum(0);
    }


    // Helper function to format price with commas and rounding to 3 significant figures
    function formatPrice(price) {
        return parseFloat(price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    // Calculate total price
    function totalPrice() {
        let total = 0;
        cartList.forEach(item => {
            total += item.price * item.quantity;
        });
        return formatPrice(total);
    }
    

    return (
        <section className='section-container'>
            <header className='section-header'>
                <h1>Online Medical Device Market</h1>
            </header>
            <main className='main-container'>
                {Data.map((item) => {
                    const { id, img, title, description, price } = item;
                    return (
                        <article key={id} className='article-container'>
                            <img src={img} className='device-img' alt={title} />
                            <div className='three-things'>
                                <h3>{title}</h3>
                                <p className='main-descr'>{description}</p>
                                <h5 className='main-price'> Price: ${price}</h5>
                            </div>
                            <div className='add-cart-btn'>
                                <button onClick={() => addCart(item)} className='cart-btn'>Add Cart</button>
                            </div>
                        </article>
                    );
                })}
            </main>
            <div className="cart-summary">
                <header className='list-header'>
                    <h2>Cart List and Summary</h2>
                    <p className='cart-num'><h3>Total Items/Cart: </h3>({cartNum})</p>
                </header>
                <ul className='cart-list'>
                    {cartList.map((item, index) => { 
                        const {id, img, title, description, price, quantity} = item
                        return (
                        <article key={id} className='cart-article'>
                            <img src={img} alt={title} className='cart-img'/>
                            <div className='cart-info'>
                                <h5>{title}</h5>
                                <p><span>Price:</span> $ {price}</p>
                                <h5>Quantity: ({quantity})</h5>
                                <button onClick={(e) => { e.stopPropagation(); decreaseQuantity(index, quantity); }} className='counter-btn'><FaMinusCircle className='counter-icon-1' /></button>
                                <button onClick={(e) => { e.stopPropagation(); increaseQuantity(index, quantity); }} className='counter-btn'><FaPlusCircle className='counter-icon-2' /></button>
                                <button onClick={() => removeItemFromCart(index)} className='remove-btn'>Remove Item</button>
                            </div>
                        </article>
                    )})}
                    <footer className='footer-section'>
                        <h2>Total Price: ${totalPrice()} </h2>
                        <button onClick={clearAllItems} className='clear-btn'><FaTrashAlt className='trash-icon'/> Clear all Items</button>
                    </footer>
                </ul>
            </div>
        </section>
    );
};

export default OnlineShop;

