import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import './login.css';
import jmclogo from '../../assets/jmclogo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../authenticate/authenticate'; // Import AuthContext


function Login() {
    const apiUrl = process.env.REACT_APP_API_URL;

    const [staffId, setStaffId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Get login function from context
    const { logout } = useAuth(); // Get logout function from context

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${apiUrl}/login`, {
                staff_id: staffId,
                staff_pass: password,
            });

            if (response.data.success) {
                login(staffId);
                navigate(`staff/${staffId}/dashboard`, { replace: true }); // Use replace here
            }
            else {
                alert(response.data.message);
                console.log("errppr")
            }
        }
        catch (error) {
            alert('An error occurred. Please try again later.');
            console.error('Login Error: ', error);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/', { replace: true }); // Use replace here
    };


    return (
        <div className='log-parent'>
            <div className='log-left-container'>
                <div className='log-left-top'>
                    <img src={jmclogo} alt="LOGO" className="log-jmclogo" />
                </div>
                <div className='log-left-bottom'>
                    <div className='log-clg-desc'>
                        <span className='log-clg-span'>JAMAL MOHAMED COLLEGE</span>
                        <span className='log-clg-span'>( AUTONOMOUS )</span>
                        <span className='log-clg-span'>TIRUCHIRAPPALLI - 620 020 .</span>
                    </div>
                </div>
            </div>
            <div className='log-right-container'>
                <span className="log-desc-para">LOGIN TO YOUR ACCOUNT</span>
                <input
                    className="log-desc-input"
                    type="text"
                    placeholder="Enter Staff ID"
                    value={staffId}
                    onChange={(e) => setStaffId(e.target.value)}
                    required
                />
                <input
                    className="log-desc-input"
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <a href="www.google.com" className="log-desc-anchor">Forgot Password</a>
                <button className="log-desc-btn" onClick={handleLogin}>
                    <FontAwesomeIcon icon={faLock} className='log-fa-fa-icons' />
                    <div className='log-login-desc' onClick={handleLogout}>LOGIN</div>
                </button>
            </div>
        </div>
    );
}

export default Login;