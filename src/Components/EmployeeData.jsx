import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';


function EmployeeData() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ id: '', userName: '', email: '', status: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://emp-server-blgp.onrender.com/employees'); // Assuming your server is running on localhost:3000
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addEmployee = async () => {
    try {
      await axios.post('https://emp-server-blgp.onrender.com/employees', newEmployee);
      setNewEmployee({ id: '', userName: '', email: '', status: '' });
      fetchData(); // Refresh data after adding
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`https://emp-server-blgp.onrender.com/employees/${id}`);
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const updateEmployee = async (id, newData) => {
    try {
      await axios.put(`https://emp-server-blgp.onrender.com/employees/${id}`, newData);
      fetchData(); // Refresh data after update
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  return (
    <div>
      <h2 className='fw-bolder text-center my-2 text-warning'>Employee Data</h2>
      <Table striped bordered hover >
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.userName}</td>
              <td>{employee.email}</td>
              <td>{employee.status}</td>
              <td>
                <button  className="btn fw-bolder bg-danger p-2 me-2 my-2" onClick={() => deleteEmployee(employee.id)}>Delete</button>
                <button className="btn fw-bolder bg-success p-2 me-2 my-2" onClick={() => updateEmployee(employee.id, { status: 'new status' })}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
     <div>
        <h2 className='text-center fw-bolder text-warning' >Add Employee</h2>
        <div style={{width:'100%'}} className='d-flex justify-content-center align-items-center'>
        <div style={{width:'500px'}} className='bg-warning p-5 rounded text-center'>

       <input className='mb-2 fw-bolder' type="text" name="id" placeholder="ID" value={newEmployee.id} onChange={handleChange} />
          <br />
          <input className='mb-2 fw-bolder' type="text" name="userName" placeholder="User Name" value={newEmployee.userName} onChange={handleChange} />
          <br />
          <input className='mb-2 fw-bolder' type="text" name="email" placeholder="Email" value={newEmployee.email} onChange={handleChange} />
          <br />
          <input className='mb-2 fw-bolder' type="text" name="status" placeholder="Status" value={newEmployee.status} onChange={handleChange} />
          <br />
          <button className="btn fw-bolder btn btn-primary ms-2 my-2" onClick={addEmployee}>Add Employee</button>
        </div>
        </div>
     </div>
    </div>
  );
}

export default EmployeeData;


