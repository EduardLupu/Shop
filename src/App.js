import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Shop from "./components/shop";
import Cart from "./components/cart";
import Login from "./components/login";
import {useEffect, useState} from "react";
import Account from "./components/account";
import ProductPage from "./components/productPage";

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = () => {
        const userToken = localStorage.getItem('user-token');
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
            return;
        }
        setIsLoggedIn(true);
    }
    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);


    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/shop" element={<Shop/>}/>
                <Route path="/shop/:id" element={<ProductPage/>}/>
                <Route path="/cart" element={isLoggedIn === true ? <Cart/> : <Login/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/account" element={isLoggedIn === true ? <Account/> : <Login/>}/>

                <Route path="*" element={<h1 style={{fontSize: "15rem"}}>Error 404: Not Found</h1>}/>

            </Routes>
        </Router>
    );
}

export default App;