import {setCartProducts, setTotal, setTotalProducts, setTotalQuantity} from "../app/cartSlice";


export function dispatchCart(dispatch, response) {
    dispatch(setTotal(response.data.data.total));
    dispatch(setTotalQuantity(response.data.data.totalQuantity));
    dispatch(setTotalProducts(response.data.data.totalProducts));
    dispatch(setCartProducts(response.data.data.products));
}