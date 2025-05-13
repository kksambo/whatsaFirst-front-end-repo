import React from 'react';

const CallLogTable = () => {
  const callData = [
    { id: 1, name: 'Airi Satou', date: '2008/11/28', duration: '40 min', avatar: 'avatar1.jpeg' },
    { id: 2, name: 'Angelica Ramos', date: '2009/10/09', duration: '30 min', avatar: 'avatar2.jpeg' },
    { id: 3, name: 'Ashton Cox', date: '2009/01/12', duration: '20 min', avatar: 'avatar3.jpeg' },
    { id: 4, name: 'Bradley Greer', date: '2012/10/13', duration: '10 min', avatar: 'avatar4.jpeg' },
    { id: 5, name: 'Brenden Wagner', date: '2011/06/07', duration: '35 min', avatar: 'avatar5.jpeg' },
  ];

  return (
    <>
      <div className="row">
        <div className="col-md-6 text-nowrap">
          <div id="dataTable_length" className="dataTables_length" aria-controls="dataTable">
            <label className="form-label">
              Show&nbsp;
              <select className="d-inline-block form-select form-select-sm">
                <option value="10" selected="">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>&nbsp;
            </label>
          </div>
        </div>
        <div className="col-md-6">
          <div className="text-md-end dataTables_filter" id="dataTable_filter">
            <label className="form-label">
              <input type="search" className="form-control form-control-sm" aria-controls="dataTable" placeholder="Search" />
            </label>
          </div>
        </div>
      </div>
      <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
        <table className="table my-0" id="dataTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Start date</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {callData.map((call) => (
              <tr key={call.id}>
                <td>
                  <img 
                    className="rounded-circle me-2" 
                    width="30" 
                    height="30" 
                    src={`/assets/img/avatars/${call.avatar}`} 
                    alt={call.name}
                  />
                  {call.name}
                </td>
                <td>{call.date}</td>
                <td>{call.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="row">
        <div className="col-md-6 align-self-center">
          <p id="dataTable_info" className="dataTables_info" role="status" aria-live="polite">
            Showing 1 to 5 of 5
          </p>
        </div>
        <div className="col-md-6">
          <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
            <ul className="pagination">
              <li className="page-item disabled">
                <a className="page-link" aria-label="Previous" href="#">
                  <span aria-hidden="true">«</span>
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">1</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">2</a>
              </li>
              <li className="page-item">
                <a className="page-link" aria-label="Next" href="#">
                  <span aria-hidden="true">»</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default CallLogTable;