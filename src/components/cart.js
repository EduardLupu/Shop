import {Link} from "react-router-dom";
import '../styles/cart.css';
function Cart() {
    return (
        <>
            <Link to="/shop"><h1 className="logo">&spades;</h1></Link>
            <div className="cart-page-items">
            </div>
            <h3 className="cart-total">Total: $0</h3>
            <button className="buy-button">Buy!</button>
        </>
    )
}

export default Cart;