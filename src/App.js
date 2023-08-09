import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Shop from "./components/shop";
import Cart from "./components/cart";
import Login from "./components/login";
import {useEffect} from "react";
import Account from "./components/account";
import ProductPage from "./components/productPage";
import checkUserToken from "./utils/checkIfLogged";
import {useLogin} from "./utils/useLogin";

function App() {

    const {isLoggedIn, setIsLoggedIn} = useLogin();

    useEffect(() => {
        setIsLoggedIn(checkUserToken());
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
                <Route path="/404" element={<h1 style={{fontSize: "15rem"}}>Error 404: Not Found</h1>}/>
            </Routes>
        </Router>
    );
}

export default App;