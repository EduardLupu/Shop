import {Product} from "./product";
import ItemLimit from "./limit";
import {useDispatch, useSelector} from "react-redux";
import {setOffset} from "../app/itemSlice";
import {useEffect, useRef} from "react";
import {useGetProductsByCategoryQuery, useGetProductsBySearchQuery, useGetProductsQuery} from "../app/apiSlice";

export default function Products() {
    const dispatch = useDispatch(),
        {limit, offset, category, searchValue} = useSelector((state) => state.item),
        {data: response, isFetching} = useGetProductsQuery({limit: limit, skip: offset}),
        isMounted = useRef(false),
        {data: categoryProducts, isSuccess} = useGetProductsByCategoryQuery(category, {
            skip: category === "All products" || category === ""}),
        {data: searchProducts, isLoading} = useGetProductsBySearchQuery(searchValue, {
            skip: searchValue === ""});

    let products = response ?? [];

    useEffect(() =>  {
        const onScroll = () => {
            const scrolledToBottom =
                window.innerHeight + window.scrollY >= document.body.offsetHeight;
            if (scrolledToBottom && !isFetching && !isMounted.current) {
                const newOffset = offset + limit;
                dispatch(setOffset(newOffset));
                isMounted.current = true;
            }
        };

        if ((category === "All products" || category === "") && searchValue === "") {
            document.addEventListener("scroll", onScroll);
        }

        return function () {
            document.removeEventListener("scroll", onScroll);
            isMounted.current = false;
        };

    }, [offset, isFetching, category, searchValue]);

    return (
        <>
            <ItemLimit/>
            <div className="products">
                {
                    isSuccess ? categoryProducts.map((product) => (
                        <Product key={product.id} product={product}/>
                    )) : searchValue !== "" && !isLoading ? searchProducts.map((product) => (
                        <Product key={product.id} product={product}/>
                    )) :
                    products.map((product) => (
                        <Product key={product.id} product={product}/>
                    ))
                }
            </div>
        </>
    );
}