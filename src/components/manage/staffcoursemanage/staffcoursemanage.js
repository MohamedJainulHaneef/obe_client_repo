import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './staffcoursemanage.css';

function StaffManage() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [staffData, setStaffData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    staff_id: '',
    staff_name: '',
    category: '',
    batch: '',
    section: '',
    course_id: '',
    degree: '',
    dept_name: '',
    semester: '',
    course_code: '',
    course_title: '',
    active_sem: ''
  });

  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/staffcoursemanage`);
        setStaffData(response.data);
      } catch (error) {
        console.error('Error fetching staff data', error);
      }
    };
    fetchStaffDetails();
  }, [apiUrl]);

  const filteredStaffData = staffData.filter((staff) =>
    (staff.staff_id?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (staff.staff_name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  // Add Staff Modal Handlers
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewStaff({
      staff_id: '',
      staff_name: '',
      category: '',
      batch: '',
      section: '',
      course_id: '',
      degree: '',
      dept_name: '',
      semester: '',
      course_code: '',
      course_title: '',
      active_sem: ''
    });
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveStaff = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/addstaff`, newStaff);

      if (response.status === 201) {
        setStaffData((prev) => [...prev, response.data.staff]); // Update local state
        alert('Staff added successfully!');
      }
      closeAddModal();
    } catch (error) {
      console.error('Error adding staff:', error);
      alert('Failed to add staff. Please try again.');
    }
  };

  const handleDeleteStaff = async (staffId, courseCode) => {
    try {
      const response = await axios.delete(`${apiUrl}/api/deletestaff/${staffId}/${courseCode}`);

      if (response.status === 200) {
        setStaffData(prev => prev.filter(staff => !(staff.staff_id === staffId && staff.course_code === courseCode)));
        alert('Staff course entry deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting staff course:', error);
      alert('Failed to delete staff course. Please try again.');
    }
  };

  return (
    <div className="staff-manage">
      <h2>Staff Details</h2>
      <input
        type="text"
        placeholder="Search by name or staff ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="staff-search-bar"
      />
      <button className="add-staff-button" onClick={openAddModal}>
        Add Staff
      </button>
      <table className="staff-table">
        <thead>
          <tr>
            <th className='staff-header'>S No</th>
            <th className='staff-header'>Staff ID</th>
            <th className='staff-header'>Name</th>
            <th className='staff-header'>Category</th>
            <th className='staff-header'>Degree</th>
            <th className='staff-header'>Section</th>
            <th className='staff-header'>Course ID</th>
            <th className='staff-header'>Course Code</th>
            <th className='staff-header'>Course Title</th>
            <th className='staff-header'>Active Sem</th>
            <th className='staff-header'>Action</th> {/* Add Action Column for Delete */}
          </tr>
        </thead>
        <tbody>
          {filteredStaffData.map((staff, index) => (
            <tr key={index}>
              <td className='staff-data'>{index + 1}</td>
              <td className='staff-data'>{staff.staff_id}</td>
              <td className='staff-data'>{staff.staff_name}</td>
              <td className='staff-data'>{staff.category}</td>
              <td className='staff-data'>{staff.degree}</td>
              <td className='staff-data'>{staff.section}</td>
              <td className='staff-data'>{staff.course_id}</td>
              <td className='staff-data'>{staff.course_code}</td>
              <td className='staff-data'>{staff.course_title}</td>
              <td className='staff-data'>{staff.active_sem}</td>
              <td className='staff-data'>
                <button onClick={() => handleDeleteStaff(staff.staff_id, staff.course_code)} className='staff-delete-btn'>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Staff Modal */}
      {isAddModalOpen && (
        <div className="staff-modal-overlay">
          <div className="staff-modal-content">
            <h3>Add Staff</h3>
            <input
              type="text"
              name="staff_id"
              placeholder="Staff ID"
              value={newStaff.staff_id}
              onChange={handleAddInputChange}
            />
            <input
              type="text"
              name="staff_name"
              placeholder="Staff Name"
              value={newStaff.staff_name}
              onChange={handleAddInputChange}
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={newStaff.category}
              onChange={handleAddInputChange}
            />
            <input
              type="text"
              name="section"
              placeholder="Section"
              value={newStaff.section}
              onChange={handleAddInputChange}
            />
            <input
              type="text"
              name="course_id"
              placeholder="Course ID"
              value={newStaff.course_id}
              onChange={handleAddInputChange}
            />
            <input
              type="text"
              name="course_code"
              placeholder="Course Code"
              value={newStaff.course_code}
              onChange={handleAddInputChange}
            />
            <input
              type="text"
              name="course_title"
              placeholder="Course Title"
              value={newStaff.course_title}
              onChange={handleAddInputChange}
            />
            <input
              type="text"
              name="batch"
              placeholder="Batch"
              value={newStaff.batch}
              onChange={handleAddInputChange}
            />
            <input
              type="text"
              name="semester"
              placeholder="Semester"
              value={newStaff.semester}
              onChange={handleAddInputChange}
            />
            <input
              type="text"
              name="degree"
              placeholder="Degree"
              value={newStaff.degree}
              onChange={handleAddInputChange}
            />
            <input
              type="text"
              name="dept_name"
              placeholder="Dept Name"
              value={newStaff.dept_name}
              onChange={handleAddInputChange}
            />
            <input
              type="text"
              name="active_sem"
              placeholder="Active Sem"
              value={newStaff.active_sem}
              onChange={handleAddInputChange}
            />
            <div className='add-staff-save'>
              <button onClick={handleSaveStaff} className='add-save-btn'>Save</button>
              <button onClick={closeAddModal} className='add-save-btn'>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffManage;
