import Header from "./header";
import Products from "./products";
import {CartProvider} from "../utils/globalStates";

function Shop() {
    return (
        <>
            <CartProvider>
                <Header/>
                <Products/>
            </CartProvider>
        </>
    );
}

export default Shop;