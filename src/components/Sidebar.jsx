import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0 navbar-dark">
      <div className="container-fluid d-flex flex-column p-0">
        <Link className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" to="/dashboard">
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">
            <span>WhatsFirst</span>
          </div>
        </Link>
        <hr className="sidebar-divider my-0" />
        <ul className="navbar-nav text-light" id="accordionSidebar">
          <li className="nav-item">
            <Link className={`nav-link ${isActive('/dashboard')}`} to="/dashboard">
              <i className="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${isActive('/call-log')}`} to="/call-log">
              <i className="fas fa-table"></i>
              <span>Call Log</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${isActive('/profile')}`} to="/profile">
              <i className="fas fa-user"></i>
              <span>Profile</span>
            </Link>
          </li>
        </ul>
        <div className="text-center d-none d-md-inline">
          <button className="btn rounded-circle border-0" id="sidebarToggle" type="button"></button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;