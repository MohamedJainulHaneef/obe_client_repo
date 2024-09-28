import { useEffect, React, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { faHome, faFileAlt, faExchangeAlt, faKey, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Outlet, useParams, useNavigate } from 'react-router-dom';
import Jmclogo from '../../assets/jmclogo.png';
import { useAuth } from '../authenticate/authenticate' // Import useAuth

import './layout.css';

function Layout() {
    const apiUrl = process.env.REACT_APP_API_URL;

    const { staffId } = useParams();
    const navigate = useNavigate(); // Hook for navigation
    const { logout } = useAuth(); // Get logout function from context
    const [user, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`${apiUrl}/scope/${staffId}`)
            .then(response => {
                setUsers(response.data);
            })
            .catch(err => console.log(err));
    }, [staffId, apiUrl]);

    const handleLogout = () => {
        logout(); // Call logout function
        navigate('/', { replace: true }); // Redirect to login page
    };

    const menus = [
        {
            icon: faHome,
            name: 'Dashboard',
            path: `/staff/${staffId}/dashboard`,
            show: user && user.dashboard === 1,
        },
        {
            icon: faFileAlt,
            name: 'Course List',
            path: `/staff/${staffId}/courselist`,
            show: user && user.course_list === 1,
        },
        {
            icon: faExchangeAlt,
            name: 'Report',
            path: `/staff/${staffId}/report`,
            show: user && user.report === 1,
        },
        {
            icon: faKey,
            name: 'Upload Files',
            path: `/staff/${staffId}/uploadfile`,
            show: user && user.upload_files === 1,
        }
    ];

    return (
        <div className="layout-container">
            <div className="layout-sidebar">
                <div className="layout-header">
                    <img src={Jmclogo} alt="" className="layout-logo" />
                    <div className="layout-college-info">
                        <span className="layout-college-name">JAMAL MOHAMED COLLEGE<br /></span>
                        <span className="layout-college-type">(Autonomous)<br /></span>
                        <span className="layout-college-location">TIRUCHIRAPPALLI - 620 020 .<br /></span>
                    </div>
                </div>
                {menus
                    .filter(item => item.show)
                    .map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) => `layout-menu-item ${isActive ? 'layout-active' : ''}`}
                        >
                            <FontAwesomeIcon icon={item.icon} className="lay-fa-fa-icons" />
                            <label className="layout-menu-label">{item.name}</label>
                        </NavLink>
                    ))}
                <button onClick={handleLogout} className="layout-menu-item layout-logout-btn">
                    <FontAwesomeIcon icon={faSignOutAlt} className="lay-fa-fa-icons" />
                    <label className="layout-menu-label">Logout</label>
                </button>
            </div>
            <div className="layout-content">
                <div className="layout-content-inner">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Layout;