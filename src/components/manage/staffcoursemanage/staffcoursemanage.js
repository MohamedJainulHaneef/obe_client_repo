import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './staffcoursemanage.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

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
     const handleDeleteStaff = async (staffId, courseCode, category, section, courseId) => {
          try {
               const response = await axios.delete(`${apiUrl}/api/deletestaff`, {
                    params: {
                         staff_id: staffId,
                         course_code: courseCode,
                         category: category,
                         section: section
                    },
               });

               if (response.status === 200) {
                    setStaffData((prev) =>
                         prev.filter(
                              (staff) =>
                                   !(
                                        staff.staff_id === staffId &&
                                        staff.course_code === courseCode &&
                                        staff.category === category &&
                                        staff.section === section
                                   )
                         )
                    );
                    alert("Staff course entry deleted successfully!");
               }
          } catch (error) {
               console.error("Error deleting staff course:", error);
               alert("Failed to delete staff course. Please try again.");
          }
     };

     return (
          <div className="staff-manage">
               <span className="sm-top-heading">STAFF COURSE MANAGE</span>
               <div className="sm-input-btn">
                <input className="sm-search"
                     type="text"
                     placeholder="Search by Name or Staff Id..."
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div>
                    <button className="sm-save-btn" ><span>ADD</span><FontAwesomeIcon icon={faPlus} className="smst-icon-add" /></button>
                </div>
            </div>
          
               <table className="staff-table">
  <thead>
    <tr>
      <th className="staff-header" rowSpan={2}>
        S No
      </th>
      <th className="staff-header" colSpan={2}>
        Staff ID
      </th>
      <th className="staff-header">Category</th>
      <th className="staff-header">Section</th>
      <th className="staff-header">Course ID</th>
      <th className="staff-header">Course Code</th>
      <th className="staff-header" rowSpan={2}>
        Edit
      </th>
      <th className="staff-header" rowSpan={2}>
        Delete
      </th>
    </tr>
    <tr>
      <th className="staff-header" colSpan={2}>
        Staff Name
      </th>
      <th className="staff-header" colSpan={4}>
        Course Title
      </th>
    </tr>
  </thead>
  <tbody>
    {filteredStaffData.map((staff, index) => (
      <React.Fragment key={index}>
        {/* Row 1 */}
        <tr key={index}className={index % 2 === 0 ? 'staff-repo-light' : 'staff-repo-dark'}>
          <td className="staff-data" rowSpan={2}>
            {index + 1}
          </td>
          <td className="staff-data" colSpan={2}>
            {staff.staff_id}
          </td>
          
          <td className="staff-data">{staff.category}</td>
          <td className="staff-data">{staff.section}</td>
          <td className="staff-data">{staff.course_id}</td>
          <td className="staff-data">{staff.course_code}</td>
          <td className="staff-data" rowSpan={2}>
            <button className="sm-edit-btn">
              <span className="sm-edit-btn">
                Edit &nbsp;
                <FontAwesomeIcon icon={faEdit} className="sm-icon" />
              </span>
            </button>
          </td>
          <td className="staff-data" rowSpan={2}>
            <button
              onClick={() =>
                handleDeleteStaff(
                  staff.staff_id,
                  staff.course_code,
                  staff.category,
                  staff.section
                )
              }
              className="staff-delete-btn"
            >
              <span className="sm-delete-btn">
                Delete &nbsp;
                <FontAwesomeIcon icon={faTrash} className="sm-icon" />
              </span>
            </button>
          </td>
        </tr>
        {/* Row 2 */}
        <tr key={index}className={index % 2 === 0 ? 'staff-repo-light' : 'staff-repo-dark'}>
        <td className="staff-data" colSpan={2}>
            {staff.staff_name}
          </td>
          <td className="staff-data" colSpan={4}>
            {staff.course_title}
          </td>
        </tr>
      </React.Fragment>
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
