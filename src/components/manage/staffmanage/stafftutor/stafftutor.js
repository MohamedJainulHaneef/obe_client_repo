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
            (row.staff_id?.toLowerCase() || "").includes(searchText) ||
            (row.category?.toLowerCase() || "").includes(searchText) ||
            (row.dept_name?.toLowerCase() || "").includes(searchText)
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
                // setNewCourseId(response.data[0].dept_id);
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
                        <th>No</th>
                        <th>Staff ID</th>
                        <th>Mentor Name</th>
                        <th>Category</th>
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
                                <td>{index + 1}</td>
                                <td>{row.staff_id}</td>
                                <td>{row.staff_name}</td>
                                <td>{row.category}</td>
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
                            <td colSpan="9">No Data Available.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            

            {addtutur && (

                <div className="smsh-overlay">
                    <div className="smsh-edit">
                        <div className="smsh-close-class">
                            <span className="smsh-close">✖</span>
                        </div>
                        <div className="smsm-edit-psw">
                            <label className="smsm-edit-password">
                                <label className="smsh-edit-label">STAFF ID : </label>
                                <input
                                    type="text"
                                    name="staffid"
                                    className="smsh-edit-inputbox-psw"

                                />
                            </label>
                            <label className="smsm-edit-password">
                                <label className="smsh-edit-label">CATEGORY : </label>
                                <input
                                    type="text"
                                    name="category"
                                    className="smsh-edit-inputbox-psw"

                                />
                            </label>
                        </div>
                        <label className="smsh-edit-label">MENTOR NAME : </label>
                        <input
                            type="text"
                            name="staff_name"
                            className="smsh-edit-inputbox"

                        />


                        <div className="smsm-edit-psw">
                            <label className="smsm-edit-password">
                                <label className="smsh-edit-label">DEGREE : </label>
                                <input
                                    type="text"
                                    name="degree"
                                    className="smsh-edit-inputbox-psw"

                                />
                            </label>
                            <label className="smsm-edit-password">
                                <label className="smsh-edit-label">CATEGORY : </label>
                                <input
                                    type="text"
                                    name="category"
                                    className="smsh-edit-inputbox-psw"

                                />
                            </label>
                        </div>

                        <div className="smsm-edit-psw">
                            <label className="smsm-edit-password">
                                <label className="smsh-edit-label">GRADUATE : </label>
                                <input
                                    type="text"
                                    name="degree"
                                    className="smsh-edit-inputbox-psw"

                                />
                            </label>
                            <label className="smsm-edit-password">
                                <label className="smsh-edit-label">SECTION : </label>
                                <input
                                    type="text"
                                    name="section"
                                    className="smsh-edit-inputbox-psw"

                                />
                            </label>
                        </div>

                        <div className="smsm-edit-psw">
                            <label className="smsm-edit-password">
                                <label className="smsh-edit-label">DEPT ID : </label>
                                <input
                                    type="text"
                                    name="degree"
                                    className="smsh-edit-inputbox-psw"

                                />
                            </label>
                            <label className="smsm-edit-password">
                                <label className="smsh-edit-label">DEPT NAME : </label>
                                <input
                                    type="text"
                                    name="section"
                                    className="smsh-edit-inputbox-psw"

                                />
                            </label>
                        </div>
                        <div className="smsh-delete-btn-container">
                            <button className="smsh-add-save-btn">SAVE</button>
                            <button className="smsh-save-edit-btn">CANCEL</button>
                        </div>
                    </div>
                </div>
            )}

            {editingStaff && (

                <div className="smsh-overlay">
                    <div className="smsh-edit">
                        <div className="smsh-close-class">
                            <span onClick={() => setEditingStaff(null)} className="smsh-close">✖</span>
                        </div>
                        <label className="smsh-edit-label">STAFF ID : </label>
                        <input
                            type="text"
                            name="staff_id"
                            value={editForm.staff_id || ""}
                            onChange={handleEditChange}
                            className="smsh-edit-inputbox"
                            readOnly
                        />
                        <label className="smsh-edit-label">MENTOR NAME : </label>
                        <input
                            type="text"
                            name="staff_name"
                            value={editForm.staff_name || ""}
                            onChange={handleEditChange}
                            className="smsh-edit-inputbox"

                        />


                        <div className="smsm-edit-psw">
                            <label className="smsm-edit-password">
                                <label className="smsh-edit-label">BATCH : </label>
                                <input
                                    type="text"
                                    name="batch"
                                    value={editForm.batch || ""}
                                    onChange={handleEditChange}
                                    className="smsh-edit-inputbox-psw"

                                />
                            </label>
                            <label className="smsm-edit-password">
                                <label className="smsh-edit-label">CATEGORY : </label>
                                <input
                                    type="text"
                                    name="category"
                                    value={editForm.category || ""}
                                    onChange={handleEditChange}
                                    className="smsh-edit-inputbox-psw"

                                />
                            </label>
                        </div>

                        <div className="smsm-edit-psw">
                            <label className="smsm-edit-password">
                                <label className="smsh-edit-label">GRADUATE : </label>
                                <input
                                    type="text"
                                    name="degree"
                                    value={editForm.graduate || ""}
                                    onChange={handleEditChange}
                                    className="smsh-edit-inputbox-psw"

                                />
                            </label>
                            <label className="smsm-edit-password">
                                <label className="smsh-edit-label">SECTION : </label>
                                <input
                                    type="text"
                                    name="section"
                                    value={editForm.section || ""}
                                    onChange={handleEditChange}
                                    className="smsh-edit-inputbox-psw"

                                />
                            </label>
                        </div>

                        <div className="smsm-edit-psw">
                            <label className="smsm-edit-password">
                                <label className="smsh-edit-label">DEPT ID : </label>
                                <input
                                    type="text"
                                    name="degree"
                                    value={editForm.dept_id || ""}
                                    onChange={handleEditChange}
                                    className="smsh-edit-inputbox-psw"

                                />
                            </label>
                            <label className="smsm-edit-password">
                                <label className="smsh-edit-label">DEPT NAME : </label>
                                <input
                                    type="text"
                                    name="section"
                                    value={editForm.dept_name || ""}
                                    onChange={handleEditChange}
                                    className="smsh-edit-inputbox-psw"

                                />
                            </label>
                        </div>
                        <div className="smsh-delete-btn-container">
                            <button onClick={handleEditSave} className="smsh-add-save-btn">SAVE</button>
                            <button onClick={() => setEditingStaff(null)} className="smsh-save-edit-btn">CANCEL</button>
                        </div>
                    </div>
                </div>
            )}


            {/* Delete Confirmation Modal */}
            {deleteStaff && (
                <div className="smst-overlay">
                    <div className="smst-content">
                        <div className="smsh-close-class">
                            <span onClick={cancelDelete} className="smsh-close">✖</span>
                        </div>
                        <h4>Staff ID : {deleteStaff.staff_id}</h4>
                        <h4>Mentor Name : {deleteStaff.staff_name}</h4>
                        <h4>Category : {deleteStaff.category}</h4>
                        <h4>Degree : {deleteStaff.degree}</h4>
                        <h4>Dept Name : {deleteStaff.dept_name}</h4>
                        <h4>Section : {deleteStaff.section}</h4>
                        <div className="smsh-delete-btn-container">
                            <button onClick={() => confirmDelete(deleteStaff.staff_id)} className="smsh-save-edit-btn">DELETE</button>
                            <button onClick={cancelDelete} className="smsh-add-save-btn">CANCEL</button>
                        </div>
                    </div>
                </div>
            )}
        </div >
    )
}

export default StaffTutorManage;