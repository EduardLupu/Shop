import React, {useState} from "react";
export default function Filter({ onSearchChange }) {
    const [searchValue, setSearchValue] = useState("");
    const handleChange = (event) => {
        const value = event.target.value;
        setSearchValue(value);
        onSearchChange(value);
    };

    return (
        <>
            <input
                className="filter-bar"
                type="search"
                placeholder="Search by any text field..."
                value={searchValue}
                onChange={handleChange}
            />
        </>
    );
}