import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
export default function Header() {
    return (
        <header>
            <div className="pop-up">
                <span>Added to the cart!</span>
            </div>
            <nav className="effect-1">
                <ul className="top-nav">
                    <li><a>Account</a></li>
                    <li><a>About</a></li>
                    <li className="shopping-cart"><Link to="/cart"><FontAwesomeIcon icon={faCartShopping} /><span className="shopping-cart-count"></span></Link>
                        <div className="cart-items-wrapper">
                            <div className="cart-items">
                                <h3 className="cart-total">TOTAL: $0</h3>
                            </div>
                        </div></li>
                    <li className="logo"><Link to="/">&spades;</Link></li>
                </ul>
            </nav>
            <div className="promo">
                <h1>Edi's shop</h1>
                <h2>Best prices on the market!</h2>
            </div>
        </header>
    );
}