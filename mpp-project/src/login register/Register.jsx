import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'


const Register = () => {
    const [values, setValues] = useState({
        username: ' ',
        password: ' ',
        confirmPassword: ' '
    });

    const handleInput = (event) => {
        setValues(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };
    const navigate = useNavigate();
    const handleRegister = async (event) => {
        // Add your registration logic here
        event.preventDefault();
        // if (password !== confirmPassword) {
        //     alert('Passwords do not match');
        //     return;
        //     // even if the passwords are the same the error still shows up, because the password and confirmPassword are not defined
        //     // to define them, you need to destructure the values object
        //     // at line 7, change the values object to this:
        //     // const { username, password, confirmPassword } = values;

        // }
        axios.post('https://mpp2024.onrender.com/register', values)
        .then(res => {
            console.log(res);
            navigate('/login')
        })
        .catch(err => console.log(err));
    };

    return (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
            <h1>Register</h1>
            <br/>
            <form onSubmit={handleRegister}>
                <label htmlFor="username">Username:</label>
                <br/>
                <input
                    type="username"
                    name = 'username'
                    onChange={handleInput}

                />
                <br/>

                <label htmlFor="password">Password:</label>
                <br/>
                <input
                    type="password"
                    name = 'password'
                    onChange={handleInput}
                />
                <br/>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <br/>
                <input
                    type="password"
                    name = 'confirmPassword'
                    onChange={handleInput}
                />
                <br/>

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;