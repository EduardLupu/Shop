import {Product} from "./product";
import {useProducts} from "../utils/useProducts";
import {useState} from "react";
import Filter from "./filter";

export default function Products() {
    let products = useProducts();
    const [filterValue, setFilterValue] = useState(""); // State to hold the filter value
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
