import { useEffect, React, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { faHome, faFileAlt, faExchangeAlt, faKey, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import Jmclogo from '../../assets/jmclogo.png';
import './layout.css';

function Layout() {
    const apiUrl = process.env.REACT_APP_API_URL;

    const { staffId } = useParams();
    const [user, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/scope/${staffId}`);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [staffId, apiUrl]);

    const menus = [
        {
            icon: faHome,
            name: 'Dashboard',
            path: `/staff/${staffId}/dashboard`,
            show: user.dashboard === 1,
        },
        {
            icon: faFileAlt,
            name: 'Course List',
            path: `/staff/${staffId}/courselist`,
            show: user.course_list === 1,
        },
        {
            icon: faExchangeAlt,
            name: 'Report',
            path: `/staff/${staffId}/report`,
            show: user.report === 1,
        },
        {
            icon: faKey,
            name: 'Upload Files',
            path: `/staff/${staffId}/uploadfile`,
            show: user.upload_files === 1,
        },
        {
            icon: faSignOutAlt,
            name: 'Logout',
            path: '/',
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