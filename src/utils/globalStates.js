// Context.js
import React, {useContext, useState} from "react";

export const Context = React.createContext();
export const CartProvider = ({children}) => {
    const [total, setTotal] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);

    return (
        <Context.Provider value={{
            total,
            setTotal,
            totalQuantity,
            setTotalQuantity
        }}
        >
            {children}
        </Context.Provider>
    );
};

export const useCart = () => {
    return useContext(Context);
}