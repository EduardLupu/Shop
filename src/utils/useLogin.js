import React from "react";

export const loginContext = React.createContext();

export const LoginProvider = ({children}) => {
const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    return (
        <loginContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn
        }}
        >
            {children}
        </loginContext.Provider>
    );
}

export const useLogin = () => {
    return React.useContext(loginContext);
}