import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './studentmanage.css';

function StudentManage() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [studata, setStudata] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Separate state for Add modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Separate state for Edit modal
  const [newStudent, setNewStudent] = useState({ stu_name: '', reg_no: '', category: '', section: '' });
  const [editStudent, setEditStudent] = useState(null);

  // Fetch all students on component mount
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/studetails`);
        setStudata(response.data);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    fetchStudentDetails();
  }, [apiUrl]);

  // Filter the student data based on search term
const filteredStudata = studata.filter((student) =>
  (student.stu_name?.toLowerCase() || "").includes(searchTerm.toLowerCase() || "") ||
  (student.reg_no?.toLowerCase() || "").includes(searchTerm.toLowerCase() || "")
);


  // Add Student Modal Handlers
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewStudent({ stu_name: '', reg_no: '', category: '', section: '' });
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveStudent = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/addstudent`, newStudent);
      setStudata((prev) => [...prev, response.data.student]); // Update local state
      closeAddModal();
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  // Edit Student Modal Handlers
  const openEditModal = (student) => {
    setEditStudent(student);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditStudent(null);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEditStudent = async () => {
    try {
      const response = await axios.put(`${apiUrl}/api/editstudent`, editStudent);
      setStudata((prev) =>
        prev.map((student) =>
          student.reg_no === editStudent.reg_no ? { ...response.data.student } : student
        )
      );
      closeEditModal();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  // Delete Student Handler
  const handleDelete = async (reg_no) => {
    try {
      await axios.delete(`${apiUrl}/api/deletestudent/${reg_no}`);
      setStudata((prev) => prev.filter((student) => student.reg_no !== reg_no));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="student-manage">
      <h2 className="student-topheading">Student Details</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name or registration number..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="student-search-bar"
      />

      {/* Add Student Button */}
      <button className="add-student-button" onClick={openAddModal}>
        Add Student
      </button>

      {/* Student Table */}
      <table className="student-table">
        <thead>
          <tr>
            <th className='student-header'>S No</th>
            <th className='student-header'>Registration No</th>
            <th className='student-header'>Name</th>
            <th className='student-header'>Category</th>
            <th className='student-header'>Section</th>
            <th className='student-header'>Edit</th>
            <th className='student-header'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudata.map((student, index) => (
            <tr key={student.reg_no}>
              <td className='student-data'>{index + 1}</td>
              <td className='student-data'>{student.reg_no}</td>
              <td className='student-data'>{student.stu_name}</td>
              <td className='student-data'>{student.category}</td>
              <td className='student-data'>{student.section}</td>
              <td className='student-data'>
                <button onClick={() => openEditModal(student)} className='student-edit-btn'>Edit</button>
              </td>
              <td className='student-data'>
                <button onClick={() => handleDelete(student.reg_no)} className='student-delete-btn'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add Student</h3>
            <input
              type="text"
              name="stu_name"
              placeholder="Student Name"
              value={newStudent.stu_name}
              onChange={handleAddInputChange}
            />
            <input
              type="text"
              name="reg_no"
              placeholder="Registration Number"
              value={newStudent.reg_no}
              onChange={handleAddInputChange}
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={newStudent.category}
              onChange={handleAddInputChange}
            />
            <input
              type="text"
              name="section"
              placeholder="Section"
              value={newStudent.section}
              onChange={handleAddInputChange}
            />
            <button onClick={handleSaveStudent}>Save</button>
            <button onClick={closeAddModal}>Cancel</button>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {isEditModalOpen && editStudent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Student</h3>
            <input
              type="text"
              name="stu_name"
              placeholder="Student Name"
              value={editStudent.stu_name}
              onChange={handleEditInputChange}
            />
            <input
              type="text"
              name="reg_no"
              placeholder="Registration Number"
              value={editStudent.reg_no}
              disabled // Prevent editing reg_no
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={editStudent.category}
              onChange={handleEditInputChange}
            />
            <input
              type="text"
              name="section"
              placeholder="Section"
              value={editStudent.section}
              onChange={handleEditInputChange}
            />
            <button onClick={handleSaveEditStudent}>Save</button>
            <button onClick={closeEditModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentManage;
