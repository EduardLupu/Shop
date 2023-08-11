import {Product} from "./product";
import {useProducts} from "../utils/useProducts";

import Filter from "./filter";
import ItemLimit from "./limit";
import {useDispatch, useSelector} from "react-redux";
import {setFilterValue} from "../app/itemSlice";
export default function Products() {
    const dispatch = useDispatch();
    const {limit, filterValue} = useSelector((state) => state.item);

    let products = useProducts(limit);
    const handleFilterChange = (value) => {
        dispatch(setFilterValue(value));
    };

    const filteredProducts = products.filter((product) => {
        const {category, title} = product;
        const lowerCaseFilterValue = filterValue.toLowerCase();
        return (
            category.toLowerCase().includes(lowerCaseFilterValue) ||
            title.toLowerCase().includes(lowerCaseFilterValue)
        );
    });

    return (
        <>
            <Filter onFilterChange={handleFilterChange}/>
            <ItemLimit />
            <div className="products">
                {
                    filteredProducts.map((product) => (
                        <Product key={product.id} product={product}/>
                    ))
                }
            </div>
        </>
    );
}