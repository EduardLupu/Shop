import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
export default function Header() {
    return (
        <header>
            <div className="pop-up">
                <span>Added to the cart!</span>
            </div>
            <nav className="effect-1">
                <ul className="top-nav">
                    <li><a href="../../public/index.html">Contact</a></li>
                    <li><a href="../../public/index.html">About</a></li>
                    <li className="shopping-cart"><a href="../../public/index.html"><FontAwesomeIcon icon={faCartShopping} /><span className="shopping-cart-count"></span></a>
                        <div className="cart-items-wrapper">
                            <div className="cart-items">
                                <h3 className="cart-total">TOTAL: $0</h3>
                            </div>
                        </div></li>
                    <li className="logo"><a href="../../public/index.html">&spades;</a></li>
                </ul>
            </nav>
            <div className="promo">
                <h1>Edi's shop</h1>
                <h2>Best prices on the market!</h2>
            </div>
        </header>
    );
}