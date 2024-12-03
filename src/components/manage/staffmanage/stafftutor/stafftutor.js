import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import './stafftutor.css';


const API_URL = "http://localhost:5000/api/mentor";
const apiUrl = process.env.REACT_APP_API_URL;
function StaffTutorManage() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingStaff, setEditingStaff] = useState(null); // For edit modal
    const [editForm, setEditForm] = useState({}); // For editing form values
    const [deleteStaff, setDeleteStaff] = useState(null); // For delete confirmation modal
    const [addtutur, setAddtutur] = useState("");

    const [newtuturName, setNewtuturName] = useState("");
    const [tuturgraduate, setTuturGraduate] = useState("");
    const [newcourseId, setNewCourseId] = useState("");
    const [newTuturId, setNewTuturId] = useState("")
    const [tuturCategory, setTuturCategory] = useState("");
    const [tuturdeptName, setTuturdeptName] = useState("");
    const [tuturDeptId, setTuturDeptId] = useState("");
    const [tuturBatch, setTuturBatch] = useState("");
    const [tuturDegree, setTuturDegree] = useState("");
    const [tuturSection, setTuturSection] = useState("");
    const [staffsuggest, setStaffsuggest] = useState(false);
    const [suggestingStaff, setSuggestingStaff] = useState([]);
    const [limitedStaffId, setLimitedStaffId] = useState([]);


    useEffect(() => {
        axios
            .get(API_URL)
            .then((response) => {
                setData(response.data);
                setFilteredData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();
        const filtered = data.filter((row) =>
            (row.staff_id?.toLowerCase() || "").includes(searchText) ||
            (row.staff_name?.toLowerCase() || "").includes(searchText)
        );
        setFilteredData(filtered);
    };

    // Handle Delete Click
    const handleDelete = (row) => {
        setDeleteStaff(row); // Open delete confirmation modal
    };

    // Confirm Delete
    const confirmDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            const updatedData = data.filter((row) => row.staff_id !== id);
            setData(updatedData);
            setFilteredData(updatedData);
            setDeleteStaff(null); // Close modal
            alert("Record deleted successfully.");
        } catch (err) {
            console.error("Error deleting record:", err);
            alert("Failed to delete the record. Please try again.");
        }
    };

    // Cancel Delete
    const cancelDelete = () => {
        setDeleteStaff(null); // Close delete modal without any action
    };

    // Handle Edit Click
    const handleEditClick = (row) => {
        setEditingStaff(row); // Open edit modal
        setEditForm({ ...row }); // Pre-fill form with staff details
    };

    // Handle Edit Input Change
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };


    // Save Edit
    const handleEditSave = async () => {
        try {
            await axios.put(`${API_URL}/${editForm.staff_id}`, editForm);
            const updatedData = data.map((row) =>
                row.staff_id === editForm.staff_id ? editForm : row
            );
            setData(updatedData);
            setFilteredData(updatedData);
            setEditingStaff(null); // Close modal
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
        return <div>Error: {error}</div>;
    }

    //  add new tutur

    const handleaddtutur = () => {
        setAddtutur(true);
    };
    const tututaddClose = () => {
        setAddtutur(false);
        setStaffsuggest(false);
    };
    const handleNewMentor = async () => {
        console.log(newTuturId, newtuturName, tuturDegree, tuturBatch, tuturCategory, tuturDeptId, tuturSection, tuturgraduate, tuturdeptName);
    };
    const handleInputChange = async (value) => {
        setNewTuturId(value);
        if (value.trim().length > 0) {
            try {
                setStaffsuggest(true);

                const response = await axios.get(`${apiUrl}/api/getstaff`, {
                    params: { newTuturId: value },
                });

                if (response.data) {
                    const limitedSuggestions = response.data.slice(0, 5);
                    setSuggestingStaff(response.data);
                    setLimitedStaffId(limitedSuggestions);
                } else {
                    alert("No matching staff found.");
                    setLimitedStaffId([]);
                }
            } catch (error) {
                console.error("Error fetching staff suggestions:", error);
                setLimitedStaffId([]);
            }
        } else {
            setStaffsuggest(false);
            setLimitedStaffId([]);
        }
    };

    const handleFetchStaff = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/staffdata`, {
                params: { newTuturId: newTuturId },
            });
            if (response.data) {
                // console.log(response.data[0].staff_name);
                // console.log(response.data[0].staff_pass);
                setNewtuturName(response.data[0].staff_name);
                setTuturGraduate(response.data[0].graduate);
                // setNewCourseId(response.data[0].course_id);
                setTuturCategory(response.data[0].category);
                // setTuturDegree(response.data[0].degree);
                setTuturdeptName(response.data[0].staff_dept);
                

                // alert("staff data")
            }
        } catch (err) {
            console.log(err, "error")
        };
    }



    return (
        <div className="smst-main">
            <span className="smst-top-heading">STAFF DETAILS</span>
            <div className="smst-input-btn">
                <input
                    className="smst-search"
                    type="text"
                    placeholder="Search by Id or Name..."
                    onChange={handleSearch}
                />
                <div>
					<button className="smsh-save-btn" onClick={handleaddtutur}><span>ADD</span><FontAwesomeIcon icon={faPlus} className="smsh-icon-add" /></button>
				</div>
            </div>
            <div className="smst-count">
                <span className="smst-span"><b>Total Records : </b>{filteredData.length}</span>
            </div>
            <table className="smst-table">
                <thead>
                    <tr>
                        <th>Batch</th>
                        <th>Staff ID</th>
                        <th>Mentor Name</th>
                        <th>Category</th>
                        <th>Degree</th>
                        <th>Dept Name</th>
                        <th>Section</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((row, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'smst-repo-light' : 'smst-repo-dark'}>
                                <td>{row.batch}</td>
                                <td>{row.staff_id}</td>
                                <td>{row.staff_name}</td>
                                <td>{row.category}</td>
                                <td>{row.degree}</td>
                                <td>{row.dept_name}</td>
                                <td>{row.section}</td>
                                <td>
                                    <button className="smst-edit-btn" onClick={() => handleEditClick(row)}>
                                        <span className="smst-edit-btn">Edit &nbsp; <FontAwesomeIcon icon={faEdit} className="smst-icon" /></span>
                                    </button>
                                </td>
                                <td>
                                    <button className="smst-delete-btn" onClick={() => handleDelete(row)}>
                                        <span className="smst-delete-btn">Delete &nbsp;<FontAwesomeIcon icon={faTrash} className="smst-icon" /></span>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9">No Data Found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Edit Modal */}
            {editingStaff && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit Staff Details</h2>
                        <label>Batch:</label>
                        <input
                            type="text"
                            name="batch"
                            value={editForm.batch || ""}
                            onChange={handleEditChange}
                        />
                        <label>Staff ID:</label>
                        <input
                            type="text"
                            name="staff_id"
                            value={editForm.staff_id || ""}
                            onChange={handleEditChange}
                            readOnly
                        />
                        <label>Mentor Name:</label>
                        <input
                            type="text"
                            name="staff_name"
                            value={editForm.staff_name || ""}
                            onChange={handleEditChange}
                        />
                        <label>Category:</label>
                        <input
                            type="text"
                            name="category"
                            value={editForm.category || ""}
                            onChange={handleEditChange}
                        />
                        <label>Degree:</label>
                        <input
                            type="text"
                            name="degree"
                            value={editForm.degree || ""}
                            onChange={handleEditChange}
                        />
                        <label>Department Name:</label>
                        <input
                            type="text"
                            name="dept_name"
                            value={editForm.dept_name || ""}
                            onChange={handleEditChange}
                        />
                        <label>Section:</label>
                        <input
                            type="text"
                            name="section"
                            value={editForm.section || ""}
                            onChange={handleEditChange}
                        />
                        <div className="modal-buttons">
                            <button onClick={handleEditSave} style={{ backgroundColor: "#4CAF50", color: "white" }}>Save</button>
                            <button onClick={() => setEditingStaff(null)} style={{ backgroundColor: "#f44336", color: "white" }}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteStaff && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Confirm Delete</h2>
                        <p><b>Staff ID:</b> {deleteStaff.staff_id}</p>
                        <p><b>Mentor Name:</b> {deleteStaff.staff_name}</p>
                        <p><b>Category:</b> {deleteStaff.category}</p>
                        <p><b>Degree:</b> {deleteStaff.degree}</p>
                        <p><b>Department Name:</b> {deleteStaff.dept_name}</p>
                        <p><b>Section:</b> {deleteStaff.section}</p>
                        <div className="modal-buttons">
                            <button onClick={() => confirmDelete(deleteStaff.staff_id)} style={{ backgroundColor: "#f44336", color: "white" }}>Delete</button>
                            <button onClick={cancelDelete} style={{ backgroundColor: "#4CAF50", color: "white" }}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {addtutur && (

                <div className="smsh-overlay">
                    <div className="smsh-edit">
                        <div className="smsh-close-class">
                            <span onClick={tututaddClose} className="smsh-close">✖</span>
                        </div>
                        <label className="smsh-edit-label">STAFF ID : </label>
                        <input
                            type="text"
                            name="staff_id"
                            className="smsh-edit-inputbox"
                            value={newTuturId}
                            onChange={(e) => handleInputChange(e.target.value)}

                        />
                        {staffsuggest && limitedStaffId.length > 0 && (
                            <ul className="staff-suggestions">
                                {limitedStaffId.map((item, index) => (
                                    <li
                                        key={index}
                                        onClick={() => {
                                            setNewTuturId(item.staff_id);
                                            handleFetchStaff();
                                            setStaffsuggest(false);
                                        }}
                                        className="suggestion-item"
                                    >
                                        {item.staff_id} - {item.staff_name}
                                    </li>
                                ))}
                            </ul>
                        )}


                        <label className="smsh-edit-label">STAFF NAME: </label>
                        <input
                            type="text"
                            name="hod_name"
                            value={newtuturName}
                            onChange={(e) => setNewtuturName(e.target.value)}
                            className="smsh-edit-inputbox"
                        />


                        <div className="smsm-edit-psw">
                            <label className="smsm-edit-password">
                                <label className="smsh-edit-label">GRADUATE : </label>
                                <input
                                    type="text"
                                    name="graduate"
                                    
                                    onChange={(e) => setTuturGraduate(e.target.value)}
                                    className="smsh-edit-inputbox-psw"
                                />
                            </label>
                            <label className="smsm-edit-password">
                                <label className="smsh-edit-label">DEPT ID : </label>								<input
                                    type="text"
                                    name="course_id"
                                    // value={tut}
                                    onChange={(e) => setTuturDeptId(e.target.value)}
                                    className="smsh-edit-inputbox-psw"
                                />
                            </label>
                        </div>

                        <div className="smsm-edit-psw">
                            <label className="smsm-edit-password">
                                <label className="smsh-edit-label">CATEGORY : </label>								<input
                                    type="text"
                                    name="category"
                                    value={tuturCategory}
                                    onChange={(e) => setTuturCategory(e.target.value)}
                                    className="smsh-edit-inputbox-psw"
                                />
                            </label>
                            <label className="smsm-edit-password">
                                <label className="smsh-edit-label">DEPT NAME : </label>								<input
                                    type="text"
                                    name="dept_name"
                                    value={tuturdeptName}
                                    onChange={(e) => setTuturdeptName(e.target.value)}
                                    className="smsh-edit-inputbox-psw"
                                />
                            </label>
                        </div>
                        <div className="smsm-edit-psw">
                            <label className="smsm-edit-password">
                                <label className="smsh-edit-label">DEGREE : </label>								<input
                                    type="text"
                                    name="category"
                                    onChange={(e) => setTuturDegree(e.target.value)}
                                    className="smsh-edit-inputbox-psw"
                                />
                            </label>
                            <label className="smsm-edit-password">
                                <label className="smsh-edit-label">SECTION : </label>								<input
                                    type="text"
                                    name="dept_name"
                                    onChange={(e) => setTuturSection(e.target.value)}
                                    className="smsh-edit-inputbox-psw"
                                />
                            </label>
                        </div>
                        <label className="smsh-edit-label">BATCH : </label>
                        <input
                            type="text"
                            name="staff_id"
                            className="smsh-edit-inputbox"
                            onChange={(e) => setTuturBatch(e.target.value)}
                        />
                        <div className="smsh-delete-btn-container">
                            <button onClick={handleNewMentor} className="smsh-cancel-btn">Save</button>
                            <button onClick={"() => setAddhod(false)"} className="smsh-cancel-btn">Cancel</button>
                        </div>
                    </div>
                </div >
                // <div className="modal">
                // 	<div className="modal-content">
                // 		<h2>Edit HOD Details</h2>

                // 		<div className="modal-buttons">
                // 			<button onClick={handleEditSave} style={{ backgroundColor: "#4CAF50", color: "white" }}>Save</button>
                // 			<button onClick={() => setEditingHod(null)} style={{ backgroundColor: "#f44336", color: "white" }}>Cancel</button>
                // 		</div>
                // 	</div>
                // </div>
            )
            }
        </div >
    );
}

export default StaffTutorManage;