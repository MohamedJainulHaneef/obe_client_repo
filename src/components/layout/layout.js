import  {useEffect , React} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFileAlt, faExchangeAlt, faKey, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import Jmclogo from '../../assets/jmclogo.png';
import './layout.css';

function Layout() 
{
    const { staffId } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:5000/api/scope/:${staffId}`)
            .then(response => {
                setUsers(response.data);

            })
            .catch(err => console.log(err));
    }, []);

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