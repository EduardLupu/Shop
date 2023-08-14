import '../styles/account.css';
import {Link, Navigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setIsLoggedIn} from "../app/loginSlice";
import checkIfLogged from "../utils/checkIfLogged";
function Account() {
    const dispatch = useDispatch();

    if (!checkIfLogged()) {
        return <Navigate to={'/login'}/>
    }
    const handleLogout = () => {
        localStorage.removeItem('user-token');
        dispatch(setIsLoggedIn(checkIfLogged()));
        return <Navigate to={'/'}/>
    };

    return (
        <>
            <p className="account-page-logo"><Link to="/">&spades;</Link></p>
            <div className="account-container">
                <h2>Your Account</h2>
                <div className="account-details">
                    <p>
                        <strong>Token:</strong>
                    </p>
                    <p>
                        <strong>{localStorage.getItem('user-token')}</strong>
                    </p>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </>
    );
}

export default Account;