import {useRef, useState} from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {setTotal, setTotalProducts, setTotalQuantity} from "../app/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import {
    useAddProductToCartMutation,
    useDeleteProductFromCartMutation,
    useRemoveProductFromCartMutation
} from "../app/apiSlice";

function CartItem({product}) {
    const dispatch = useDispatch();
    const {total, totalQuantity, totalProducts} = useSelector(state => state.cart);
    const [quantity, setQuantity] = useState(product.quantity);
    const plusRef = useRef(null);
    const minusRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);

    const [addToCart] = useAddProductToCartMutation();
    const [deleteFromCart] = useDeleteProductFromCartMutation();
    const [removeFromCart] = useRemoveProductFromCartMutation();

    const handlePlusClick = () => {
        plusRef.current.disabled = true;
        const newTotalQuantity = totalQuantity + 1;
        const newTotal = total + product.price;
        dispatch(setTotal(newTotal));
        dispatch(setTotalQuantity(newTotalQuantity));
        setQuantity((prevQuantity) => prevQuantity + 1);

        addToCart({id: product.id, quantity: 1});

        plusRef.current.disabled = false;
    }

    const handleDeleteClick = () => {
        const newTotalQuantity = totalQuantity - quantity;
        const newTotalProducts = totalProducts - 1;
        const newTotal = total - product.price * quantity;

        dispatch(setTotalQuantity(newTotalQuantity));
        dispatch(setTotalProducts(newTotalProducts));
        dispatch(setTotal(newTotal));

        deleteFromCart(product.id);
        setIsVisible(false);
    }

    if (!isVisible) {
        return null;
    }

    const handleMinusClick = () => {
        minusRef.current.disabled = true;

        if (quantity === 1) {
            handleDeleteClick();
        }
        else {
            const newTotalQuantity = totalQuantity - 1;
            const newTotal = total - product.price;

            dispatch(setTotal(newTotal));
            dispatch(setTotalQuantity(newTotalQuantity));
            setQuantity((prevQuantity) => prevQuantity - 1);

            removeFromCart(product.id, -1);

            minusRef.current.disabled = false;
        }
    }

    return (
        <>
            {
                <div className="cart-page-item" data-id={product.id}>
                    <div className="cart-item-info">
                        <img className="cart-page-item-image" src={product?.images[0]} alt={product.title}/>
                        <h3 className="cart-page-item-title">{product.title}</h3>
                        <h3 className="cart-page-item-price">${product.price}</h3>
                    </div>
                    <div className="edit-container">
                        <button
                            className="cart-page-item-edit-quantity"
                            onClick={handleMinusClick}
                            ref={minusRef}
                        >-
                        </button>
                        <h3 className="cart-page-item-counter">{quantity}</h3>
                        <button
                            className="cart-page-item-edit-quantity"
                            onClick={handlePlusClick}
                            ref={plusRef}>+
                        </button>
                        <button className="delete-button" onClick={handleDeleteClick}><FontAwesomeIcon icon={faTrashCan} /></button>
                    </div>
                </div>
            }
        </>
    )
}

export default CartItem;