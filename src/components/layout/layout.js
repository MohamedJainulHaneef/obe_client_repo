import { useEffect, React, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { faHome, faFileAlt, faExchangeAlt, faKey, faSignOutAlt , faGear} from '@fortawesome/free-solid-svg-icons';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import Jmclogo from '../../assets/jmclogo.png';
import { useAuth } from '../login/authenticate/authenticate'; // Import useAuth
import { useNavigate } from 'react-router-dom';

import './layout.css';

function Layout() {
    const apiUrl = process.env.REACT_APP_API_URL;

    const { staffId: urlStaffId } = useParams(); // Get the staffId from the URL
    const navigate = useNavigate(); // Hook for navigation
    const { logout, isAuthenticated, staffId: contextStaffId } = useAuth(); // Get logout function and staffId from context
    const [user, setUsers] = useState([]);

    useEffect(() => {
        if (!isAuthenticated || urlStaffId !== contextStaffId) {
            navigate('/', { replace: true }); // Redirect if not authenticated or staff ID does not match
        }
    }, [isAuthenticated, urlStaffId, contextStaffId, navigate]);

    useEffect(() => {
        axios.get(`${apiUrl}/scope/${urlStaffId}`)
            .then(response => {
                setUsers(response.data);
            })
            .catch(err => console.log(err));
    }, [urlStaffId, apiUrl]);

    const handleLogout = () => {
        logout(); // Call logout function
        navigate('/', { replace: true }); // Redirect to login page
        window.location.reload(); // Reload to clear the history
    };

    const menus = [
        {
            icon: faHome,
            name: 'Dashboard',
            path: `/staff/${urlStaffId}/dashboard`,
            show: user && user.dashboard === 1,
        },
        {
            icon: faFileAlt,
            name: 'Course List',
            path: `/staff/${urlStaffId}/courselist`,
            show: user && user.course_list === 1,
        },
        {
            icon: faExchangeAlt,
            name: 'Report',
            path: `/staff/${urlStaffId}/report`,
            show: user && user.report === 1,
        },
        {
            icon: faKey,
            name: 'Upload Files',
            path: `/staff/${urlStaffId}/uploadfile`,
            show: user.upload_files === 1,
        },
        {
            icon: faSignOutAlt,
            name: 'Manage',
            path: `/staff/${urlStaffId}/manage`,
            show: true,
        },
        {
            icon: faGear ,
            name: 'Settings',
            path: `/staff/${urlStaffId}/settings`,
            show: user.logout === 1,
        },
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
