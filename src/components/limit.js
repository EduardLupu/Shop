import React, {useEffect, useState} from "react";
import {setCategory, setLimit, setSearchValue} from "../app/itemSlice";
import {useDispatch, useSelector} from "react-redux";
import {useGetCategoriesQuery} from "../app/apiSlice";

const ItemLimit = () => {
    const dispatch = useDispatch();
    const {limit, category} = useSelector((state) => state.item);
    const {data: categories, isLoading} = useGetCategoriesQuery();
    const [inputValue, setInputValue] = useState("");
    const handleLimitChange = (e) => {
        const newLimit = parseInt(e.target.value);
        dispatch(setLimit(newLimit));
    };

    useEffect(() => {
        const delay = 700;
        const timeoutId = setTimeout(() => {
            dispatch(setSearchValue(inputValue));
        }, delay);

        return () => clearTimeout(timeoutId);
    }, [inputValue, dispatch]);

    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        dispatch(setCategory(newCategory));
    }

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
    };

    return (
        <div className="item-limit">
            <select id="limit" value={limit} onChange={handleLimitChange}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
            </select>
            <div className="categories">
                <select id="categories" value={category} onChange={handleCategoryChange}>

                    {
                        !isLoading &&
                        categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))
                    }
                </select>
            </div>
            <input
                className="filter-bar"
                type="search"
                placeholder="Search by any text field..."
                value={inputValue}
                onChange={handleSearchChange}
            />
        </div>
    );
};

export default ItemLimit;