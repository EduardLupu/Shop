import "../styles/order.css";
import {Navigate} from "react-router-dom";
import {useInitCartProductsQuery} from "../app/apiSlice";
function Order() {
    const {data: response,isLoading, isSuccess} = useInitCartProductsQuery();

    if (isSuccess && !isLoading) {
        console.log(response);
    }

    const total = response.total,
        totalQuantity = response.totalQuantity,
        totalProducts = response.totalProducts,
        cartProducts = response.products;

    if (totalQuantity === 0) {
        alert("You must add at least one product to cart!");
        return <Navigate to={"/shop"} replace={true}/>
    }

    return (
        <div className="order-page">
            <div className="order-details">
                <h1>Order Details</h1>
                <form className="review-form">
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
                    <button>Submit</button>
                </form>
            </div>
            <div className="cart-page-items">
                {
                    cartProducts.map((product) => (
                        <div className={"order-item"}>
                            <img className="cart-page-item-image" src={product.image} alt={product.title}/>
                            <h3 className="cart-page-item-title">{product.title}</h3>
                            <h3 className="cart-page-item-price">${product.price}</h3>
                            <h2>{product.quantity}</h2>
                        </div>
                    ))
                }
            </div>
            {
                <div className="totals">
                    <h3 className="cart-page-total">Total: ${total}</h3>
                    <h3 className="cart-page-total">Total quantity: {totalQuantity}</h3>
                    <h3 className="cart-page-total">Total products: {totalProducts}</h3>
                </div>
            }
        </div>
    )
}

export default Order;