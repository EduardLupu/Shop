import {useRef, useState} from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {setCartProducts, setTotal, setTotalProducts, setTotalQuantity} from "../app/cartSlice";
import {useDispatch} from "react-redux";
import {
    useAddProductToCartMutation,
    useDeleteProductFromCartMutation,
    useRemoveProductFromCartMutation
} from "../app/apiSlice";

function CartItem({product}) {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(product.quantity);
    const plusRef = useRef(null);
    const minusRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);

    const [addToCart] = useAddProductToCartMutation();
    const [deleteFromCart] = useDeleteProductFromCartMutation();
    const [removeFromCart] = useRemoveProductFromCartMutation();

    const handlePlusClick = async () => {
        plusRef.current.disabled = true;
        setQuantity((prevQuantity) => prevQuantity + 1);
        const response = await addToCart(product.id);
        dispatch(setTotal(response.data.total));
        dispatch(setTotalQuantity(response.data.totalQuantity));
        dispatch(setTotalProducts(response.data.totalProducts));
        dispatch(setCartProducts(response.data.products));
        plusRef.current.disabled = false;
    }

    const handleDeleteClick = async () => {
        const response = await deleteFromCart(product.id);
        dispatch(setTotalQuantity(response.data.totalQuantity));
        dispatch(setTotalProducts(response.data.totalProducts));
        dispatch(setTotal(response.data.total));
        dispatch(setCartProducts(response.data.products));
        setIsVisible(false);
    }

    if (!isVisible) {
        return null;
    }

    const handleMinusClick = async () => {
        minusRef.current.disabled = true;

        if (quantity === 1) {
            await handleDeleteClick();
        } else {
            const response = await removeFromCart(product.id);
            setQuantity((prevQuantity) => prevQuantity - 1);
            dispatch(setTotalQuantity(response.data.totalQuantity));
            dispatch(setTotalProducts(response.data.totalProducts));
            dispatch(setTotal(response.data.total));
            dispatch(setCartProducts(response.data.products));
            minusRef.current.disabled = false;
        }
    }

    return (
        <>
            {
                <div className="cart-page-item" data-id={product.id}>
                    <div className="cart-item-info">
                        <img className="cart-page-item-image" src={product.image} alt={product.title}/>
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