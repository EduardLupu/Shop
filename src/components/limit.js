import React from "react";
import {setCategory, setLimit, setSearchValue} from "../app/itemSlice";
import {useDispatch, useSelector} from "react-redux";
import {useGetCategoriesQuery} from "../app/apiSlice";
import Filter from "./filter";

const ItemLimit = () => {
    const dispatch = useDispatch();
    const {limit, category} = useSelector((state) => state.item);
    const {data: categories, isLoading} = useGetCategoriesQuery();
    const handleLimitChange = (e) => {
        const newLimit = parseInt(e.target.value);
        dispatch(setLimit(newLimit));
    };

    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        dispatch(setCategory(newCategory));
    }

    const handleSearchChange = (value) => {
        dispatch(setSearchValue(value));
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
            <Filter onSearchChange={handleSearchChange}/>
        </div>
    );
};

export default ItemLimit;