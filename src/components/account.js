import '../styles/account.css';
import {Link, Navigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setIsLoggedIn} from "../app/loginSlice";
import checkUserToken from "../utils/checkIfLogged";
import {useLogoutMutation, useProfileQuery} from "../app/apiSlice";


function Account() {
    const dispatch = useDispatch();

    const {data: response, isLoading, isSuccess} = useProfileQuery();
    const [logoutMutation] = useLogoutMutation();
    if (!checkUserToken()) {
        return <Navigate to={'/login'} replace={true}/>
    }
    const handleLogout = async () => {
        await logoutMutation();
        sessionStorage.removeItem('token');
        dispatch(setIsLoggedIn(checkUserToken()));
    };

    const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10);

    return (
        <>
            <p className="account-page-logo"><Link to="/">&spades;</Link></p>
            <div className="account-container">
                <h2>Your Account</h2>
                <div className="account-details">
                    {
                        isSuccess && !isLoading &&
                        <div className="account-info">
                            <img src={response.image} alt="Robohash avatar"/>
                            <h6>{response._id}</h6>
                            <h2>{response.firstName} {response.lastName}</h2>
                            <h4>{response.email}</h4>
                            <h5>Age: {getAge(response.birthDate)}</h5>
                            <h5>BirthDate: {response.birthDate.toString().slice(0, 10)}</h5>
                            <h5>Created at: {response.createdAt.toString().slice(0, 10)}</h5>
                            <h5>Last Time Online: {response.lastTimeOnline.toString().slice(0, 10)}</h5>
                        </div>
                    }
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </>
    );
}

export default Account;