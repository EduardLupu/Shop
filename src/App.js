import './index.css'
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Shop from "./components/shop";
import Cart from "./components/cart";
import Login from "./components/login";
import Account from "./components/account";
import ProductPage from "./components/productPage";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {setIsLoggedIn} from "./app/loginSlice";
import checkUserToken from "./utils/checkIfLogged";
import Register from "./components/register";

function App() {
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setIsLoggedIn(checkUserToken()));
    }, [dispatch]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/shop" element={<Shop/>}/>
                <Route path="/shop/:id" element={<ProductPage/>}/>
                <Route path="/cart" element={isLoggedIn ? <Cart/> : <Login/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/account" element={isLoggedIn ? <Account/> : <Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="*" element={<h1 style={{fontSize: "15rem"}}>Error 404: Not Found</h1>}/>
                <Route path="/404" element={<h1 style={{fontSize: "15rem"}}>Error 404: Not Found</h1>}/>
            </Routes>
        </Router>
    );
}

export default App;