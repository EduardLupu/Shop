import {useEffect, useRef, useState} from "react";

function debounce(func, timeout = 1000) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

function CartItem({product}) {
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {



    }, []);

    const handleButtonClick = (amount) => {
        setClickCount(clickCount + 1);
        debounce(() => {
            // Perform your fetch or other action here
            console.log(`Clicked ${amount} - Debounced fetch`);
        }, 300); // Adjust the delay as needed
    };


    return (
        <div className="cart-item" data-id={product.id}>
            <img className="cart-item-image" src={product.images[0]} alt={product.title}/>
            <h3 className="cart-item-title">{product.title}</h3>
            <h3 className="cart-item-price">${product.price}</h3>
            <div className="edit-container">
                <button
                    className="cart-item-edit-quantity"
                    onClick={() => handleButtonClick(-1)}
                >-</button>
                <h3 className="cart-item-counter">{product.quantity}</h3>
                <button className="cart-item-edit-quantity"
                        onClick={()=>handleButtonClick(1)}>+</button>
            </div>
        </div>
    )
}

export default CartItem;