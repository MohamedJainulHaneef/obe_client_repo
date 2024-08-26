import React, { useState } from 'react'; 
import './login.css';
import jmclogo from '../../assets/jmclogo.png';
import axios from 'axios';

function Login()
{
    const [staffId, setStaffId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => 
    {
        try {
            const response = await axios.post('http://localhost:5000/login', {
                staff_id: staffId,
                staff_password: password,
            });

            if (response.data.success) {
                alert('Login Success');
            } 

            else {
                alert('Invalid Staff ID or Password');
            }
        } 
        catch (error) {
            alert('Invalid Staff ID or Password');
            console.error('Login Error : ', error);
        }
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
                        <span className='log-clg-span'>TRICHY - 620 008 .</span>
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
                <button className="log-desc-btn" onClick={handleLogin}>LOGIN</button>
            </div>
        </div>
    );
}

export default Login;