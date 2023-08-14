import React, {useState} from 'react';
import '../styles/login.css';

import { useLoginMutation } from "../app/apiSlice";

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        username: '',
        password: '',
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

        if (formData.password === '') {
            newErrors.password = 'Password is required';
            valid = false;
        } else {
            newErrors.password = '';
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

    const [loginMutation] = useLoginMutation(); // Destructuring the loginMutation function and states
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const email = formData.username;
                const response = await loginMutation({email: email, password: formData.password}).unwrap();
                if (response?.token) {
                    localStorage.setItem('user-token', response.token);
                    window.location.href = '/Shop/#/shop';
                }
            } catch (error) {
                alert(`Error ${error.status}: ${error.data.error}`);
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
        <div className="login-container">
            <h1>Login to Edi's Shop</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Username or Email</label>
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
                <button className="login-submit" type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
