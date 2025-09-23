import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import './staffhod.css';
import Loading from '../../../../assets/load.svg';
import SearchableDropdown from "../../../common/SearchableDropdown";

function StaffHodManage() {

	const API_URL = "http://localhost:5000/api/hod";
	const apiUrl = process.env.REACT_APP_API_URL;
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [editingHod, setEditingHod] = useState(null);
	const [editForm, setEditForm] = useState({});
	const [deleteHod, setDeleteHod] = useState(null);
	const [addhod, setAddhod] = useState(false);
	const [newstaffId, setNewStaffId] = useState("");
	const [newhodName, setNewHodName] = useState("");
	const [newgraduate, setNewGraduate] = useState("");
	const [newcategory, setNewCategory] = useState("");
	const [newdeptName, setNewDeptName] = useState("");
	const [newDeptId, setNewDeptId] = useState("");
	const [staff, setStaff] = useState([]);
	const [depts, setDepts] = useState([])

	useEffect(() => {
		const fetchHods = async () => {
			try {
				const response = await axios.get(API_URL);
				const hods = Array.isArray(response.data)
					? response.data
					: response.data?.hods || [];
				const order = ["AIDED", "SFM", "SFW"];
				const sortedData = hods
					.filter(item => item && item.category)
					.sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category));
				setData(sortedData);
				setFilteredData(sortedData);
			} catch (err) {
				console.error("Error fetching HODs:", err);
				setError(err.message);
			} finally { setLoading(false) }
		}
		fetchHods();
	}, [API_URL]);

	useEffect(() => {
		const fetchHodDropDownValues = async () => {
			const response = await axios.get(`${apiUrl}/api/hodDropDownValues`);
			setStaff(response.data.uniqueStaffs)
			setDepts(response.data.uniqueDepts)
		}
		fetchHodDropDownValues();
	}, [])

	// console.log(depts)

	const handleSearch = (e) => {
		const searchText = e.target.value.toLowerCase();
		const filtered = data.filter(
			row =>
				row.staff_id.toLowerCase().includes(searchText) ||
				row.hod_name.toLowerCase().includes(searchText) ||
				row.category.toLowerCase().includes(searchText) ||
				row.dept_id.toLowerCase().includes(searchText) ||
				row.dept_name.toLowerCase().includes(searchText)
		);
		setFilteredData(filtered);
	};

	const handleDelete = (row) => { setDeleteHod(row) }

	const cancelDelete = () => setDeleteHod(null);

	const confirmDelete = async (deleteHod) => {
		try {
			await axios.delete(`${API_URL}/${deleteHod.staff_id}`, {
				data: {
					staff_id: deleteHod.staff_id,
					dept_id: deleteHod.dept_id,
					graduate: deleteHod.graduate,
					category: deleteHod.category,
				}
			});
			const updatedData = data.filter(row => !(
				row.staff_id === deleteHod.staff_id &&
				row.dept_id === deleteHod.dept_id &&
				row.category === deleteHod.category &&
				row.graduate === deleteHod.graduate
			));
			setData(updatedData);
			setFilteredData(updatedData);
			setDeleteHod(null);
			alert("Hod Deleted Successfully.");
		} catch (err) {
			alert("Failed to delete the record. Please try again.");
		}
	}

	const handleEditClick = (row) => {
		setEditingHod(row);
		setEditForm({ ...row });
	};

	const handleEditChange = (e) => {
		const { name, value } = e.target;
		setEditForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleEditSave = async () => {
		try {
			await axios.put(`${API_URL}/${editForm.staff_id}`, editForm);
			const updatedData = data.map(row =>
				row.staff_id === editForm.staff_id ? editForm : row
			);
			setData(updatedData);
			setFilteredData(updatedData);
			setEditingHod(null);
			alert("Record updated successfully.");
		} catch {
			alert("Failed to update the record. Please try again.");
		}
	};

	const handleAddHod = () => {
		setAddhod(true);
		setNewStaffId("");
		setNewHodName("");
		setNewGraduate("");
		setNewCategory("");
		setNewDeptName("");
		setNewDeptId("");
	}

	const handleNewHodSave = async () => {
		try {
			const newHodAdded = await axios.post(`${apiUrl}/api/newhodadded`, {
				staff_id: newstaffId,
				hod_name: newhodName,
				graduate: newgraduate,
				category: newcategory,
				dept_name: newdeptName,
				dept_id: newDeptId,
			});
			if (newHodAdded.data) {
				alert(newHodAdded.data.message);
				setAddhod(false);
				setData((prev) => [...prev, newHodAdded.data.newHod]);
				setFilteredData((prev) => [...prev, newHodAdded.data.newHod]);
			}
		} catch {
			alert("Error: Something went wrong while adding the new HOD");
			setAddhod(false);
		}
	}

	const handleStaffChange = (e) => {
		const selectedId = e.target.value;
		setNewStaffId(selectedId);
		const selectedStaff = staff.find(s => s.staff_id === selectedId);
		if (selectedStaff) { setNewHodName(selectedStaff.staff_name) 	}
	}

	if (loading) return (<div> <center> <img src={Loading} alt="Loading" className="img" /> </center> </div>)
	if (error) return <div>Error : {error}</div>;

	return (
		<div className="smsh-main">
			<span className="smsh-top-heading">HOD DETAILS</span>
			<div className="smsh-input-btn">
				<input
					className="smsh-search"
					type="text"
					placeholder="Search ..."
					onChange={handleSearch}
				/>
				<button className="smsm-save-btn" onClick={handleAddHod}>
					<FontAwesomeIcon icon={faPlus} className="smsm-icon" />
					<span>Add</span>
				</button>
			</div>
			{/* <div className="smsh-count">
				<span className="smsh-span"><b>Total Number of Heads : </b>{filteredData.length}</span>
			</div> */}
			<table className="smsh-table">
				<thead>
					<tr>
						<th>S No</th>
						<th>Category</th>
						<th>Dept Id</th>
						<th>Staff ID</th>
						<th>HOD / MID Name</th>
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
								<td>{row?.category || "-"}</td>
								<td>{row?.dept_id || "-"}</td>
								<td>{row?.staff_id || "-"}</td>
								<td>{row?.hod_name || "-"}</td>
								<td>{row?.dept_name || "-"}</td>
								<td className='staff-repo-action'>
									<button className="smsh-edit-btn" onClick={() => handleEditClick(row)}>
										<FontAwesomeIcon icon={faEdit} />
										<span>Edit</span>
									</button>
								</td>
								<td className='staff-repo-action'>
									<button className="smsh-delete-btn" onClick={() => handleDelete(row)}>
										<FontAwesomeIcon icon={faTrash} />
										<span>Delete</span>
									</button>
								</td>
							</tr>
						))
					) : (
						<tr><td colSpan="8">No Data Available.</td></tr>
					)}
				</tbody>
			</table>

			{/* Edit HOD Modal */}
			{editingHod && (
				<div className="smsh-overlay">
					<div className="smsh-edit">
						<div className="smsh-close-class">
							<span onClick={() => setEditingHod(null)} className="smsh-close">✖</span>
						</div>
						<h3>EDIT HOD</h3>
						<div className="smsh-form">
							<label className="smsh-edit-label">STAFF ID :</label>
							<input
								type="text"
								name="staff_id"
								className="smsh-edit-inputbox"
								value={editForm.staff_id || ""}
								readOnly
								disabled
							/>
						</div>
						<div className="smsh-form">
							<label className="smsh-edit-label">HOD NAME :</label>
							<input
								type="text"
								name="hod_name"
								value={editForm.hod_name || ""}
								onChange={handleEditChange}
								className="smsh-edit-inputbox"
							/>
						</div>
						<div className="smsh-edit-psw">
							<label className="smsm-edit-password">
								<label className="smsh-edit-label">GRADUATE :</label>
								<input
									type="text"
									name="graduate"
									value={editForm.graduate || ""}
									onChange={handleEditChange}
									className="smsh-edit-inputbox-psw"
								/>
							</label>
							<label className="smsm-edit-password">
								<label className="smsh-edit-label">DEPT ID :</label>
								<input
									type="text"
									name="dept_id"
									value={editForm.dept_id || ""}
									onChange={handleEditChange}
									className="smsh-edit-inputbox-psw"
								/>
							</label>
						</div>
						<div className="smsh-edit-psw">
							<label className="smsm-edit-password">
								<label className="smsh-edit-label">CATEGORY :</label>
								<input
									type="text"
									name="category"
									value={editForm.category || ""}
									onChange={handleEditChange}
									className="smsh-edit-inputbox-psw"
								/>
							</label>
							<label className="smsm-edit-password">
								<label className="smsh-edit-label">DEPT NAME :</label>
								<input
									type="text"
									name="dept_name"
									value={editForm.dept_name || ""}
									onChange={handleEditChange}
									className="smsh-edit-inputbox-psw"
								/>
							</label>
						</div>
						<div className="smsh-delete-btn-container">
							<button onClick={handleEditSave} className="smsm-add-save-btn">SAVE</button>
							<button onClick={() => setEditingHod(null)} className="smsm-save-edit-btn">CANCEL</button>
						</div>
					</div>
				</div>
			)}

			{/* Delete HOD Confirmation Modal */}
			{deleteHod && (
				<div className="smsh-overlay">
					<div className="smsh-delete">
						<div className="smsh-close-class">
							<span onClick={cancelDelete} className="smsh-close">✖</span>
						</div>
						<h3>CONFIRM DELETE</h3>
						<div className="smsh-del-div">
							<h4>STAFF ID : {deleteHod.staff_id}</h4>
							<h4>HOD NAME : {deleteHod.hod_name}</h4>
							<h4>DEPARTMENT NAME : {deleteHod.dept_name}</h4>
							<h4>CATEGORY : {deleteHod.category}</h4>
						</div>
						<div className="smshh-delete-btn-container">
							<button onClick={() => confirmDelete(deleteHod)} className="smsm-add-save-btn">DELETE</button>
							<button onClick={cancelDelete} className="smsm-save-edit-btn">CANCEL</button>
						</div>
					</div>
				</div>
			)}

			{/* Add HOD Modal */}
			{addhod && (
				<div className="smsh-overlay">
					<div className="smsh-edit">
						<div className="smsh-close-class">
							<span onClick={() => setAddhod(false)} className="smsh-close">✖</span>
						</div>
						<h3>ADD HOD</h3>

						{/* STAFF ID Searchable Dropdown */}
						<SearchableDropdown
							label="STAFF ID"
							options={staff}
							value={newstaffId ? `${newstaffId} - ${newhodName}` : ""}
							getOptionLabel={(s) => `${s.staff_id} - ${s.staff_name}`}
							onSelect={(selectedStaff) => {
								setNewStaffId(selectedStaff.staff_id);
								setNewHodName(selectedStaff.staff_name);
							}}
						/>

						{/* HOD NAME (auto) */}
						<div className="smsh-form">
							<label className="smsh-edit-label">HOD NAME :</label>
							<input
								type="text"
								name="hod_name"
								className="smsh-edit-inputbox"
								value={newhodName}
								onChange={(e) => setNewHodName(e.target.value)}
								readOnly
							/>
						</div>

						{/* GRADUATE Dropdown */}
						<div className="smsh-edit-psw">
							<label className="smsm-edit-password">
								<label className="smsh-edit-label">GRADUATE :</label>
								<select
									name="graduate"
									className="smsh-edit-inputbox-psw"
									value={newgraduate}
									onChange={(e) => setNewGraduate(e.target.value)}
								>
									<option value=''>Select</option>
									<option value='UG'>UG</option>
									<option value='PG'>PG</option>
								</select>
							</label>

							{/* DEPT ID Searchable Dropdown */}
							<SearchableDropdown
								label="DEPT ID"
								options={depts}
								value={newDeptId ? `${newDeptId} - ${newdeptName}` : ""}
								getOptionLabel={(d) => `${d.dept_id} - ${d.dept_name}`}
								onSelect={(selectedDept) => {
									setNewDeptId(selectedDept.dept_id);
									setNewDeptName(selectedDept.dept_name);
								}}
							/>
						</div>

						{/* CATEGORY Dropdown & DEPT NAME */}
						<div className="smsh-edit-psw">
							<label className="smsm-edit-password">
								<label className="smsh-edit-label">CATEGORY :</label>
								<select
									name="category"
									className="smsh-edit-inputbox-psw"
									value={newcategory}
									onChange={(e) => setNewCategory(e.target.value)}
								>
									<option value=''>Select</option>
									<option value='AIDED'>AIDED</option>
									<option value='SFM'>SFM</option>
									<option value='SFW'>SFW</option>
								</select>
							</label>

							<label className="smsm-edit-password">
								<label className="smsh-edit-label">DEPT NAME :</label>
								<input
									type="text"
									name="dept_name"
									className="smsh-edit-inputbox-psw"
									value={newdeptName}
									readOnly
								/>
							</label>
						</div>

						{/* Buttons */}
						<div className="smshhd-delete-btn-container">
							<button onClick={handleNewHodSave} className="smsm-add-save-btn">SAVE</button>
							<button onClick={() => setAddhod(false)} className="smsm-save-edit-btn">CANCEL</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default StaffHodManage;