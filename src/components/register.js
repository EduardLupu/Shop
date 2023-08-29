import {Link, Navigate} from "react-router-dom";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useRegisterMutation} from "../app/apiSlice";
import checkUserToken from "../utils/checkIfLogged";
import {setIsLoggedIn} from "../app/loginSlice";

function Register() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        password: '',
        repeatPassword: '',
    });

    const [errors, setErrors] = useState({
        username: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        password: '',
        repeatPassword: '',
    });

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        if (formData.username.trim() === '') {
            newErrors.username = 'Username is required';
            valid = false;
        } else {
            newErrors.username = '';
        }

        if (formData.firstName.trim() === '') {
            newErrors.firstName = 'First name is required';
            valid = false;
        }
        else {
            newErrors.firstName = '';
        }

        if (formData.lastName.trim() === '') {
            newErrors.lastName = 'Last name is required';
            valid = false;
        }
        else {
            newErrors.lastName = '';
        }

        if (formData.birthDate.trim() === '') {
            newErrors.birthDate = 'Birth date is required';
            valid = false;
        }

        if (formData.password === '') {
            newErrors.password = 'Password is required';
            valid = false;
        } else {
            newErrors.password = '';
        }

        if (formData.repeatPassword === '') {
            newErrors.repeatPassword = 'Repeat password is required';
            valid = false;
        }
        else if (formData.repeatPassword !== formData.password) {
            newErrors.repeatPassword = 'Passwords do not match';
            valid = false;
        }

        if (formData.username.includes('@')) {
            // Check for email format
            if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.username)) {
                newErrors.username = 'Invalid email format';
                valid = false;
            }
        }

        setErrors(newErrors);
        return valid;
    };

    const [register] = useRegisterMutation();

    if (checkUserToken()) {
        return <Navigate to={'/shop'} replace={true}/>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try
            {
                const response = await register({
                    email: formData.username,
                    password: formData.password,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    birthDate: formData.birthDate,
                }).unwrap();
                localStorage.clear();
                localStorage.setItem('token', response.token);
                localStorage.setItem('date', Date.now().toString());
                dispatch(setIsLoggedIn(checkUserToken()));
            }
            catch (err)
            {
                console.log(err);
                alert(`Error: ${err.status}: ${err.data.message}`);
            }

        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <>
            <p className="account-page-logo"><Link to="/">&spades;</Link></p>
            <div className="login-container">
                <h1>Register to Edi's Shop</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Email</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                        {errors.username && <p className="error">{errors.username}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                        {errors.firstName && <p className="error">{errors.firstName}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                        {errors.lastName && <p className="error">{errors.lastName}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="birthDate">Birth Date</label>
                        <input
                            type="date"
                            id="birthDate"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleInputChange}
                        />
                        {errors.birthDate && <p className="error">{errors.birthDate}</p>}
                    </div>



                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="repeatPassword">Repeat Password</label>
                        <input
                            type="password"
                            id="repeatPassword"
                            name="repeatPassword"
                            value={formData.repeatPassword}
                            onChange={handleInputChange}
                        />
                        {errors.repeatPassword && <p className="error">{errors.repeatPassword}</p>}
                    </div>
                    <button className="login-submit" type="submit">Register</button>
                </form>
            </div>
        </>
    );

}

export default Register;