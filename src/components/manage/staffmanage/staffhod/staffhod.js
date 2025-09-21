import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import './staffhod.css';
import Loading from '../../../../assets/load.svg';


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

	useEffect(() => {
		axios.get(API_URL)
			.then((response) => {
				const sortedData = response.data.sort((a, b) => {
					const order = ["AIDED", "SFM", "SFW"];
					return order.indexOf(a.category) - order.indexOf(b.category);
				});
				setData(sortedData);
				setFilteredData(sortedData);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

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

	const handleDelete = (row) => {
		setDeleteHod(row);
	};

	const cancelDelete = () => setDeleteHod(null);

	const confirmDelete = async (id, dept_id) => {
		try {
			await axios.delete(`${API_URL}/${id}`, { data: { id, dept_id } });
			const updatedData = data.filter(row => row.staff_id !== id);
			setData(updatedData);
			setFilteredData(updatedData);
			setDeleteHod(null);
			alert("Record Deleted Successfully.");
		} catch (err) {
			alert("Failed to delete the record. Please try again.");
		}
	};

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
	};

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
	};

	if (loading)
		return (
			<div>
				<center>
					<img src={Loading} alt="Loading" className="img" />
				</center>
			</div>
		);

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
								<td>{row.category}</td>
								<td>{row.dept_id}</td>
								<td>{row.staff_id}</td>
								<td>{row.hod_name}</td>
								<td>{row.dept_name}</td>
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
						<div className="smshh-delete-btn-container">
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
							<button onClick={() => confirmDelete(deleteHod.staff_id, deleteHod.dept_id)} className="smsm-add-save-btn">DELETE</button>
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
						<div className="smsh-form">
							<label className="smsh-edit-label">STAFF ID :</label>
							<input
								type="text"
								name="staff_id"
								className="smsh-edit-inputbox"
								value={newstaffId}
								onChange={(e) => setNewStaffId(e.target.value)}
							/>
						</div>
						<div className="smsh-form">
							<label className="smsh-edit-label">HOD NAME :</label>
							<input
								type="text"
								name="hod_name"
								className="smsh-edit-inputbox"
								value={newhodName}
								onChange={(e) => setNewHodName(e.target.value)}
							/>
						</div>
						<div className="smsm-edit-psw">
							<label className="smsm-edit-password">
								<label className="smsh-edit-label">GRADUATE :</label>
								<input
									type="text"
									name="graduate"
									className="smsh-edit-inputbox-psw"
									value={newgraduate}
									onChange={(e) => setNewGraduate(e.target.value)}
								/>
							</label>
							<label className="smsm-edit-password">
								<label className="smsh-edit-label">DEPT ID :</label>
								<input
									type="text"
									name="dept_id"
									className="smsh-edit-inputbox-psw"
									value={newDeptId}
									onChange={(e) => setNewDeptId(e.target.value)}
								/>
							</label>
						</div>
						<div className="smsm-edit-psw">
							<label className="smsm-edit-password">
								<label className="smsh-edit-label">CATEGORY :</label>
								<input
									type="text"
									name="category"
									className="smsh-edit-inputbox-psw"
									value={newcategory}
									onChange={(e) => setNewCategory(e.target.value)}
								/>
							</label>
							<label className="smsm-edit-password">
								<label className="smsh-edit-label">DEPT NAME :</label>
								<input
									type="text"
									name="dept_name"
									className="smsh-edit-inputbox-psw"
									value={newdeptName}
									onChange={(e) => setNewDeptName(e.target.value)}
								/>
							</label>
						</div>
						<div className="smshh-delete-btn-container">
							<button onClick={handleNewHodSave} className="smsm-add-save-btn">SAVE</button>
							<button onClick={() => setAddhod(false)} className="smsm-save-edit-btn">CANCEL</button>
						</div>
					</div>
				</div>
			)}

		</div>
	);
}

export default StaffHodManage;