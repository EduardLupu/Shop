import {useParams} from "react-router-dom";
import {Product} from "./product";
import {useContext, useEffect, useState} from "react";
import '../styles/productPage.css';
import {Loader} from "./loader";
import Header from "./header";
import {getProduct} from "../middleware/api";
import {useCart} from "../utils/globalStates";
function ProductPage() {

    let {id} = useParams();
    id = parseInt(id);
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const _context = useCart();

    useEffect(() => {

        async function fetchData() {
            if (id > 100) {
                window.location.href = '/404'
                return;
            }

            let newProduct = null;

            if (localStorage.getItem('products')) {
                const products = JSON.parse(localStorage.getItem('products'));

                products.forEach((product) => {
                    if (product.id === id) {
                        newProduct = product;
                    }
                });

                if (!newProduct) {
                    newProduct = await getProduct(id);
                    localStorage.setItem('products', JSON.stringify([].concat(newProduct, products)));
                }
            }
            else {
                newProduct = await getProduct(id);
                localStorage.setItem('products', JSON.stringify([].concat(newProduct)));
            }

            setProduct(newProduct);
            setIsLoading(false);
        }
        fetchData();

    }, []);

    return (
        <>
            <Header/>
            <div className="product-page">
                {isLoading ? <Loader/> : <Product product={product} context={_context}/>}
            </div>
        </>
    );


}

export default ProductPage;