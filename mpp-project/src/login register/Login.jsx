import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'



const Login = () => {
    const [values, setValues] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://mpp2024.onrender.com/login', values, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'JWT fefege...'
            }})
        .then(res => {
            console.log(res);
            if(res.data.login){
                navigate('/');
            }
            else{
                alert('Invalid username or password');
            }
        })
    };
    const handleInput = (event) => {
        event.preventDefault();
        setValues(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };
    return (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <br/>
                <input type="username" name = 'username' onChange={handleInput} />
                <br/>

                <label>Password:</label>
                <br/>
                <input type="password" name = 'password' onChange={handleInput} />
                <br/>

                <button type="submit">Login</button>
                <button type="register"><Link to="/register">Register</Link></button>
            </form>
        </div>
    );
};

export default Login;