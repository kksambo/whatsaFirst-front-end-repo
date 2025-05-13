import React, { useEffect, useState } from 'react';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    address: '',
    city: '',
    country: '',
  });

  useEffect(() => {
    const fetchAgentData = async () => {
      const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
      if (!userId) {
        console.error('User ID not found in local storage.');
        return;
      }

      try {
        const response = await fetch(`https://whatsafirst-backend-repo.onrender.com/agent/${userId}`);
        if (response.ok) {
          const agent = await response.json();
          console.log('Fetched agent data:', agent); // Log the fetched data
          setFormData({
            username: agent.email || '',
            email: agent.email || '',
            first_name: agent.name || '',
            last_name: agent.surname || '',
            address: agent.address || '',
            city: agent.city || '',
            country: agent.country || '',
          });
        } else {
          console.error('Failed to fetch agent data:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching agent data:', error);
      }
    };

    fetchAgentData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
      if (!userId) {
        alert('User ID not found. Please log in again.');
        return;
      }

      const response = await fetch(`https://whatsafirst-backend-repo.onrender.com/agent/updateAddress`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userId,
          address: formData.address,
          city: formData.city,
          country: formData.country,
        }),
      });

      if (response.ok) {
        const updatedAgent = await response.json();
        alert('Profile updated successfully!');
        console.log('Updated agent:', updatedAgent);
      } else {
        console.error('Failed to update profile:', await response.text());
        alert('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating the profile.');
    }
  };

  return (
    <>
      {/* Personal Details Section */}
      <div className="card shadow mb-3">
        <div className="card-header py-3">
          <p className="text-primary m-0 fw-bold">Personal Information</p>
        </div>
        <div className="card-body">
          <form>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" htmlFor="first_name"><strong>First Name</strong></label>
                  <input
                    className="form-control"
                    type="text"
                    id="first_name"
                    placeholder="First Name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" htmlFor="last_name"><strong>Last Name</strong></label>
                  <input
                    className="form-control"
                    type="text"
                    id="last_name"
                    placeholder="Last Name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email"><strong>Email Address</strong></label>
              <input
                className="form-control"
                type="email"
                id="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
              />
            </div>
          </form>
        </div>
      </div>

      {/* Contact Details Section */}
      <div className="card shadow mb-3">
        <div className="card-header py-3">
          <p className="text-primary m-0 fw-bold">Contact Settings</p>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="address"><strong>Address</strong></label>
              <input
                className="form-control"
                type="text"
                id="address"
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" htmlFor="city"><strong>City</strong></label>
                  <input
                    className="form-control"
                    type="text"
                    id="city"
                    placeholder="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" htmlFor="country"><strong>Country</strong></label>
                  <input
                    className="form-control"
                    type="text"
                    id="country"
                    placeholder="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary btn-sm" type="submit">Save&nbsp;Settings</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileForm;