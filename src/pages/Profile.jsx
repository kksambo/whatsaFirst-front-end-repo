import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProfileForm from '../components/ProfileForm';

const Profile = () => {
  return (
    <div id="wrapper">
      <Sidebar />
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">
          <Navbar />
          <div className="container-fluid">
            <h3 className="text-dark mb-4">Profile</h3>
            <div className="row mb-3">
              <div className="col-lg-4">
                <div className="card mb-3">
                  <div className="card-body text-center shadow">
                    <img className="rounded-circle mb-3 mt-4" src="/assets/img/dogs/image2.jpeg" width="160" height="160" alt="Profile" />
                    <div className="mb-3">
                      <button className="btn btn-primary btn-sm" type="button">Change Photo</button>
                    </div>
                  </div>
                </div>
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="text-primary fw-bold m-0">Projects</h6>
                  </div>
                  <div className="card-body">
                    <h4 className="small fw-bold">Server migration<span className="float-end">20%</span></h4>
                    <div className="progress progress-sm mb-3">
                      <div className="progress-bar bg-danger" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{ width: '20%' }}>
                        <span className="visually-hidden">20%</span>
                      </div>
                    </div>
                    {/* Other progress bars */}
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <ProfileForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;