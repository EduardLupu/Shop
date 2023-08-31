import {Link, Navigate, useNavigate} from "react-router-dom";
import '../styles/cart.css';
import CartItem from "./cartItem";
import {setCartProducts, setTotal, setTotalProducts, setTotalQuantity} from "../app/cartSlice";
import {useEmptyCartMutation, useInitCartProductsQuery} from "../app/apiSlice";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useRef} from "react";
import checkUserToken from "../utils/checkIfLogged";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {data: response,isLoading, isSuccess} = useInitCartProductsQuery();
    const {total, totalQuantity, totalProducts, cartProducts} = useSelector(state => state.cart);
    const isMounted = useRef(false);
    const [emptyCartMutation] = useEmptyCartMutation();

    useEffect(() => {
        if (!isMounted.current && response) {
            dispatch(setCartProducts(response.products));
            dispatch(setTotal(response.total));
            dispatch(setTotalQuantity(response.totalQuantity));
            dispatch(setTotalProducts(response.totalProducts));
            isMounted.current = true;
        }
        else {
            dispatch(setTotal(total));
            dispatch(setTotalQuantity(totalQuantity));
            dispatch(setTotalProducts(totalProducts));
            dispatch(setCartProducts(cartProducts));
        }
    }, [dispatch, response, total, totalQuantity, totalProducts, cartProducts]);

    if (!checkUserToken()) {
        return <Navigate to={'/login'} replace={true}/>
    }

    if (isSuccess && totalQuantity === 0) {
        return (
            <div className={"centered-div"}>
                <h1 className={"order-logo"}>You have no items in the cart!</h1>
                <p className={"order-logo"}><Link to="/shop">&spades;</Link></p>
            </div>
        )
    }

    const handleClickBuy = () => {
        if (totalQuantity === 0) {
            alert("You must add at least one product to cart!");
            return;
        }
        const order =  {
            total: total,
            totalQuantity: totalQuantity,
            totalProducts: totalProducts,
            products: cartProducts,
        };

        navigate('/order', {state: {order}});
    }

    return (
        <div className="cart-page">
            <Link to="/shop"><h1 className="account-logo">&spades;</h1></Link>
            <div className="cart-page-items">
                {
                    isSuccess && !isLoading &&
                    cartProducts.map((product) => (<CartItem key={product.id} product={product}/>))
                }
            </div>
            {
                <div className="totals">
                    <h3 className="cart-page-total">Total: ${total}</h3>
                    <h3 className="cart-page-total">Total quantity: {totalQuantity}</h3>
                    <h3 className="cart-page-total">Total products: {totalProducts}</h3>
                    <button className="empty-cart-button" onClick={async () => {
                        const confirm = window.confirm("Are you sure you want to empty your cart?");
                        if (confirm) {
                            await emptyCartMutation();
                            dispatch(setCartProducts([]));
                            dispatch(setTotal(0));
                            dispatch(setTotalQuantity(0));
                            dispatch(setTotalProducts(0));
                        }
                    }}><FontAwesomeIcon icon={faTrash} /></button>
                </div>
            }
            <button className="buy-button" onClick={handleClickBuy}>Buy!</button>
        </div>
    )
}

export default Cart;