import {Link} from "react-router-dom";
import '../styles/cart.css';
import {useEffect, useState} from "react";
import {initCartProducts} from "../middleware/api";
import CartItem from "./cartItem";

function Cart() {

    const [cartProducts, setCartProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);

    useEffect(() => {

        async function fetchData() {
            const cart = await initCartProducts();
            setCartProducts(cart.products);
            setTotal(cart.total)
            setTotalQuantity(cart.totalQuantity)
            setTotalProducts(cart.totalProducts)
        }

        fetchData();

    }, []);

    const handleDelete = (_product) => {
        setTotalQuantity((prevQuantity) => prevQuantity - _product.quantity);
        setTotalProducts((prevProducts) => prevProducts - 1);
        setTotal((prevTotal) => prevTotal - _product.price * _product.quantity);
        setCartProducts((prevProducts) => prevProducts.filter((product) => product.id !== _product.id));
    }

    const handleAdd = (_product) => {
        setTotal((prevTotal) => prevTotal + _product.price);
        setTotalQuantity((prevQuantity) => prevQuantity + 1);
    }

    const handleRemove = (_product) => {
        setTotal((prevTotal) => prevTotal - _product.price);
        setTotalQuantity((prevQuantity) => prevQuantity - 1);
    }


    return (
        <div className="cart-page">
            <Link to="/shop"><h1 className="account-logo">&spades;</h1></Link>
            <div className="cart-page-items">
                {cartProducts.map((product) => (<CartItem key={product.id} product={product}
                                                          onAdd={handleAdd} onRemove={handleRemove}
                                                          onDelete={handleDelete}/>))}
            </div>
            <div className="totals">
                <h3 className="cart-page-total">Total quantity: {totalQuantity}</h3>
                <h3 className="cart-page-total">Total products: {totalProducts}</h3>
                <h3 className="cart-page-total">Total: ${total}</h3>
            </div>
            <button className="buy-button">Buy!</button>
        </div>
    )
}

export default Cart;