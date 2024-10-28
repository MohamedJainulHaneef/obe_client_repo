import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './studentmanage.css';

function StudentManage() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [studata, setStudata] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for the search input
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [newStudent, setNewStudent] = useState({ // State for new student details
    stu_name: '',
    reg_no: '',
    category: '',
    section: '',
  });

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/studetails`);
        setStudata(response.data);
      } catch (error) {
        console.log("Error Fetching data", error);
      }
    };

    fetchStudentDetails();
  }, [apiUrl]);

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter the student data based on search term
  const filteredStudata = studata.filter(student =>
    student.stu_name.toLowerCase().includes(searchTerm.toLowerCase()) || // Filter by name
    student.reg_no.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by registration number
  );

  // Function to handle button click to open modal
  const handleAddStudent = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setNewStudent({ stu_name: '', reg_no: '', category: '', section: '' }); // Reset the form
  };

  // Function to handle input changes in the modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  // Function to save the new student
  const handleSaveStudent = async () => {
    // Logic to save the new student data (you might want to send it to your server)
    try {
      await axios.post(`${apiUrl}/api/addstudent`, newStudent); // Example endpoint
      closeModal(); // Close modal after saving
      // Optionally, fetch updated student data here
    } catch (error) {
      console.log("Error saving student", error);
    }
  };

  return (
    <div className="student-manage">
      <h2>Student Details</h2>
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name or registration number..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="student-search-bar"
      />
      
      {/* Add Student Button */}
      <button className="add-student-button" onClick={handleAddStudent}>
        Add Student
      </button>

      {/* Student Table */}
      <table className="student-table">
        <thead>
          <tr>
            <th>S NO</th>
            <th>Registration No</th>
            <th>Name</th>
            <th>Category</th>
            <th>Section</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudata.map((student, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{student.reg_no}</td>
              <td>{student.stu_name}</td>
              <td>{student.category}</td>
              <td>{student.section}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding Student */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add Student</h3>
            <input
              type="text"
              name="stu_name"
              placeholder="Student Name"
              value={newStudent.stu_name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="reg_no"
              placeholder="Registration Number"
              value={newStudent.reg_no}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={newStudent.category}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="section"
              placeholder="Section"
              value={newStudent.section}
              onChange={handleInputChange}
            />
            <button onClick={handleSaveStudent}>Save</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentManage;
