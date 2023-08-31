import {useDeliverOrderMutation, useGetOrdersQuery, useGetReturnsQuery} from "../app/apiSlice";
import "../styles/orders.css";
import React, {useState} from "react";
import {Link, Navigate} from "react-router-dom";
import checkUserToken from "../utils/checkIfLogged";
import {faArrowRotateLeft, faTruck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useCreateReturnMutation} from "../app/apiSlice";

function Orders() {

    const {data: orders, isLoading} = useGetOrdersQuery();
    const [selected, setSelected] = useState(-1);
    const {data: returns, isSuccess} = useGetReturnsQuery();
    const [createReturn] = useCreateReturnMutation();
    const [deliverOrder] = useDeliverOrderMutation();

    if (!checkUserToken()) {
        return <Navigate to={'/login'} replace={true}/>
    }

    if (!isLoading && orders.length === 0) {
        return (
            <div className={"centered-div"}>
                <h1 className={"order-logo"}>You have no orders!</h1>
                <p className={"order-logo"}><Link to="/shop">&spades;</Link></p>
            </div>
        )
    }

    const handleSelected = (e) => {
        const order = e.target.closest(".order");
        if (order) {
            setSelected(Array.from(order.parentNode.children).indexOf(order));
        } else {
            setSelected(-1);
        }
    }

    return (
        <div className={"orders-page"}>
            <div className={"orders"} onClick={handleSelected}>
                {
                    !isLoading && orders.map((order) => (
                        <div className={"order"} key={order._id}>
                            <p>Order:<br/> {order._id}</p>
                            <p>Total: ${order.total}</p>
                            <p>Total Quantity: {order.totalQuantity}</p>
                            <p>Address: {order.shippingAddress}</p>
                            <p>Payment Method: {order.paymentMethod}</p>
                            <p>Created at: {order.createdAt.toString().slice(0, 10)}</p>
                            <p>Status: {order.orderStatus}</p>
                            {
                                order.orderStatus === "pending" &&
                                <button className="deliver-button" onClick={() => {
                                    const confirmDeliver = window.confirm("Are you sure you received this order?");
                                    if (confirmDeliver) {
                                        const params = {
                                            orderId: order._id,
                                        }
                                        deliverOrder(params);
                                    }
                                }}><FontAwesomeIcon icon={faTruck}/></button>
                            }
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
                            <div className={"selected-order-item"} key={product._id}>
                                <img className="cart-page-item-image" src={product.image} alt={product.title}/>
                                <h3 className="cart-page-item-title">{product.title}</h3>
                                <h3 className="cart-page-item-price">${product.price}</h3>
                                <h3 className="cart-page-item-counter">{product.quantity}</h3>
                                {
                                    orders[selected].orderStatus !== "pending" &&
                                    <button className="return-button" onClick={() => {
                                        const reason = prompt("Why do you want to return this product?");
                                        if (reason) {
                                            const params = {
                                                product: product,
                                                orderId: orders[selected]._id,
                                                reason: reason,
                                            }
                                            createReturn(params);
                                        }
                                    }}><FontAwesomeIcon icon={faArrowRotateLeft}/></button>
                                }
                            </div>
                        ))
                    }
                </div>
                {
                    !isLoading && selected !== -1 && orders[selected].orderStatus.includes("returned") &&
                    <h1>Returned Items</h1>
                }
                <div className={"returned-items"}>
                    {
                        !isLoading && isSuccess && selected !== -1 && orders[selected].orderStatus.includes("returned") &&
                        returns.map((returnedItem) => (
                            <div className={"selected-order-item"} key={returnedItem.product._id}>
                                <img className="cart-page-item-image" src={returnedItem.product.image}
                                     alt={returnedItem.product.title}/>
                                <h3 className="cart-page-item-title">{returnedItem.product.title}</h3>
                                <h3 className="cart-page-item-price">${returnedItem.product.price}</h3>
                                <h2>{returnedItem.reason}</h2>
                                <h2>{returnedItem.createdAt.slice(0, 10)}</h2>


                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Orders;