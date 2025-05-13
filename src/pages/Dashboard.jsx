import React, { useState, useEffect } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import CallRecordingModal from '../components/CallRecordingModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDownload,
  faUserPlus,
  faUserEdit,
  faCircle,
  faSms,
  faAngleUp,
  faPhone,
  faSearch,
  faBell
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const Topbar = () => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      {/* Sidebar Toggle (Topbar) */}
      <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
        <i className="fa fa-bars"></i>
      </button>

      {/* Search Bar */}
      <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div className="input-group">
          <input
            type="text"
            className="form-control bg-light border-0 small"
            placeholder="Search for..."
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </form>

      {/* Topbar Navbar */}
      <ul className="navbar-nav ml-auto">
        {/* Alerts */}
        <li className="nav-item dropdown no-arrow mx-1">
          <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <FontAwesomeIcon icon={faBell} className="fa-fw" />
            {/* Counter - Alerts */}
            <span className="badge badge-danger badge-counter">3+</span>
          </a>
          {/* Dropdown - Alerts */}
          <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
            <h6 className="dropdown-header">Alerts Center</h6>
            <a className="dropdown-item d-flex align-items-center" href="#">
              <div className="mr-3">
                <div className="icon-circle bg-primary">
                  <i className="text-white">!</i>
                </div>
              </div>
              <div>
                <div className="small text-gray-500">December 12, 2023</div>
                <span className="font-weight-bold">A new monthly report is ready to download!</span>
              </div>
            </a>
          </div>
        </li>

        {/* User Information */}
        <li className="nav-item dropdown no-arrow">
          <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">John Doe</span>
            <img className="img-profile rounded-circle" src="https://via.placeholder.com/60" alt="User" />
          </a>
          {/* Dropdown - User Information */}
          <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
            <a className="dropdown-item" href="#">
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
              Profile
            </a>
            <a className="dropdown-item" href="#">
              <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
              Settings
            </a>
            <a className="dropdown-item" href="#">
              <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
              Activity Log
            </a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
};

const Dashboard = () => {
  const [showRecordingModal, setShowRecordingModal] = useState(false);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showDialModal, setShowDialModal] = useState(false);
  const [showWhatsAppDialModal, setShowWhatsAppDialModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [clientData, setClientData] = useState({ Name: '', PhoneNumber: '' });
  const [clients, setClients] = useState([]);
  const [callSummary, setCallSummary] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showEditClientModal, setShowEditClientModal] = useState(false);

  const backendUrl = 'https://whatsafirst-backend-repo.onrender.com';

  // Fetch clients from the backend
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`${backendUrl}/clients`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched Clients:', data);
          setClients(data);
        } else {
          console.error('Failed to fetch clients');
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  // Fetch call summary data from the backend
  const fetchCallSummary = async () => {
    try {
      const response = await fetch(`${backendUrl}/callSummary`);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched Call Summary:', data);
        setCallSummary(data[0]);
      } else {
        console.error('Failed to fetch call summary');
      }
    } catch (error) {
      console.error('Error fetching call summary:', error);
    }
  };

  useEffect(() => {
    fetchCallSummary();
  }, []);

  // Handle input changes in the Add Client form
  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [name]: value });
  };

  // Handle form submission for adding a client
  const handleClientSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${backendUrl}/client`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
      });

      if (response.ok) {
        const newClient = await response.json();
        setClients([...clients, newClient]);
        alert(`Client ${newClient.Name} added successfully!`);
        setShowAddClientModal(false);
        setClientData({ Name: '', PhoneNumber: '' });
      } else {
        alert('Failed to add client. Please try again.');
      }
    } catch (error) {
      console.error('Error adding client:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // Handle form submission for normal calls
  const handleNormalCallSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${backendUrl}/api/call`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ PhoneNumber: phoneNumber, Message: message }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Normal call initiated successfully! Call SID: ${result.call_sid}`);

        // Refetch call summary to update graphs
        fetchCallSummary();
      } else {
        const error = await response.json();
        alert(`Failed to initiate normal call: ${error.detail}`);
      }
    } catch (error) {
      console.error('Error initiating normal call:', error);
      alert('An error occurred while initiating the call. Please try again.');
    }

    setShowDialModal(false);
    setPhoneNumber('');
    setMessage('');
  };

  // Handle form submission for WhatsApp calls
  const handleWhatsAppCallSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${backendUrl}/api/whatsappCall`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ PhoneNumber: phoneNumber, Message: message }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`WhatsApp call initiated successfully! Call SID: ${result.call_sid}`);

        // Refetch call summary to update graphs
        fetchCallSummary();
      } else {
        const error = await response.json();
        alert(`Failed to initiate WhatsApp call: ${error.detail}`);
      }
    } catch (error) {
      console.error('Error initiating WhatsApp call:', error);
      alert('An error occurred while initiating the call. Please try again.');
    }

    setShowWhatsAppDialModal(false);
    setPhoneNumber('');
    setMessage('');
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResults([]);
      setShowSearchModal(false);
      return;
    }

    // Filter clients based on the search query
    const results = clients.filter((client) =>
      client.name.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);
    setShowSearchModal(results.length > 0);
  };

  // Handle opening the edit client modal
  const handleEditClient = (client) => {
    setSelectedClient(client);
    setShowEditClientModal(true);
  };

  // Handle changes in the edit client form
  const handleEditClientChange = (e) => {
    const { name, value } = e.target;
    setSelectedClient({ ...selectedClient, [name]: value });
  };

  // Handle submitting the edit client form
  const handleEditClientSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${backendUrl}/client/${selectedClient.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedClient),
      });

      if (response.ok) {
        const updatedClient = await response.json();
        setClients(clients.map((client) => (client.id === updatedClient.id ? updatedClient : client)));
        alert('Client details updated successfully!');
        setShowEditClientModal(false);
      } else {
        alert('Failed to update client details. Please try again.');
      }
    } catch (error) {
      console.error('Error updating client details:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // Line chart data (dynamic based on call summary)
  const lineChartData = callSummary ? {
    labels: ["Unanswered Calls", "WhatsApp Calls", "Normal Calls", "Calls Made Today"],
    datasets: [{
      label: "Call Summary",
      fill: true,
      data: [
        callSummary.unansweredCalls,
        callSummary.whatsAppCalls,
        callSummary.normalCalls,
        callSummary.callMadeToday
      ],
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "rgba(78, 115, 223, 1)",
      tension: 0.4
    }]
  } : null;

  // Doughnut chart data (dynamic based on call summary)
  const doughnutChartData = callSummary ? {
    labels: ["WhatsApp Calls", "Normal Calls", "Unanswered Calls"],
    datasets: [{
      data: [
        callSummary.whatsAppCalls,
        callSummary.normalCalls,
        callSummary.unansweredCalls
      ],
      backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc"],
      borderColor: ["#ffffff", "#ffffff", "#ffffff"]
    }]
  } : null;

  return (
    <div id="wrapper">
      <Sidebar />
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">
          <Topbar />
          <div className="container-fluid">
            <div className="d-sm-flex justify-content-between align-items-center mb-4">
              <h3 className="text-dark mb-0">Dashboard</h3>
              <div className="input-group" style={{ maxWidth: '300px' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button className="btn btn-primary" type="button">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
              <button 
                className="btn btn-primary btn-sm d-none d-sm-inline-block" 
                onClick={() => setShowRecordingModal(true)}
              >
                <FontAwesomeIcon icon={faDownload} className="fa-sm text-white-50 me-1" />
                Record Call
              </button>
            </div>
            
            <CallRecordingModal 
              show={showRecordingModal} 
              handleClose={() => setShowRecordingModal(false)} 
            />

            {/* Search Results Modal */}
            {showSearchModal && (
              <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Search Results</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowSearchModal(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      {searchResults.length > 0 ? (
                        <ul className="list-group">
                          {searchResults.map((client) => (
                            <li key={client.id} className="list-group-item">
                              <strong>{client.name}</strong> - {client.phoneNumber || 'No phone number provided'}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No matching contacts found.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="row">
              {/* Dial with WhatsApp */}
              <div
                className="col-md-6 col-xl-3 mb-4"
                onClick={() => setShowWhatsAppDialModal(true)} // Open WhatsApp dial modal
                style={{ cursor: 'pointer' }}
              >
                <div className="card shadow border-left-primary py-2">
                  <div className="card-body">
                    <div className="row g-0 align-items-center">
                      <div className="col me-2">
                        <div className="text-dark fw-bold h5 mb-0">
                          <span>DIAL WITH WHATSAPP</span>
                        </div>
                      </div>
                      <div className="col-auto">
                        <FontAwesomeIcon
                          icon={faWhatsapp}
                          className="fa-2x text-gray-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Normal Dial */}
              <div
                className="col-md-6 col-xl-3 mb-4"
                onClick={() => setShowDialModal(true)} // Open normal dial modal
                style={{ cursor: 'pointer' }}
              >
                <div className="card shadow border-left-success py-2">
                  <div className="card-body">
                    <div className="row g-0 align-items-center">
                      <div className="col me-2">
                        <div className="text-dark fw-bold h5 mb-0">
                          <span>NORMAL DIAL</span>
                        </div>
                      </div>
                      <div className="col-auto">
                        <FontAwesomeIcon
                          icon={faPhone}
                          className="fa-2x text-gray-300"
                          style={{ fontSize: '27px' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-3 mb-4">
                <div 
                  className="card shadow border-left-info py-2 clickable" 
                  onClick={() => setShowAddClientModal(true)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card-body">
                    <div className="row g-0 align-items-center">
                      <div className="col me-2">
                        <div className="text-dark fw-bold h5 mb-0">
                          <span>ADD A CLIENT</span>
                        </div>
                      </div>
                      <div className="col-auto">
                        <FontAwesomeIcon icon={faUserPlus} className="fa-2x text-gray-300" style={{ fontSize: '30px' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div 
                className="col-md-6 col-xl-3 mb-4"
                onClick={() => setShowEditClientModal(true)} // Open the modal when clicked
                style={{ cursor: 'pointer' }} // Add pointer cursor to indicate it's clickable
              >
                <div className="card shadow border-left-warning py-2">
                  <div className="card-body">
                    <div className="row g-0 align-items-center">
                      <div className="col me-2">
                        <div className="text-dark fw-bold h5 mb-0">
                          <span>EDIT CLIENT DETAILS</span>
                        </div>
                      </div>
                      <div className="col-auto">
                        <FontAwesomeIcon icon={faUserEdit} className="fa-2x text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Add Client Modal */}
            {showAddClientModal && (
              <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Add Client</h5>
                      <button type="button" className="btn-close" onClick={() => setShowAddClientModal(false)}></button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleClientSubmit}>
                        <div className="mb-3">
                          <label htmlFor="clientName" className="form-label">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="clientName"
                            name="Name"
                            value={clientData.Name}
                            onChange={handleClientChange}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="clientPhone" className="form-label">Phone Number</label>
                          <input
                            type="text"
                            className="form-control"
                            id="clientPhone"
                            name="PhoneNumber"
                            value={clientData.PhoneNumber}
                            onChange={handleClientChange}
                            required
                          />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* WhatsApp Dial Modal */}
            {showWhatsAppDialModal && (
              <div
                className="modal"
                style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Dial with WhatsApp</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowWhatsAppDialModal(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleWhatsAppCallSubmit}>
                        <div className="mb-3">
                          <label htmlFor="whatsappPhoneNumber" className="form-label">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="whatsappPhoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="whatsappMessage" className="form-label">
                            Message
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="whatsappMessage"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                          />
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Call
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Normal Dial Modal */}
            {showDialModal && (
              <div
                className="modal"
                style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Dial a Number</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowDialModal(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleNormalCallSubmit}>
                        <div className="mb-3">
                          <label htmlFor="dialPhoneNumber" className="form-label">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="dialPhoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="dialMessage" className="form-label">
                            Message
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="dialMessage"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                          />
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Call
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="row">
              <div className="col-lg-7 col-xl-8">
                <div className="card shadow mb-4">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h6 className="text-primary fw-bold m-0">Call Service Overview</h6>
                  </div>
                  <div className="card-body">
                    {lineChartData ? (
                      <div className="chart-area">
                        <Line 
                          data={lineChartData} 
                          options={{
                            maintainAspectRatio: false,
                            plugins: {
                              legend: {
                                display: true,
                                position: 'bottom'
                              }
                            },
                            scales: {
                              x: {
                                grid: {
                                  color: "rgb(234, 236, 244)",
                                  drawBorder: false,
                                  drawTicks: false,
                                  borderDash: [2],
                                  zeroLineBorderDash: [2],
                                  drawOnChartArea: false
                                },
                                ticks: {
                                  color: "#858796",
                                  padding: 20
                                }
                              },
                              y: {
                                grid: {
                                  color: "rgb(234, 236, 244)",
                                  drawBorder: false,
                                  drawTicks: false,
                                  borderDash: [2],
                                  zeroLineBorderDash: [2]
                                },
                                ticks: {
                                  color: "#858796",
                                  padding: 20
                                }
                              }
                            }
                          }} 
                        />
                      </div>
                    ) : (
                      <p>Loading call summary...</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-xl-4">
                <div className="card shadow mb-4">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h6 className="text-primary fw-bold m-0">Call Summary</h6>
                  </div>
                  <div className="card-body">
                    {doughnutChartData ? (
                      <div className="chart-area">
                        <Doughnut 
                          data={doughnutChartData} 
                          options={{
                            maintainAspectRatio: false,
                            plugins: {
                              legend: {
                                display: true,
                                position: 'bottom'
                              }
                            }
                          }} 
                        />
                      </div>
                    ) : (
                      <p>Loading call summary...</p>
                    )}
                    {callSummary && (
                      <div className="text-center small mt-4">
                        <span className="me-2">
                          <FontAwesomeIcon icon={faCircle} className="text-primary" />
                          &nbsp;WhatsApp Calls: {callSummary.whatsAppCalls}
                        </span>
                        <span className="me-2">
                          <FontAwesomeIcon icon={faCircle} className="text-success" />
                          &nbsp;Normal Calls: {callSummary.normalCalls}
                        </span>
                        <span className="me-2">
                          <FontAwesomeIcon icon={faCircle} className="text-info" />
                          &nbsp;Unanswered Calls: {callSummary.unansweredCalls}
                        </span>
                        <span className="me-2">
                          <FontAwesomeIcon icon={faCircle} className="text-warning" />
                          &nbsp;Calls Made Today: {callSummary.callMadeToday}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="text-primary fw-bold m-0">Calls Summary</h6>
                  </div>
                  <div className="card-body">
                    {callSummary ? (
                      <>
                        <h4 className="small fw-bold">Unanswered Calls<span className="float-end">{callSummary.unansweredCalls}</span></h4>
                        <div className="progress mb-4">
                          <div className="progress-bar bg-danger" aria-valuenow={callSummary.unansweredCalls} aria-valuemin="0" aria-valuemax="100" style={{ width: `${callSummary.unansweredCalls}%` }}>
                            <span className="visually-hidden">{callSummary.unansweredCalls}%</span>
                          </div>
                        </div>
                        <h4 className="small fw-bold">WhatsApp Calls<span className="float-end">{callSummary.whatsAppCalls}</span></h4>
                        <div className="progress mb-4">
                          <div className="progress-bar bg-primary" aria-valuenow={callSummary.whatsAppCalls} aria-valuemin="0" aria-valuemax="100" style={{ width: `${callSummary.whatsAppCalls}%` }}>
                            <span className="visually-hidden">{callSummary.whatsAppCalls}%</span>
                          </div>
                        </div>
                        <h4 className="small fw-bold">Normal Calls<span className="float-end">{callSummary.normalCalls}</span></h4>
                        <div className="progress mb-4">
                          <div className="progress-bar bg-info" aria-valuenow={callSummary.normalCalls} aria-valuemin="0" aria-valuemax="100" style={{ width: `${callSummary.normalCalls}%` }}>
                            <span className="visually-hidden">{callSummary.normalCalls}%</span>
                          </div>
                        </div>
                        <h4 className="small fw-bold">Calls Made Today<span className="float-end">{callSummary.callMadeToday}</span></h4>
                        <div className="progress mb-4">
                          <div className="progress-bar bg-success" aria-valuenow={callSummary.callMadeToday} aria-valuemin="0" aria-valuemax="100" style={{ width: `${callSummary.callMadeToday}%` }}>
                            <span className="visually-hidden">{callSummary.callMadeToday}%</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <p>Loading call summary...</p>
                    )}
                  </div>
                </div>
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="text-primary fw-bold m-0">Contact List</h6>
                  </div>
                  <ul className="list-group list-group-flush">
                    {clients.map((client) => (
                      <li key={client.id} className="list-group-item">
                        <div className="row g-0 align-items-center">
                          <div className="col-md-9 me-2">
                            <h6 className="mb-0"><strong>{client.name}</strong></h6>
                            <span className="text-xs">
                              {client.phoneNumber ? client.phoneNumber : "No phone number provided"}
                            </span>
                          </div>
                          <div className="col-md-1">
                            <FontAwesomeIcon icon={faWhatsapp} className="fa-2x text-gray-300" />
                          </div>
                          <div className="col-md-1">
                            <FontAwesomeIcon icon={faSms} className="fa-2x text-gray-300" />
                          </div>
                          <div className="col-md-1 text-end">
                            <button
                              className="btn btn-sm btn-warning"
                              onClick={() => handleEditClient(client)}
                            >
                              <FontAwesomeIcon icon={faUserEdit} /> Edit
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col">
                <div className="row">
                  <div className="col-lg-6 mb-4">
                    <div className="card text-white bg-success shadow">
                      <div className="card-body">
                        <p className="m-0">Successful Calls</p>
                        <p className="text-white-50 small m-0">50</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <div className="card text-white bg-info shadow">
                      <div className="card-body">
                        <p className="m-0">Information on our clients</p>
                        <p className="text-white-50 small m-0">#36b9cc</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <div className="card text-white bg-warning shadow">
                      <div className="card-body">
                        <p className="m-0">Warning</p>
                        <p className="text-white-50 small m-0">#f6c23e</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <div className="card text-white bg-danger shadow">
                      <div className="card-body">
                        <p className="m-0">Danger</p>
                        <p className="text-white-50 small m-0">#e74a3b</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Client Modal */}
            {showEditClientModal && selectedClient && (
              <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Edit Client Details</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowEditClientModal(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleEditClientSubmit}>
                        <div className="mb-3">
                          <label htmlFor="editClientName" className="form-label">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="editClientName"
                            name="name"
                            value={selectedClient.name}
                            onChange={handleEditClientChange}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="editClientPhone" className="form-label">Phone Number</label>
                          <input
                            type="text"
                            className="form-control"
                            id="editClientPhone"
                            name="phoneNumber"
                            value={selectedClient.phoneNumber}
                            onChange={handleEditClientChange}
                            required
                          />
                        </div>
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
      <a className="border rounded d-inline scroll-to-top">
        <FontAwesomeIcon icon={faAngleUp} />
      </a>
    </div>
  );
};

export default Dashboard;