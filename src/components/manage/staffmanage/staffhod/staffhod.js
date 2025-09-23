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
			alert("Hod has been deleted successfully.");
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
			alert("Hod has been modified successfully.");
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
				alert('Hod has been added successfully');
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
		if (selectedStaff) { setNewHodName(selectedStaff.staff_name) }
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

			{/* Staff Hod Table */}
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
									<button
										className="smsh-edit-btn"
										// onClick={() => handleEditClick(row)}
									>
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

			{/* Add HOD Modal */}
			{addhod && (
				<div className="smsh-overlay">
					<div className="smsh-edit">
						<div className="smsh-close-class">
							<span onClick={() => setAddhod(false)} className="smsh-close">✖</span>
						</div>
						<h3>ADD HOD</h3>

						{/* STAFF ID Dropdown */}
						<SearchableDropdown
							options={staff}
							value={newstaffId}
							getOptionLabel={(s) =>
								typeof s === "string" ? s : `${s.staff_id} - ${s.staff_name}`
							}
							onSelect={(s) => {
								if (typeof s === "string") {
									setNewStaffId(s);
									setNewHodName("");
								} else if (s) {
									setNewStaffId(s.staff_id);
									setNewHodName(s.staff_name);
								} else {
									setNewStaffId("");
									setNewHodName("");
								}
							}}
							placeholder="STAFF ID"
						/>

						{/* HOD NAME (auto-filled) */}
						<div className="smsh-form">
							<input
								type="text"
								name="hod_name"
								className="smsh-edit-inputbox"
								value={newhodName}
								placeholder="STAFF NAME"
								readOnly
							/>
						</div>

						{/* GRADUATE Dropdown */}
						<div className="smsh-edit-psw">
							<SearchableDropdown
								options={[{ value: "UG", label: "UG" }, { value: "PG", label: "PG" }]}
								value={newgraduate}
								getOptionLabel={(g) => (typeof g === "string" ? g : g.label)}
								onSelect={(g) => {
									if (typeof g === "string") setNewGraduate(g);
									else if (g) setNewGraduate(g.value);
									else setNewGraduate("");
								}}
								placeholder="GRADUATE"
							/>

							{/* DEPT ID Dropdown */}
							<SearchableDropdown
								options={depts}
								value={newDeptId}
								getOptionLabel={(d) =>
									typeof d === "string" ? d : `${d.dept_id} - ${d.dept_name}`
								}
								onSelect={(d) => {
									if (typeof d === "string") {
										setNewDeptId(d);
										setNewDeptName("");
									} else if (d) {
										setNewDeptId(d.dept_id);
										setNewDeptName(d.dept_name);
									} else {
										setNewDeptId("");
										setNewDeptName("");
									}
								}}
								placeholder="DEPT ID"
							/>
						</div>

						{/* CATEGORY Dropdown */}
						<div className="smsh-edit-psw">
							<label className="smsm-edit-password">
								<SearchableDropdown
									options={[
										{ value: "AIDED", label: "AIDED" },
										{ value: "SFM", label: "SFM" },
										{ value: "SFW", label: "SFW" },
									]}
									value={newcategory}
									getOptionLabel={(c) => (typeof c === "string" ? c : c.label)}
									onSelect={(c) => {
										if (typeof c === "string") setNewCategory(c);
										else if (c) setNewCategory(c.value);
										else setNewCategory("");
									}}
									placeholder="CATEGORY"
								/>
							</label>

							{/* DEPT NAME (auto-filled) */}
							<label className="smsm-edit-password">
								<input
									type="text"
									name="dept_name"
									className="smsh-edit-inputbox-psw"
									value={newdeptName}
									readOnly
									placeholder="DEPT NAME"
								/>
							</label>
						</div>

						{/* Buttons */}
						<div className="smst-delete-btn-container">
							<button onClick={handleNewHodSave} className="smsm-add-save-btn">
								SAVE
							</button>
							<button onClick={() => setAddhod(false)} className="smsm-save-edit-btn">
								CANCEL
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Edit HOD Modal */}
			{editingHod && (
				<div className="smsh-overlay">
					<div className="smsh-edit">
						<div className="smsh-close-class">
							<span onClick={() => setEditingHod(null)} className="smsh-close">✖</span>
						</div>
						<h3>EDIT HOD</h3>

						{/* STAFF ID Dropdown */}
						<SearchableDropdown
							options={staff}
							value={editForm.staff_id || ""}
							getOptionLabel={(s) =>
								typeof s === "string" ? s : `${s.staff_id} - ${s.staff_name}`
							}
							onSelect={(s) => {
								if (typeof s === "string") {
									setEditForm(prev => ({ ...prev, staff_id: s, hod_name: "" }));
								} else if (s) {
									setEditForm(prev => ({
										...prev,
										staff_id: s.staff_id,
										hod_name: s.staff_name
									}));
								} else {
									setEditForm(prev => ({ ...prev, staff_id: "", hod_name: "" }));
								}
							}}
							placeholder="STAFF ID"
						/>

						{/* HOD NAME (auto-filled) */}
						<div className="smsh-form">
							<input
								type="text"
								name="hod_name"
								className="smsh-edit-inputbox"
								value={editForm.hod_name || ""}
								placeholder="HOD NAME"
								readOnly
							/>
						</div>

						{/* GRADUATE & DEPT ID */}
						<div className="smsh-edit-psw">
							<SearchableDropdown
								options={[{ value: "UG", label: "UG" }, { value: "PG", label: "PG" }]}
								value={editForm.graduate || ""}
								getOptionLabel={(g) => (typeof g === "string" ? g : g.label)}
								onSelect={(g) => {
									if (typeof g === "string") setEditForm(prev => ({ ...prev, graduate: g }));
									else if (g) setEditForm(prev => ({ ...prev, graduate: g.value }));
									else setEditForm(prev => ({ ...prev, graduate: "" }));
								}}
								placeholder="GRADUATE"
							/>

							<SearchableDropdown
								options={depts}
								value={editForm.dept_id || ""}
								getOptionLabel={(d) =>
									typeof d === "string" ? d : `${d.dept_id} - ${d.dept_name}`
								}
								onSelect={(d) => {
									if (typeof d === "string") {
										setEditForm(prev => ({ ...prev, dept_id: d, dept_name: "" }));
									} else if (d) {
										setEditForm(prev => ({
											...prev,
											dept_id: d.dept_id,
											dept_name: d.dept_name
										}));
									} else {
										setEditForm(prev => ({ ...prev, dept_id: "", dept_name: "" }));
									}
								}}
								placeholder="DEPT ID"
							/>
						</div>

						{/* CATEGORY & DEPT NAME */}
						<div className="smsh-edit-psw">
							<SearchableDropdown
								options={[
									{ value: "AIDED", label: "AIDED" },
									{ value: "SFM", label: "SFM" },
									{ value: "SFW", label: "SFW" },
								]}
								value={editForm.category || ""}
								getOptionLabel={(c) => (typeof c === "string" ? c : c.label)}
								onSelect={(c) => {
									if (typeof c === "string") setEditForm(prev => ({ ...prev, category: c }));
									else if (c) setEditForm(prev => ({ ...prev, category: c.value }));
									else setEditForm(prev => ({ ...prev, category: "" }));
								}}
								placeholder="CATEGORY"
							/>

							<label className="smsm-edit-password">
								<input
									type="text"
									name="dept_name"
									className="smsh-edit-inputbox-psw"
									value={editForm.dept_name || ""}
									readOnly
									placeholder="DEPT NAME"
								/>
							</label>
						</div>

						{/* Buttons */}
						<div className="smst-delete-btn-container">
							<button onClick={handleEditSave} className="smsm-add-save-btn">
								SAVE
							</button>
							<button onClick={() => setEditingHod(null)} className="smsm-save-edit-btn">
								CANCEL
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Delete HOD Modal */}
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
		</div>
	)
}

export default StaffHodManage;