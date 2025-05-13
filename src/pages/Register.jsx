import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    empNo: '',
    email: '',
    password: '',
    password_repeat: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.password_repeat) {
      alert('Passwords do not match!');
      return;
    }

    const agentData = {
      Name: formData.first_name,
      Surname: formData.last_name,
      Address: formData.address,
      EmpNo: formData.empNo,
      Password: formData.password,
      Email: formData.email,
    };

    try {
      const response = await fetch('https://whatsafirst-backend-repo.onrender.com/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agentData),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Account created successfully!');
        console.log(result);
      } else {
        alert('Failed to create account. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="bg-gradient-primary" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="card shadow-lg o-hidden border-0 my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-5 d-none d-lg-flex">
                <div
                  className="flex-grow-1 bg-register-image"
                  style={{ backgroundImage: 'url("/assets/img/dogs/image2.jpeg")' }}
                ></div>
              </div>
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h4 className="text-dark mb-4">Create an Account!</h4>
                  </div>
                  <form className="user" onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          className="form-control form-control-user"
                          type="text"
                          id="exampleFirstName"
                          placeholder="First Name"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-sm-6">
                        <input
                          className="form-control form-control-user"
                          type="text"
                          id="exampleLastName"
                          placeholder="Last Name"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <input
                        className="form-control form-control-user"
                        type="text"
                        id="exampleAddress"
                        placeholder="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        className="form-control form-control-user"
                        type="text"
                        id="exampleEmpNo"
                        placeholder="Employee Number"
                        name="empNo"
                        value={formData.empNo}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        className="form-control form-control-user"
                        type="email"
                        id="exampleInputEmail"
                        aria-describedby="emailHelp"
                        placeholder="Email Address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          className="form-control form-control-user"
                          type="password"
                          id="examplePasswordInput"
                          placeholder="Password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-sm-6">
                        <input
                          className="form-control form-control-user"
                          type="password"
                          id="exampleRepeatPasswordInput"
                          placeholder="Repeat Password"
                          name="password_repeat"
                          value={formData.password_repeat}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <button className="btn btn-primary d-block btn-user w-100" type="submit">
                      Register Account
                    </button>
                    <hr />
                    <a className="btn btn-primary d-block btn-google btn-user w-100 mb-2" role="button">
                      <i className="fab fa-google"></i>&nbsp; Register with Google
                    </a>
                    <a className="btn btn-primary d-block btn-facebook btn-user w-100" role="button">
                      <i className="fab fa-facebook-f"></i>&nbsp; Register with Facebook
                    </a>
                    <hr />
                  </form>
                  <div className="text-center">
                    <a className="small" href="forgot-password.html">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="text-center">
                    <Link className="small" to="/">
                      Already have an account? Login!
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;