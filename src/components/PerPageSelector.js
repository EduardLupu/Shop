import React, { useState } from 'react';

const PerPageSelector = ({ options, onChange }) => {
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleSelectChange = (event) => {
        const newOption = parseInt(event.target.value, 10);
        setSelectedOption(newOption);
        onChange(newOption);
    };

    return (
        <div>
            <label htmlFor="perPage">Items per page:</label>
            <select id="perPage" value={selectedOption} onChange={handleSelectChange}>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default PerPageSelector;