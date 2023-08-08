import {useParams} from "react-router-dom";
import {Product} from "./product";
import {useEffect, useState} from "react";
import '../styles/productPage.css';
import {Loader} from "./loader";
import Header from "./header";

function ProductPage() {

    const {id} = useParams();
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            fetch(`https://dummyjson.com/products/${id}`)
                .then((response) => response.json())
                .then((product) => setProduct(product))
                .then(() => setIsLoading(false));
        }
        fetchProduct();

    }, []);

    return (
        <>
            <Header/>
            <div className="product-page">
                {isLoading ? <Loader/> : <Product product={product}/>}
            </div>
        </>
    );


}

export default ProductPage;