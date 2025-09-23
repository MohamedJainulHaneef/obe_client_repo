import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import './stafftutor.css';
import Loading from '../../../../assets/load.svg'

function StaffTutorManage() {

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
    const API_URL = "http://localhost:5000/api/mentor";
    const apiUrl = process.env.REACT_APP_API_URL;
    const [deptDetails, setDeptDetails] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_URL);
                setData(response.data.mentorData);
                setFilteredData(response.data.mentorData);
                setDeptDetails(response.data.deptDetails);
            } catch (err) { setError(err.message) }
            finally { setLoading(false) }
        }
        fetchData();
    }, []);

    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();
        const filtered = data.filter((row) =>
            (row.staff_id?.toLowerCase() || "").includes(searchText) ||
            (row.staff_name?.toLowerCase() || "").includes(searchText) ||
            (row.category?.toLowerCase() || "").includes(searchText) ||
            (row.dept_name?.toLowerCase() || "").includes(searchText)
        );
        setFilteredData(filtered);
    };

    const handleDelete = (row) => { setDeleteStaff(row); };
    const cancelDelete = () => setDeleteStaff(null);

    const handleEditClick = (row) => {
        setEditingStaff(row);
        setEditForm({ ...row });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleaddtutur = () => { setAddtutur(true); };
    const tututaddClose = () => { setAddtutur(false); };

    const handleSelectstaff = (selectedId) => {
        const selectedStaff = filteredData.filter((staff) => staff.staff_id == selectedId);
        setNewtuturName(selectedStaff[0].staff_name);
    }

    // Mentor CRUD

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
        };
        try {
            const response = await axios.post(`${apiUrl}/api/newtutoradded`, newMentor);
            if (response.status === 201) {
                setData((prev) => [...prev, response.data.mentor]);
                setFilteredData((prev) => [...prev, response.data.mentor]);
                setAddtutur(false);
                alert("Mentor Added Successfully.");
            }
        } catch {
            console.log("Failed to add new mentor. Please try again.");
        }
    }

    const handleEditSave = async () => {
        try {
            await axios.put(`${API_URL}/${editForm.staff_id}`, editForm);
            const updatedData = data.map((row) =>
                row.staff_id === editForm.staff_id ? editForm : row
            );
            setData(updatedData);
            setFilteredData(updatedData);
            setEditingStaff(null);
            alert("Mentor updated successfully.");
        } catch {
            alert("Failed to update the record. Please try again.");
        }
    }

    const confirmDelete = async (id) => {
        try {
            await axios.delete(`${apiUrl}/api/mentor/${id}`);
            const updatedData = data.filter((row) => row.staff_id !== id);
            setData(updatedData);
            setFilteredData(updatedData);
            setDeleteStaff(null);
            alert("Mentor deleted successfully.");
        } catch (err) {
            alert("Failed to delete the record. Please try again.");
        }
    }

    const getUniqueValues = (key) => { return [...new Set(deptDetails.map((item) => item[key]))]}

    if (loading) return <div><center><img src={Loading} alt="" className="img" /></center></div>;

    return (
        <div className="smst-main">
            <span className="smst-top-heading">MENTOR DETAILS</span>

            <div className="smst-input-btn">
                <input
                    className="smst-search"
                    type="text"
                    placeholder="Search ..."
                    onChange={handleSearch}
                />
                <button className="smsm-save-btn" onClick={handleaddtutur}>
                    <FontAwesomeIcon icon={faPlus} className="smsm-icon" />
                    <span>Add</span>
                </button>
            </div>

            {/* <div className="smst-count">
                <span><b>Total Records :</b> {filteredData.length}</span>
            </div> */}

            {/* Mentor Table */}
            <table className="smst-table">
                <thead>
                    <tr>
                        <th>Sno</th>
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
                    {filteredData.length > 0 ? filteredData.map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'smst-repo-light' : 'smst-repo-dark'}>
                            <td>{index + 1}</td>
                            <td>{row.staff_id}</td>
                            <td>{row.staff_name}</td>
                            <td>{row.category}</td>
                            <td>{row.dept_name}</td>
                            <td>{row.section}</td>
                            <td className='staff-repo-action'>
                                <button className="smsm-edit-btn" onClick={() => handleEditClick(row)}>
                                    <FontAwesomeIcon icon={faEdit} /> Edit
                                </button>
                            </td>
                            <td className='staff-repo-action'>
                                <button className="smsm-del-btn" onClick={() => handleDelete(row)}>
                                    <FontAwesomeIcon icon={faTrash} /> Delete
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="8">No Data Available.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Add Tutor Modal */}
            {addtutur && (
                <div className="smst-overlay">
                    <div className="smst-modal">
                        <div className='smsm-close-div'>
                            <button className="smst-close" onClick={tututaddClose}>✖</button>
                        </div>
                        <h3>ADD NEW TUTOR</h3>
                        <div className="smst-form-grid">
                            <select name="staff_id" onChange={(e) => { setNewTuturId(e.target.value); handleSelectstaff(e.target.value) }} placeholder="Mentor Id" defaultValue={"Select"} >
                                {filteredData.length > 0 && filteredData.map((item, index) => (
                                    <option key={index} value={item.staff_id}>{item.staff_id}</option>
                                ))}
                            </select>
                            <input
                                type="text"
                                placeholder="Mentor Name"
                                value={newtuturName || ''}
                                onChange={(e) => setNewtuturName(e.target.value)}
                            />
                            <select
                                value={tuturCategory}
                                onChange={(e) => setTuturCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                {getUniqueValues("category").map((cat, idx) => (
                                    <option key={idx} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={tuturDegree}
                                onChange={(e) => setTuturDegree(e.target.value)}
                            >
                                <option value="">Select Degree</option>
                                {getUniqueValues("degree").map((deg, idx) => (
                                    <option key={idx} value={deg}>
                                        {deg}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={tuturgraduate}
                                onChange={(e) => setTuturGraduate(e.target.value)}
                            >
                                <option value="">Select Graduate</option>
                                {getUniqueValues("graduate").map((grad, idx) => (
                                    <option key={idx} value={grad}>
                                        {grad}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={tuturSection}
                                onChange={(e) => setTuturSection(e.target.value)}
                            >
                                <option value="">Select Section</option>
                                {getUniqueValues("section").map((sec, idx) => (
                                    <option key={idx} value={sec}>
                                        {sec}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={tuturDeptId}
                                onChange={(e) => setTuturDeptId(e.target.value)}
                            >
                                <option value="">Select Dept ID</option>
                                {getUniqueValues("dept_id").map((id, idx) => (
                                    <option key={idx} value={id}>
                                        {id}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={tuturdeptName}
                                onChange={(e) => setTuturdeptName(e.target.value)}
                            >
                                <option value="">Select Dept Name</option>
                                {getUniqueValues("dept_name").map((name, idx) => (
                                    <option key={idx} value={name}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                            <select
                                className="smst-fullwidth"
                                value={tuturBatch}
                                onChange={(e) => setTuturBatch(e.target.value)}
                            >
                                <option value="">Select Batch</option>
                                {getUniqueValues("batch").map((batch, idx) => (
                                    <option key={idx} value={batch}>
                                        {batch}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="smshh-delete-btn-container">
                            <button onClick={handleNewMentor} className="smsm-add-save-btn">SAVE</button>
                            <button onClick={tututaddClose} className="smsm-save-edit-btn">CANCEL</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Tutor Modal */}
            {editingStaff && (
                <div className="smst-overlay">
                    <div className="smst-modal">
                        <div className='smsm-close-div'>
                            <button className="smst-close" onClick={() => setEditingStaff(null)}>✖</button>
                        </div>
                        <h3>EDIT TUTOR</h3>
                        <div className="smst-form-grid">
                            <input
                                type="text"
                                name="staff_id"
                                value={editForm.staff_id || ""}
                                readOnly
                                placeholder="Staff ID"
                            />
                            <input
                                type="text"
                                name="staff_name"
                                value={editForm.staff_name || ""}
                                onChange={handleEditChange}
                                placeholder="Mentor Name"
                            />
                            {/* CATEGORY DROPDOWN */}
                            <select
                                name="category"
                                value={editForm.category || ""}
                                onChange={handleEditChange}
                            >
                                <option value="">Select Category</option>
                                {Array.from(new Set(deptDetails.map(item => item.category))).map((cat, i) => (
                                    <option key={i} value={cat}>{cat}</option>
                                ))}
                            </select>
                            {/* DEGREE DROPDOWN */}
                            <select
                                name="degree"
                                value={editForm.degree || ""}
                                onChange={handleEditChange}
                            >
                                <option value="">Select Degree</option>
                                {Array.from(new Set(deptDetails.map(item => item.degree))).map((deg, i) => (
                                    <option key={i} value={deg}>{deg}</option>
                                ))}
                            </select>
                            {/* GRADUATE DROPDOWN */}
                            <select
                                name="graduate"
                                value={editForm.graduate || ""}
                                onChange={handleEditChange}
                            >
                                <option value="">Select Graduate</option>
                                {Array.from(new Set(deptDetails.map(item => item.graduate))).map((grad, i) => (
                                    <option key={i} value={grad}>{grad}</option>
                                ))}
                            </select>
                            {/* SECTION DROPDOWN */}
                            <select
                                name="section"
                                value={editForm.section || ""}
                                onChange={handleEditChange}
                            >
                                <option value="">Select Section</option>
                                {Array.from(new Set(deptDetails.map(item => item.section))).map((sec, i) => (
                                    <option key={i} value={sec}>{sec}</option>
                                ))}
                            </select>
                            {/* DEPT ID DROPDOWN */}
                            <select
                                name="dept_id"
                                value={editForm.dept_id || ""}
                                onChange={handleEditChange}
                            >
                                <option value="">Select Dept ID</option>
                                {Array.from(new Set(deptDetails.map(item => item.dept_id))).map((id, i) => (
                                    <option key={i} value={id}>{id}</option>
                                ))}
                            </select>
                            {/* DEPT NAME DROPDOWN */}
                            <select
                                name="dept_name"
                                value={editForm.dept_name || ""}
                                onChange={handleEditChange}
                            >
                                <option value="">Select Dept Name</option>
                                {Array.from(new Set(deptDetails.map(item => item.dept_name))).map((dn, i) => (
                                    <option key={i} value={dn}>{dn}</option>
                                ))}
                            </select>
                            {/* BATCH DROPDOWN */}
                            <select
                                name="batch"
                                value={editForm.batch || ""}
                                onChange={handleEditChange}
                                className="smst-fullwidth"
                            >
                                <option value="">Select Batch</option>
                                {Array.from(new Set(deptDetails.map(item => item.batch))).map((batch, i) => (
                                    <option key={i} value={batch}>{batch}</option>
                                ))}
                            </select>
                        </div>
                        <div className="smshh-delete-btn-container">
                            <button className="smsm-add-save-btn" onClick={handleEditSave}>SAVE</button>
                            <button className="smsm-save-edit-btn" onClick={() => setEditingStaff(null)}>CANCEL</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Tutor Modal */}
            {deleteStaff && (
                <div className="smst-overlay">
                    <div className="smst-modal" style={{ width: "450px", padding: "20px", textAlign: "center" }}>
                        <div className='smsm-close-div'>
                            <button className="smst-close" onClick={cancelDelete}>✖</button>
                        </div>
                        <h3>CONFIRM DELETE</h3>
                        <p>Staff ID : {deleteStaff.staff_id}</p>
                        <p>Mentor Name : {deleteStaff.staff_name}</p>
                        <p>Category : {deleteStaff.category}</p>
                        <p>Degree : {deleteStaff.degree}</p>
                        <p>Dept Name : {deleteStaff.dept_name}</p>
                        <p>Section : {deleteStaff.section}</p>
                        <div className="smshh-delete-btn-container">
                            <button onClick={() => confirmDelete(deleteStaff.staff_id)} className="smsm-add-save-btn">DELETE</button>
                            <button onClick={cancelDelete} className="smsm-save-edit-btn">CANCEL</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default StaffTutorManage;
