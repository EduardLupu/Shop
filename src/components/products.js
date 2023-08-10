import {Product} from "./product";
import {useProducts} from "../utils/useProducts";
import {useEffect, useRef, useState} from "react";

import Filter from "./filter";
import ItemLimit from "./limit";
import {useDispatch, useSelector} from "react-redux";
import {setFilterValue} from "../app/itemSlice";
import {useGetProductsQuery} from "../app/apiSlice";
export default function Products() {
    const dispatch = useDispatch();
    const {limit, filterValue} = useSelector((state) => state.item);
    const [offset, setOffset] = useState(0);
    const isInitialMount = useRef(true);

    const params = {limit: limit, skip: offset};

    const {data: products, isError, isLoading, isSuccess } = useGetProductsQuery(params);
    const handleFilterChange = (value) => {
        dispatch( setFilterValue(value));
    };

    let content;
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Something went wrong...</div>;
    if (isSuccess) {
        console.log(products);
        content = products.products.map((product) => (
            <Product key={product.id} product={product}/>
        ))
    }

    // const filteredProducts = products.filter((product) => {
    //     const {category, title} = product;
    //     const lowerCaseFilterValue = filterValue.toLowerCase();
    //     return (
    //         category.toLowerCase().includes(lowerCaseFilterValue) ||
    //         title.toLowerCase().includes(lowerCaseFilterValue)
    //     );
    // });

    // useEffect(() => {
    //
    //     if (isInitialMount.current) {
    //         const fetchProducts = async () => {
    //             try {
    //
    //             } catch (error) {
    //                 console.error('Error fetching products:', error);
    //             }
    //         };
    //         fetchProducts();
    //         isInitialMount.current = false;
    //     }
    //
    //     const handleScroll = (e) => {
    //         const scrollHeight = e.target.documentElement.scrollHeight;
    //         const currentHeight =
    //             e.target.documentElement.scrollTop + window.innerHeight;
    //         if (currentHeight + 1 >= scrollHeight) {
    //             setOffset((prevOffset) => prevOffset + limit);
    //             isInitialMount.current = true;
    //         }
    //     };
    //     window.addEventListener('scroll', handleScroll);
    //
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     }
    //
    //
    //
    // }, [offset]);

    return (
        <>
            <Filter onFilterChange={handleFilterChange}/>
            <ItemLimit />
            <div className="products">
                {
                    isSuccess && content
                }
            </div>
        </>
    );
}
