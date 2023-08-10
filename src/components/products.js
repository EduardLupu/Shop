import {Product} from "./product";
import {useProducts} from "../utils/useProducts";
import {useState} from "react";

import Filter from "./filter";
import ItemLimit from "./limit";
export default function Products() {
    const [limit, setLimit] = useState(6);
    const [filterValue, setFilterValue] = useState("");

    let products = useProducts(limit);
    const handleFilterChange = (value) => {
        setFilterValue(value);
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
            <ItemLimit limit={limit} onLimitChange={setLimit} />
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
