import {Link} from "react-router-dom";
import '../styles/cart.css';
import {useEffect, useState} from "react";
import {initCartProducts} from "../middleware/api";
import CartItem from "./cartItem";
function Cart() {

    const [cartProducts, setCartProducts] = useState([]);
    useEffect(() => {

        async function fetchData() {
            const products = await initCartProducts();
            setCartProducts(products);
        }
        fetchData();
        console.log(cartProducts);

    }, []);


    return (
        <div className="cart-page">
            <Link to="/shop"><h1 className="logo">&spades;</h1></Link>
            <div className="cart-page-items">
                {cartProducts.map((product) => (<CartItem key={product.id} product={product}/>))}
            </div>
            <h3 className="cart-total">Total: $0</h3>
            <button className="buy-button">Buy!</button>
        </div>
    )
}

export default Cart;