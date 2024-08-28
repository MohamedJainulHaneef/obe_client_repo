import React from 'react';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import Jmclogo from '../../assets/jmclogo.png';
import './lay.css';

function Layout() {
  const navigate = useNavigate();
  const { staffId } = useParams();

  let menus = [
    {
      icon: 'menu',
      name: 'Dashboard',
      path: `/staff/${staffId}/dashboard`,
    },
    {
      icon: 'add-circle',
      name: 'Mark',
      path: `/staff/${staffId}/mark`,
    },
    {
      icon: 'people',
      name: 'Status',
      path: '/student/status',
    },
    {
      icon: 'add-circle',
      name: 'GuideLines',
      path: '/student/guidelines',
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/', { replace: true });
    window.history.pushState(null, null, '/');
    window.addEventListener('popstate', function (event) {
      navigate('/', { replace: true });
    });
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="header">
          <img src={Jmclogo} alt="" className="logo" />
          <div className="college-info">
            <span className="college-name">JAMAL MOHAMED COLLEGE<br /></span>
            <span className="college-type">(Autonomous)<br /></span>
            <span className="college-location">TIRUCHIRAPPALLI - 620 020<br /></span>
          </div>
          <div className="staff-id">{staffId}</div>
        </div>
        {menus.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
          >
            <ion-icon name={item.icon}></ion-icon>
            <label className="menu-label">{item.name}</label>
          </NavLink>
        ))}
        <button onClick={handleLogout} className="logout-btn">
          <ion-icon name="log-out"></ion-icon>
          <label className="menu-label">Logout</label>
        </button>
      </div>
      <div className="content">
        <div className="content-inner">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
