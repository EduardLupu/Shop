import {useState} from "react";

function CartItemInShop({product}) {
    const [quantity, setQuantity] = useState(product.quantity);
    
    return (
        <>
            <div className="cart-item">
                <img className="cart-item-image" src={product.images[0]} alt={product.title}/>
                <h3 className="cart-item-title">{product.title}</h3>
                <h3 className="cart-item-price">${product.price}</h3>
                <h3 className="cart-item-counter">x{quantity}</h3>
            </div>
        </>
    );
}

export default CartItemInShop;