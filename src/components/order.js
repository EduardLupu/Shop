import "../styles/order.css";
import {Link, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import React from "react";
import {useCreateOrderMutation} from "../app/apiSlice";

function Order() {
    const {total, totalQuantity, totalProducts, cartProducts} = useSelector((state) => state.cart);
    const [createOrder] = useCreateOrderMutation();

    if (totalQuantity === 0) {
        return <Navigate to={"/shop"} replace={true}/>
    }

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        const shippingAddress = e.target.address.value,
            paymentMethod = e.target.payment.value,
            order = {
                shippingAddress,
                paymentMethod,
            }
        await createOrder({order});
        alert("Order created successfully!");
        window.location.reload();
    }

    return (
        <div className="order-page">
            <div className="order-page-items">
                {
                    cartProducts.map((product, index) => (
                        <div className={"order-item"} key={index}>
                            <img className="cart-page-item-image" src={product.image} alt={product.title}/>
                            <h3 className="cart-page-item-title">{product.title}</h3>
                            <h3 className="cart-page-item-price">${product.price}</h3>
                            <h2>{product.quantity}</h2>
                        </div>
                    ))
                }
            </div>
            <div className="order-details">
                <p className="order-logo"><Link to="/">&spades;</Link></p>
                {
                    <div className="totals">
                        <h3 className="cart-page-total">Total: ${total}</h3>
                        <h3 className="cart-page-total">Total quantity: {totalQuantity}</h3>
                        <h3 className="cart-page-total">Total products: {totalProducts}</h3>
                    </div>
                }
                <h1>Order Details</h1>
                <form className="review-form" onSubmit={handleSubmitOrder}>
                    <div className="input-group">
                        <label htmlFor="name">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            required={true}
                        />
                    </div>
                    <div className={"radios"}>
                        <label htmlFor={"payment"}>Cash</label>
                        <input type={"radio"} id={"payment"} name={"payment"} value={"cash"} required={true}/>
                        <label htmlFor={"payment"}>Card</label>
                        <input type={"radio"} id={"payment"} name={"payment"} value={"card"} required={true}/>
                        <label htmlFor={"payment"}>PayPal</label>
                        <input type={"radio"} id={"payment"} name={"payment"} value={"paypal"} required={true}/>
                    </div>
                    <button>Submit order</button>
                </form>
            </div>
        </div>
    )
}

export default Order;