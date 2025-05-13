// src/components/DashboardCards.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const DashboardCards = () => {
  return (
    <div className="row">
      <div className="col-md-6 col-xl-3 mb-4">
        <div className="card shadow border-left-primary py-2">
          <div className="card-body">
            <div className="row g-0 align-items-center">
              <div className="col me-2">
                <div className="text-dark fw-bold h5 mb-0">
                  <span>DIAL WITH WHATSAPP</span>
                </div>
              </div>
              <div className="col-auto">
                <i className="icon ion-social-whatsapp-outline fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-xl-3 mb-4">
        <div className="card shadow border-left-success py-2">
          <div className="card-body">
            <div className="row g-0 align-items-center">
              <div className="col me-2">
                <div className="text-dark fw-bold h5 mb-0">
                  <span>NORMAL DIAL</span>
                </div>
              </div>
              <div className="col-auto">
                <i className="icon ion-android-call fa-2x text-gray-300" style={{ fontSize: '27px' }}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-xl-3 mb-4">
        <div className="card shadow border-left-info py-2">
          <div className="card-body">
            <div className="row g-0 align-items-center">
              <div className="col me-2">
                <div className="row g-0 align-items-center">
                  <div className="col-auto">
                    <div className="text-dark fw-bold h5 mb-0 me-3">
                      <span>ADD A CLIENT</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-auto">
                <i className="fa fa-user-plus fa-2x text-gray-300" style={{ fontSize: '30px' }}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-xl-3 mb-4">
        <div className="card shadow border-left-warning py-2">
          <div className="card-body">
            <div className="row g-0 align-items-center">
              <div className="col me-2">
                <div className="text-dark fw-bold h5 mb-0">
                  <span>EDIT CLIENT DETAILS</span>
                </div>
              </div>
              <div className="col-auto">
                <i className="fas fa-user-edit fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;