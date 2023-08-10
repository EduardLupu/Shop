import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {initCartProducts} from "../middleware/api";
import {useDispatch, useSelector} from "react-redux";
import {setTotal, setTotalQuantity} from "../app/cartSlice";
export default function Header() {
    const {total, totalQuantity} = useSelector(state => state.cart);
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);

    const dispatch = useDispatch();

    const [cartProducts, setCartProducts] = useState([]);

    const isMounted = useRef(false);

    useEffect(() => {
        if (isLoggedIn) {
            async function fetchData() {
                const cart = await initCartProducts();

                if (cart === null) {
                    return false;
                }

                setCartProducts(cart.products);
                dispatch(setTotal(cart.total))
                dispatch(setTotalQuantity(cart.totalQuantity))
                return true;
            }

            fetchData().then((result) => {
                if (result === false) {
                    return () => {
                    };
                }
            });
            isMounted.current = true;

            if (totalQuantity >= 1) {
                const shoppingCartCount = document.querySelector('.shopping-cart-count');
                shoppingCartCount.innerText = totalQuantity;
                shoppingCartCount.style.display = 'flex';
            }

            const cart = document.querySelector('.shopping-cart');
            const cartProductsContainer = document.querySelector('.cart-items');

            const handleMouseOver = () => {
                cartProductsContainer.style.display = 'flex';
            }
            const handleMouseOut = () => {
                cartProductsContainer.style.display = 'none';
            }

            cart.addEventListener('mouseover', handleMouseOver);
            cart.addEventListener('mouseout', handleMouseOut);

            return () => {
                cart.removeEventListener('mouseover', handleMouseOver);
                cart.removeEventListener('mouseout', handleMouseOut);
            }
        }
    }, [totalQuantity, total, isLoggedIn]);

    return (
        <header>
            <div className="pop-up">
                <span>Added to the cart!</span>
            </div>
            <nav className="effect-1">
                <ul className="top-nav">
                    <li><Link to="/account">Account</Link></li>
                    <li><Link to="/">Home</Link></li>
                    <li className="shopping-cart"><Link to="/cart"><FontAwesomeIcon icon={faCartShopping} /><span className="shopping-cart-count"></span></Link>
                        <div className="cart-items-wrapper">
                            <div className="cart-items">
                                {cartProducts.map((product) => (
                                        <div className="cart-item" key={product.id}>
                                            <img className="cart-item-image" src={product.images[0]} alt={product.title}/>
                                            <h3 className="cart-item-title">{product.title}</h3>
                                            <h3 className="cart-item-price">${product.price}</h3>
                                            <h3 className="cart-item-counter">x{product.quantity}</h3>
                                        </div>
                                    ))}
                                <h3 className="cart-total">TOTAL: ${total}</h3>
                            </div>
                        </div></li>
                    <li className="account-logo"><Link to="/">&spades;</Link></li>
                </ul>
            </nav>
            <div className="promo">
                <h1>Edi's shop</h1>
                <h2>Best prices on the market!</h2>
            </div>
        </header>
    );
}