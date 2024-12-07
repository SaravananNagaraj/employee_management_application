import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEmployee } from "../Service";
import backgroundImage from '../image/add_emp_background.jpg'

const AddEmployee = () => {
    const [empname, setEmpName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [department, setDepartment] = useState('');
    const [location, setLocation] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addEmployee({ empname, emailId, mobileNo, department, location });
        navigate('/employee-list');
    };

    const handleCancel = () => {
        navigate('/employee-list');
    };

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
            <div className="col-md-6">
                <h2 className="text-center my-4"
                    style={{ color: '#0b5394', fontSize: '55px', fontFamily: '"Times New Roman", Times, serif', backgroundColor: 'white' }} >Add Employee</h2>
                <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Employee Name"
                            value={empname}
                            onChange={(e) => setEmpName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email ID"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Mobile Number"
                            value={mobileNo}
                            onChange={(e) => setMobileNo(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                        <button type="submit" className="btn btn-success">Add Employee</button>
                        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployee;
