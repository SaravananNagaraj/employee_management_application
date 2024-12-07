import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployees, updateEmployee } from "../Service";

const UpdateEmployee = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployee = async () => {
            const { data } = await getEmployees();
            const foundEmployee = data.find(emp => emp.id === parseInt(id));
            setEmployee(foundEmployee);
        };
        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateEmployee(id, employee);
        navigate('/employee-list');
    };

    const handleCancel = () => {
        navigate('/employee-list');
    };

    if (!employee) return <div>Loading...</div>;

    return (
        <div className="container">
            <h2 className="text-center my-4">Update Employee</h2>
            <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
                <div className="mb-3">
                    <input
                        name="empName"
                        className="form-control"
                        value={employee.empname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        name="emailId"
                        className="form-control"
                        value={employee.emailId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        name="mobileNo"
                        className="form-control"
                        value={employee.mobileNo || ""}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        name="department"
                        className="form-control"
                        value={employee.department}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        name="location"
                        className="form-control"
                        value={employee.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="d-flex justify-content-between mt-3">
                    <button type="submit" className="btn btn-primary">Update Employee</button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateEmployee;