// src/components/Navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand bg-white shadow mb-4 topbar">
      <div className="container-fluid">
        <button className="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button">
          <i className="fas fa-bars"></i>
        </button>
        <form className="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
          <div className="input-group">
            <input className="bg-light form-control border-0 small" type="text" placeholder="Search for ..." />
            <button className="btn btn-primary py-0" type="button">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>
        <ul className="navbar-nav flex-nowrap ms-auto">
          <li className="nav-item dropdown d-sm-none no-arrow">
            <a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">
              <i className="fas fa-search"></i>
            </a>
            <div className="dropdown-menu dropdown-menu-end p-3 animated--grow-in" aria-labelledby="searchDropdown">
              <form className="me-auto navbar-search w-100">
                <div className="input-group">
                  <input className="bg-light border-0 form-control small" type="text" placeholder="Search for ..." />
                  <button className="btn btn-primary" type="button">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>
            </div>
          </li>
          
          <NotificationDropdown />
          <MessagesDropdown />
          
          <div className="d-none d-sm-block topbar-divider"></div>
          
          <UserDropdown />
        </ul>
      </div>
    </nav>
  );
};

const NotificationDropdown = () => {
  return (
    <li className="nav-item dropdown no-arrow mx-1">
      <div className="nav-item dropdown no-arrow">
        <a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">
          <span className="badge bg-danger badge-counter">3+</span>
          <i className="fas fa-bell fa-fw"></i>
        </a>
        <div className="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
          <h6 className="dropdown-header">alerts center</h6>
          <a className="dropdown-item d-flex align-items-center" href="#">
            <div className="me-3">
              <div className="bg-primary icon-circle">
                <i className="fas fa-file-alt text-white"></i>
              </div>
            </div>
            <div>
              <span className="small text-gray-500">December 12, 2019</span>
              <p>A new monthly report is ready to download!</p>
            </div>
          </a>
          {/* Other notification items */}
        </div>
      </div>
    </li>
  );
};

const MessagesDropdown = () => {
  return (
    <li className="nav-item dropdown no-arrow mx-1">
      <div className="nav-item dropdown no-arrow">
        <a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">
          <span className="badge bg-danger badge-counter">7</span>
          <i className="fas fa-envelope fa-fw"></i>
        </a>
        <div className="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
          <h6 className="dropdown-header">alerts center</h6>
          {/* Message items */}
        </div>
      </div>
    </li>
  );
};

const UserDropdown = () => {
  return (
    <li className="nav-item dropdown no-arrow">
      <div className="nav-item dropdown no-arrow">
        <a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">
          <span className="d-none d-lg-inline me-2 text-gray-600 small">Valerie Luna</span>
          <img className="border rounded-circle img-profile" src="/assets/img/avatars/avatar1.jpeg" alt="User" />
        </a>
        <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in">
          <a className="dropdown-item" href="#">
            <i className="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Profile
          </a>
          <a className="dropdown-item" href="#">
            <i className="fas fa-cogs fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Settings
          </a>
          <a className="dropdown-item" href="#">
            <i className="fas fa-list fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Activity log
          </a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">
            <i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Logout
          </a>
        </div>
      </div>
    </li>
  );
};

export default Navbar;