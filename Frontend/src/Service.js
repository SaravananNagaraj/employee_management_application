import axios from "axios";

const API_URL = 'http://localhost:8080/api/employees';

// Fetch all employees
export const getEmployees = () => 
    axios.get(`${API_URL}?timestamp=${new Date().getTime()}`);

// Fetch employee by ID
export const getEmployeeById = (id) => 
    axios.get(`${API_URL}/${id}`);

// Fetch employee by mobile number or email
export const getEmployeeByMobileOrEmail = async (mobileNo, emailId) => {
    try {
        const response = await axios.get(`${API_URL}/find`, { params: { mobileNo, emailId } });
        return response.data.length > 0 ? response.data[0] : null;  // Return the first matching employee
    } catch (error) {
        return null; // Return null if no employee exists
    }
};

// Add a new employee (with duplicate check)
export const addEmployee = async (employee) => {
    try {
        // Check if the employee already exists
        const existingEmployee = await getEmployeeByMobileOrEmail(employee.mobileNo, employee.emailId);
        if (existingEmployee) {
            throw new Error("Employee with this Mobile No or Email already exists.");
        }
        return await axios.post(API_URL, employee, { headers: { "Cache-Control": "no-cache" } });
    } catch (error) {
        throw error;
    }
};

// Update employee details
export const updateEmployee = (id, employee) => 
    axios.put(`${API_URL}/${id}`, employee, { headers: { "Cache-Control": "no-cache" } });

// Delete an employee
export const deleteEmployee = (id) => 
    axios.delete(`${API_URL}/${id}`, { headers: { "Cache-Control": "no-cache" } });
