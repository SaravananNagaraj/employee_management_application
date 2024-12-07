import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteEmployee, getEmployees } from "../Service";
import backgroundImage from '../image/emp_list.jpg'

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            const { data } = await getEmployees();
            setEmployees(data);
        };
        fetchEmployees();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/login'); 
    };

    const handleDelete = async (id) => {
        await deleteEmployee(id);
        setEmployees(employees.filter(emp => emp.id !== id));
    };

    // const handleDelete = async (id) => {
    //     try {
    //         await deleteEmployee(`http://localhost:8080/api/employees/${id}`);
    //         setEmployees(employees.filter(emp => emp.id !== id));
    //     } catch (error) {
    //         console.error("Error during delete:", error.response ? error.response.data : error.message);
    //         alert("Employee not found or deletion failed.");
    //     }
    // };

    return (
        <div style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh'
        }}>
            <div className="container">
                <div className="d-flex justify-content-center align-items-center my-4">
                    <h2 className="text-center" style={{ fontSize: '50px' }}>Employee List</h2>
                </div>
                <div className="d-flex justify-content-between mb-3">
                    <div>
                        <Link to="/add"
                            className="btn btn-primary btn-lg"
                            style={{ textDecoration: 'none', width: '200px', height: '45px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            Add Employee
                        </Link>
                    </div>
                    <div>
                        <button
                            className="btn btn-danger btn-lg"
                            onClick={handleLogout}
                            style={{ backgroundColor: '#dc3545', color: 'white', width: '200px', height: '45px' }}>
                            Logout
                        </button>
                    </div>
                </div>

                {/* Employee Data Section */}
                <div className="employee-data">
                    <table className="custom-table table-striped" >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email Id</th>
                                <th>Mobile Number</th>
                                <th>Department</th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(employee => (
                                <tr key={employee.id}>
                                    <td className="table-center">{employee.id}</td>
                                    <td className="table-left">{employee.empname}</td>
                                    <td className="table-left">{employee.emailId}</td>
                                    <td className="table-left">{employee.mobileNo}</td>
                                    <td className="table-left">{employee.department}</td>
                                    <td className="table-left">{employee.location}</td>
                                    <td>
                                        <div className="d-flex gap-2"> {/* Use gap for spacing between buttons */}
                                            <Link
                                                to={`/update/${employee.id}`}
                                                className="btn btn-outline-warning link-special"
                                                style={{
                                                    textDecoration: 'none',
                                                    width: '100px',
                                                    height: '45px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                Update
                                            </Link>

                                            <button
                                                onClick={() => handleDelete(employee.id)}
                                                className="btn btn-outline-danger button-trace"
                                                style={{
                                                    width: '100px',
                                                    height: '45px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    position: 'relative'
                                                }}>
                                                Delete
                                            </button>
                                        </div>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;