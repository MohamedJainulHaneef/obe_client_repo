import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFileAlt, faExchangeAlt, faKey, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import Jmclogo from '../../assets/jmclogo.png';
import './layout.css';
// import { useNavigate } from 'react-router-dom';

function Layout() 
{
    // const navigate = useNavigate();
    const { staffId } = useParams();

    let menus = [
        {
            icon: faHome, 
            name: 'Dashboard',
            path: `/staff/${staffId}/dashboard`,
        },
        {
            icon: faFileAlt, 
            name: 'Mark',
            path: `/staff/${staffId}/mark`,
        },
        {
            icon: faExchangeAlt, 
            name: 'Status',
            path: '/student/status',
        },
        {
            icon: faKey, 
            name: 'GuideLines',
            path: '/student/guidelines',
        },
        {
            icon: faSignOutAlt,
            name: 'Logout',
            path: '/',
        },
    ];

    // const handleLogout = () => {
    //     localStorage.removeItem('authToken');
    //     navigate('/', { replace: true });
    //     window.history.pushState(null, null, '/');
    //     window.addEventListener('popstate', function (event) {
    //         navigate('/', { replace: true });
    //     });
    // };

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
                {menus.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) => `layout-menu-item ${isActive ? 'layout-active' : ''}`}
                    >
                        <FontAwesomeIcon icon={item.icon} className="lay-fa-fa-icons"/>
                        <label className="layout-menu-label">{item.name}</label>
                    </NavLink>
                ))}
                {/* <button onClick={handleLogout} className="layout-logout-btn">
                    <ion-icon name="log-out"></ion-icon>
                    <label className="layout-menu-label">Logout</label>
                </button> */}
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