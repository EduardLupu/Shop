import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Shop from "./components/shop";
import Cart from "./components/cart";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/shop" element={<Shop/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="*" element={<h1>404</h1>}/>

            </Routes>
        </Router>
    );
}

export default App;