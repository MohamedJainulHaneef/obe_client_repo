import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import './staffhod.css';

const API_URL = "http://localhost:5000/api/hod";

function StaffHodManage() {
     const [data, setData] = useState([]);
     const [filteredData, setFilteredData] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     const [editingHod, setEditingHod] = useState(null); // State for editing
     const [editForm, setEditForm] = useState({}); // State for the form values
     const [deleteHod, setDeleteHod] = useState(null); // State for delete confirmation modal

     useEffect(() => {
          axios.get(API_URL).then((response) => {
               setData(response.data);
               setFilteredData(response.data);
               setLoading(false);
          }).catch((err) => {
               setError(err.message);
               setLoading(false);
          });
     }, []);

     const handleSearch = (e) => {
          const searchText = e.target.value.toLowerCase();
          const filtered = data.filter((row) =>
               row.staff_id.toLowerCase().includes(searchText) ||
               row.hod_name.toLowerCase().includes(searchText) ||
               row.dept_name.toLowerCase().includes(searchText)
          );
          setFilteredData(filtered);
     };

     const handleDelete = (row) => {
          setDeleteHod(row);  // Set the HOD to delete
     };

     const confirmDelete = async (id) => {
          try {
               await axios.delete(`${API_URL}/${id}`);
               const updatedData = data.filter((row) => row.staff_id !== id);
               setData(updatedData);
               setFilteredData(updatedData);
               setDeleteHod(null);  // Close modal after deletion
               alert("Record deleted successfully.");
          } catch (err) {
               console.error("Error deleting record:", err);
               alert("Failed to delete the record. Please try again.");
          }
     };

     const cancelDelete = () => {
          setDeleteHod(null);  // Close modal without deleting
     };

     const handleEditClick = (row) => {
          console.log("Edit clicked for:", row); // Debugging log
          setEditingHod(row); // Set the HOD to edit
          setEditForm({ ...row }); // Pre-fill form with HOD details
     };

     const handleEditChange = (e) => {
          const { name, value } = e.target;
          setEditForm((prev) => ({ ...prev, [name]: value })); // Update form values
     };

     const handleEditSave = async () => {
          try {
               await axios.put(`${API_URL}/${editForm.staff_id}`, editForm); // Save to backend
               const updatedData = data.map((row) =>
                    row.staff_id === editForm.staff_id ? editForm : row
               );
               setData(updatedData);
               setFilteredData(updatedData);
               setEditingHod(null); // Close modal
               alert("Record updated successfully.");
          } catch (err) {
               console.error("Error updating record:", err);
               alert("Failed to update the record. Please try again.");
          }
     };

     if (loading) {
          return <div>Loading...</div>;
     }

     if (error) {
          return <div>Error : {error}</div>;
     }

     return (
          <div className="smsh-main">
               <span className="smsh-top-heading">HOD DETAILS</span>
               <div className="smsh-input-btn">
                    <input
                         className="smsh-search"
                         type="text"
                         placeholder="Search by Id or Name..."
                         onChange={handleSearch}
                    />
                    <button className="sm-save-btn"><span>ADD</span><FontAwesomeIcon icon={faPlus} className="smsh-icon-add" /></button>
               </div>
               <div className="smsh-count">
                    <span className="smsh-span"><b>Total Number of Heads : </b>{filteredData.length}</span>
               </div>
               <table className="smsh-table">
                    <thead>
                         <tr>
                              <th>S No</th>
                              <th>Staff ID</th>
                              <th>HOD / MID Name</th>
                              <th>Category</th>
                              <th>Degree</th>
                              <th>Department Name</th> 
                              <th>Edit</th>
                              <th>Delete</th>
                         </tr>
                    </thead>
                    <tbody>
                         {filteredData.length > 0 ? (
                              filteredData.map((row, index) => (
                                   <tr key={index} className={index % 2 === 0 ? 'smsh-repo-light' : 'smsh-repo-dark'}>
                                        <td>{index + 1}</td>
                                        <td>{row.staff_id}</td>
                                        <td>{row.hod_name}</td>
                                        <td>{row.category}</td>
                                        <td>{row.degree}</td>
                                        <td>{row.dept_name}</td>
                                        <td>
                                             <button 
                                                  className="smsh-edit-btn" 
                                                  onClick={() => handleEditClick(row)}
                                             >
                                                  <span className="smsh-edit-btn">Edit &nbsp; <FontAwesomeIcon icon={faEdit} className="smsh-icon" /></span>
                                             </button>
                                        </td>
                                        <td>
                                             <button 
                                                  className="smsh-delete-btn"
                                                  onClick={() => handleDelete(row)}
                                             >
                                                  <span className="smsh-delete-btn">Delete &nbsp;<FontAwesomeIcon icon={faTrash} className="smsh-icon" /></span>
                                             </button>
                                        </td>
                                   </tr>
                              ))
                         ) : (
                              <tr>
                                   <td colSpan="8">No Data Found</td>
                              </tr>
                         )}
                    </tbody>
               </table>

               {/* Edit Modal */}
               {editingHod && (
               <div className="modal">
                    <div className="modal-content">
                         <h2>Edit HOD Details</h2>
                         <label>Staff ID:</label>
                         <input
                              type="text"
                              name="staff_id"
                              value={editForm.staff_id}
                              onChange={handleEditChange}
                              readOnly
                         />
                         <label>HOD / MID Name:</label>
                         <input
                              type="text"
                              name="hod_name"
                              value={editForm.hod_name}
                              onChange={handleEditChange}
                         />
                         <label>Category:</label>
                         <input
                              type="text"
                              name="category"
                              value={editForm.category}
                              onChange={handleEditChange}
                         />
                         <label>Degree:</label>
                         <input
                              type="text"
                              name="degree"
                              value={editForm.degree}
                              onChange={handleEditChange}
                         />
                         <label>Department Name:</label>
                         <input
                              type="text"
                              name="dept_name"
                              value={editForm.dept_name}
                              onChange={handleEditChange}
                         />
                         <div className="modal-buttons">
                              <button onClick={handleEditSave} style={{ backgroundColor: "#4CAF50", color: "white" }}>Save</button>
                              <button onClick={() => setEditingHod(null)} style={{ backgroundColor: "#f44336", color: "white" }}>Cancel</button>
                         </div>
                    </div>
               </div>
               )}

               {/* Delete Confirmation Modal */}
               {deleteHod && (
                    <div className="modal">
                         <div className="modal-content">
                              <h2>Confirm Delete</h2>
                              <p><b>Staff ID:</b> {deleteHod.staff_id}</p>
                              <p><b>HOD Name:</b> {deleteHod.hod_name}</p>
                              <p><b>Category:</b> {deleteHod.category}</p>
                              <p><b>Degree:</b> {deleteHod.degree}</p>
                              <p><b>Department Name:</b> {deleteHod.dept_name}</p>
                              <div className="modal-buttons">
                                   <button onClick={() => confirmDelete(deleteHod.staff_id)} style={{ backgroundColor: "#f44336", color: "white" }}>Delete</button>
                                   <button onClick={cancelDelete} style={{ backgroundColor: "#4CAF50", color: "white" }}>Cancel</button>
                              </div>
                         </div>
                    </div>
               )}
          </div>
     );
}

export default StaffHodManage;