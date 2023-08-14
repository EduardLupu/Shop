
import '../styles/account.css';
import {Link} from "react-router-dom";
function Account() {

    const handleLogout = () => {
        localStorage.removeItem('user-token');
        window.location.href = '/Shop';
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