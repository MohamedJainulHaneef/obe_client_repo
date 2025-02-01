import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import './stafftutor.css';

const API_URL = "http://localhost:5000/api/mentor";
const apiUrl = process.env.REACT_APP_API_URL;

function StaffTutorManage() 
{
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingStaff, setEditingStaff] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [deleteStaff, setDeleteStaff] = useState(null);
    const [addtutur, setAddtutur] = useState(false);

    const [newTuturId, setNewTuturId] = useState("");
    const [newtuturName, setNewtuturName] = useState("");
    const [tuturgraduate, setTuturGraduate] = useState("");
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
        axios.get(API_URL).then((response) => {
            setData(response.data);
            setFilteredData(response.data);
            setLoading(false);
        })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            })
    }, []);

    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();
        const filtered = data.filter((row) =>
            (row.staff_id?.toLowerCase() || "").includes(searchText) ||
            (row.staff_name?.toLowerCase() || "").includes(searchText) ||
            (row.category?.toLowerCase() || "").includes(searchText) ||
            (row.dept_name?.toLowerCase() || "").includes(searchText)
        )
        setFilteredData(filtered);
    }

    const handleDelete = (row) => { setDeleteStaff(row) }

    const confirmDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/mentor/${id}`);
            const updatedData = data.filter((row) => row.staff_id !== id);
            setData(updatedData);
            setFilteredData(updatedData);
            setDeleteStaff(null);
            alert("Record deleted successfully.");
        }
        catch (err) {
            if (err.response) { console.error("Error details:", err.response.data) }
            alert("Failed to delete the record. Please try again.");
        }
    }

    const cancelDelete = () => { setDeleteStaff(null) }

    const handleEditClick = (row) => { setEditingStaff(row); setEditForm({ ...row }) }

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    }

    const handleEditSave = async () => {
        try {
            await axios.put(`${API_URL}/${editForm.staff_id}`, editForm);
            const updatedData = data.map((row) =>
                row.staff_id === editForm.staff_id ? editForm : row
            )
            setData(updatedData);
            setFilteredData(updatedData);
            setEditingStaff(null);
            alert("Record updated Successfully.");
        }
        catch (err) {
            console.error("Error updating Record :", err);
            alert("Failed to update the record. Please try again.");
        }
    }

    if (loading) { return <div>Loading...</div> }
    if (error) { return <div>Error: {error}</div> }

    const handleaddtutur = () => { setAddtutur(true) }
    const tututaddClose = () => { setAddtutur(false); setStaffsuggest(false) }

    const handleNewMentor = async () => {
        const newMentor = {
            staff_id: newTuturId,
            staff_name: newtuturName,
            graduate: tuturgraduate,
            category: tuturCategory,
            dept_name: tuturdeptName,
            dept_id: tuturDeptId,
            batch: tuturBatch,
            degree: tuturDegree,
            section: tuturSection,
        }
        try {
            const response = await axios.post(`${apiUrl}/api/newtutoradded`, { newMentor });
            if (response.status === 201) {
                setData((prevData) => [...prevData, response.data.mentor]);
                setFilteredData((prevData) => [...prevData, response.data.mentor]);
                setAddtutur(false);
                alert("New Mentor Added Successfully.");
            }
        }
        catch (err) {
            console.error("Error adding new mentor:", err);
            alert("Failed to add new mentor. Please try again.");
        }
    }

    const handleInputChange = async (value) => {
        setNewTuturId(value);
        if (value.trim().length > 0) {
            try {
                setStaffsuggest(true);
                const response = await axios.get(`${apiUrl}/api/getstaff`, {
                    params: { newTuturId: value },
                })

                if (response.data) {
                    const limitedSuggestions = response.data.slice(0, 5);
                    setSuggestingStaff(response.data);
                    setLimitedStaffId(limitedSuggestions);
                }
                else {
                    alert("No matching staff found.");
                    setLimitedStaffId([]);
                }
            }
            catch (error) {
                console.error("Error fetching staff suggestions:", error);
                setLimitedStaffId([]);
            }
        }
        else {
            setStaffsuggest(false);
            setLimitedStaffId([]);
        }
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
                    <button className="smsh-save-btn" onClick={handleaddtutur}>
                        <span>ADD</span>
                        <FontAwesomeIcon icon={faPlus} className="smsh-icon-add" />
                    </button>
                </div>
            </div>
            <div className="smst-count">
                <span className="smst-span">
                    <b>Total Records : </b>
                    {filteredData.length}
                </span>
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
                                    <button
                                        className="smst-edit-btn"
                                        onClick={() => handleEditClick(row)}
                                    >
                                        Edit&nbsp;
                                        <FontAwesomeIcon icon={faEdit} className="smst-icon" />
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="smst-delete-btn"
                                        onClick={() => handleDelete(row)}
                                    >
                                        Delete&nbsp;
                                        <FontAwesomeIcon icon={faTrash} className="smst-icon" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No Data Available.</td>
                        </tr>
                    )}
                </tbody>
            </table>

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

            {addtutur && (
                <div className="smsh-overlay">
                    <div className="smsh-edit">
                        <div className="smsh-close-class">
                            <span onClick={tututaddClose} className="smsh-close">✖</span>
                        </div>
                        <label className="smsh-edit-label">STAFF ID:</label>
                        <input
                            type="text"
                            value={newTuturId}
                            onChange={(e) => handleInputChange(e.target.value)}
                            className="smsh-edit-inputbox"
                        />
                        <label className="smsh-edit-label">MENTOR NAME:</label>
                        <input
                            type="text"
                            value={newtuturName}
                            onChange={(e) => setNewtuturName(e.target.value)}
                            className="smsh-edit-inputbox"
                        />
                        <div className="smsm-edit-psw">
                            <label className="smsm-edit-password">
                                <label className="smsh-edit-label">CATEGORY:</label>
                                <input
                                    type="text"
                                    value={tuturCategory}
                                    onChange={(e) => setTuturCategory(e.target.value)}
                                    className="smsh-edit-inputbox-psw"
                                />
                            </label>
                            <label className="smsm-edit-password">
                                <label className="smsh-edit-label">DEGREE:</label>
                                <input
                                    type="text"
                                    value={tuturDegree}
                                    onChange={(e) => setTuturDegree(e.target.value)}
                                    className="smsh-edit-inputbox-psw"
                                />
                            </label>
                        </div>
                        <div className="smsm-edit-psw">
                            <label className="smsm-edit-password">
                                <label className="smsh-edit-label">GRADUATE:</label>
                                <input
                                    type="text"
                                    value={tuturgraduate}
                                    onChange={(e) => setTuturGraduate(e.target.value)}
                                    className="smsh-edit-inputbox-psw"
                                />
                            </label>
                            <label className="smsm-edit-password">
                                <label className="smsh-edit-label">SECTION:</label>
                                <input
                                    type="text"
                                    value={tuturSection}
                                    onChange={(e) => setTuturSection(e.target.value)}
                                    className="smsh-edit-inputbox-psw"
                                />
                            </label>
                        </div>
                        <div className="smsm-edit-psw">
                            <label className="smsm-edit-password">
                                <label className="smsh-edit-label">DEPT NAME:</label>
                                <input
                                    type="text"
                                    value={tuturdeptName}
                                    onChange={(e) => setTuturdeptName(e.target.value)}
                                    className="smsh-edit-inputbox-psw"
                                />
                            </label>
                            <label className="smsm-edit-password">
                                <label className="smsh-edit-label">DEPT ID:</label>
                                <input
                                    type="text"
                                    value={tuturDeptId}
                                    onChange={(e) => setTuturDeptId(e.target.value)}
                                    className="smsh-edit-inputbox-psw"
                                />
                            </label>
                        </div>
                        <label className="smsh-edit-label">BATCH:</label>
                        <input
                            type="text"
                            value={tuturBatch}
                            onChange={(e) => setTuturBatch(e.target.value)}
                            className="smsh-edit-inputbox"
                        />
                        <div className="smsm-edit-password">
                            <button className="smsh-save-btn" onClick={handleNewMentor}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default StaffTutorManage;