
import '../styles/account.css';
import Header from "./header";
function Account() {

    const handleLogout = () => {
        localStorage.removeItem('user-token');
        window.location.href = '/';
    };

    return (
        <>
            <Header/>
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