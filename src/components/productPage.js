import {Link, useParams} from "react-router-dom";
import {Product} from "./product";
import '../styles/productPage.css';
import {Loader} from "./loader";
import Header from "./header";
import {useGetProductQuery} from "../app/apiSlice";
function ProductPage() {

    let {id} = useParams();
    id = parseInt(id);

    const {data: product, isLoading} = useGetProductQuery(id);

    if (id > 100 || id < 1) {
        window.location.href = '/404'
        return;
    }


    return (
        <>
            <Header/>
            <div className="other-items">
                {id > 1 ? <Link to={`/shop/${id - 1}`}>
                    <button>Previous</button></Link>: <button style={{pointerEvents: "none", opacity: 0.5}}>Previous</button>}
                {id < 100 ? <Link to={`/shop/${id + 1}`}>
                    <button>Next</button></Link>: <button style={{pointerEvents: "none", opacity: 0.5}}>Next</button>}
            </div>
            <div className="product-page">
                {isLoading ? <Loader/> : <Product product={product}/>}
            </div>
        </>
    );
}

export default ProductPage;