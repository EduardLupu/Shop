import {useGetOrdersQuery} from "../app/apiSlice";
import "../styles/orders.css";
import React, {useState} from "react";
import {Link, Navigate} from "react-router-dom";
import checkUserToken from "../utils/checkIfLogged";
function Orders() {

    const {data: orders, isLoading} = useGetOrdersQuery();
    const [selected, setSelected] = useState(-1);

    if (!checkUserToken()) {
        return <Navigate to={'/login'} replace={true}/>
    }

    const handleSelected = (e) => {
        const order = e.target.closest(".order");
        if (order) {
            setSelected(Array.from(order.parentNode.children).indexOf(order));
        }
        else {
            setSelected(-1);
        }
    }

    return (
        <div className={"orders-page"}>
            <div className={"orders"} onClick={handleSelected}>
                {
                    !isLoading && orders.map((order, index) => (
                        <div className={"order"} key={index}>
                            <p>Order: {order._id}</p>
                            <p>Total: ${order.total}</p>
                            <p>Total quantity: {order.totalQuantity}</p>
                            <p>Shipping Address: {order.shippingAddress}</p>
                            <p>Payment Method: {order.paymentMethod}</p>
                            <p>Created at: {order.createdAt.toString().slice(0, 10)}</p>
                            <p>Order status: {order.orderStatus}</p>
                        </div>
                    ))
                }
            </div>
            <div className={"selected-order"}>
                <p className="order-logo"><Link to="/shop">&spades;</Link></p>
                <h1>Order Products</h1>
                <div className={"order-items"}>
                    {
                        !isLoading && selected !== -1 && orders[selected].products.map((product) => (
                            <div className={"order-item"} key={product._id}>
                                <img className="cart-page-item-image" src={product.image} alt={product.title}/>
                                <h3 className="cart-page-item-title">{product.title}</h3>
                                <h3 className="cart-page-item-price">${product.price}</h3>
                                <h2>{product.quantity}</h2>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Orders;