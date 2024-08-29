import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faPlusCircle, faUsers, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import Jmclogo from '../../assets/jmclogo.png';
import './layout.css';

function Layout() 
{
    // const navigate = useNavigate();
    const { staffId } = useParams();

    let menus = [
        {
            icon: faTachometerAlt, // Updated icon to Font Awesome
            name: 'Dashboard',
            path: `/staff/${staffId}/dashboard`,
        },
        {
            icon: faPlusCircle, // Updated icon to Font Awesome
            name: 'Mark',
            path: `/staff/${staffId}/mark`,
        },
        {
            icon: faUsers, // Updated icon to Font Awesome
            name: 'Status',
            path: '/student/status',
        },
        {
            icon: faPlusCircle, // Updated icon to Font Awesome
            name: 'GuideLines',
            path: '/student/guidelines',
        },
        {
            icon: faSignOutAlt, // Updated icon to Font Awesome
            name: 'Logout',
            path: '/student/logout',
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
                {/* <div className="layout-top-div">
                    <div className="layout-top-element">
                        <div><p className="layout-staff_id"> <span class="staff">Staff Id :</span> {staffId}</p></div>
                    </div>
                </div> */}
                <div className="layout-content-inner">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Layout;