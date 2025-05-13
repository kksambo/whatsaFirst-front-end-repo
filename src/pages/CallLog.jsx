import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import CallLogTable from '../components/CallLogTable';

const CallLog = () => {
  return (
    <div id="wrapper">
      <Sidebar />
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">
          <Navbar />
          <div className="container-fluid">
            <h3 className="text-dark mb-4">Clients</h3>
            <div className="card shadow">
              <div className="card-header py-3">
                <p className="text-primary m-0 fw-bold">Call Stats</p>
              </div>
              <div className="card-body">
                <CallLogTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallLog;