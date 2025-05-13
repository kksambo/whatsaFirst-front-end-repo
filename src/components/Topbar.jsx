import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faSearch,
    faBell,
    faEnvelope,
    faUser,
    faCogs,
    faList,
    faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

const Topbar = () => {
    return (
        <nav className="navbar navbar-expand bg-white shadow mb-4 topbar">
            <div className="container-fluid">
                <button className="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button">
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <form className="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                        <input className="bg-light form-control border-0 small" type="text" placeholder="Search for ..." />
                        <button className="btn btn-primary py-0" type="button">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </form>
                <ul className="navbar-nav flex-nowrap ms-auto">
                    <li className="nav-item dropdown d-sm-none no-arrow">
                        <button className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                        <div className="dropdown-menu dropdown-menu-end p-3 animated--grow-in" aria-labelledby="searchDropdown">
                            <form className="me-auto navbar-search w-100">
                                <div className="input-group">
                                    <input className="bg-light border-0 form-control small" type="text" placeholder="Search for ..." />
                                    <button className="btn btn-primary" type="button">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </li>
                    <li className="nav-item dropdown no-arrow mx-1">
                        <div className="nav-item dropdown no-arrow">
                            <button className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown">
                                <span className="badge bg-danger badge-counter">3+</span>
                                <FontAwesomeIcon icon={faBell} className="fa-fw" />
                            </button>
                            <div className="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
                                <h6 className="dropdown-header">alerts center</h6>
                                <div className="dropdown-item d-flex align-items-center">
                                    <div className="me-3">
                                        <div className="bg-primary icon-circle">
                                            <FontAwesomeIcon icon={faUser} className="text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="small text-gray-500">December 12, 2019</span>
                                        <p>A new monthly report is ready to download!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <div className="d-none d-sm-block topbar-divider"></div>
                    <li className="nav-item dropdown no-arrow">
                        <div className="nav-item dropdown no-arrow">
                            <button className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown">
                                <span className="d-none d-lg-inline me-2 text-gray-600 small">Valerie Luna</span>
                                <img className="border rounded-circle img-profile" src="assets/img/avatars/avatar1.jpeg" alt="profile" />
                            </button>
                            <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in">
                                <button className="dropdown-item">
                                    <FontAwesomeIcon icon={faUser} className="fa-sm fa-fw me-2 text-gray-400" />
                                    &nbsp;Profile
                                </button>
                                <button className="dropdown-item">
                                    <FontAwesomeIcon icon={faCogs} className="fa-sm fa-fw me-2 text-gray-400" />
                                    &nbsp;Settings
                                </button>
                                <button className="dropdown-item">
                                    <FontAwesomeIcon icon={faList} className="fa-sm fa-fw me-2 text-gray-400" />
                                    &nbsp;Activity log
                                </button>
                                <div className="dropdown-divider"></div>
                                <button className="dropdown-item">
                                    <FontAwesomeIcon icon={faSignOutAlt} className="fa-sm fa-fw me-2 text-gray-400" />
                                    &nbsp;Logout
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Topbar;