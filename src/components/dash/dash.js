import React from "react";
import './dash.css';
import jmclogo from '../../assets/jmclogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

function Dash() 
{

    return (
        <div className="dash-main-main">
            <div className="dash-sidebar">
                <header>
                    <div className="dash-img">
                        <img src={jmclogo} alt="LOGO" />
                    </div>
                    <p>JAMAL MOHAMED COLLEGE</p>
                </header>
                <div className="dash-menu">
                    <div className="dash-item">
                        <a href="/Error"><FontAwesomeIcon icon={faHome} className='dash-fa-fa-icons' />Dashboard</a>
                    </div>
                    <div className="dash-item">
                        <a href="/Error"><FontAwesomeIcon icon={faHome} className='dash-fa-fa-icons' />Mark Reports</a>
                    </div>
                    <div className="dash-item">
                        <a href="/Error"><FontAwesomeIcon icon={faHome} className='dash-fa-fa-icons' />Conversion Reports</a>
                    </div>
                    <div className="dash-item">
                        <a href="/Error"><FontAwesomeIcon icon={faHome} className='dash-fa-fa-icons' />Change Password</a>
                    </div>
                    <div className="dash-item">
                        <a href="/Error"><FontAwesomeIcon icon={faHome} className='dash-fa-fa-icons' />Logout</a>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Dash;