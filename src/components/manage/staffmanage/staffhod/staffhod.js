import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import './staffhod.css';
import Loading from '../../../../assets/load.svg'

const API_URL = "http://localhost:5000/api/hod";

function StaffHodManage() {
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [editingHod, setEditingHod] = useState(null);
	const [editForm, setEditForm] = useState({});
	// const [addForm, setaddForm] = useState({});

	const [deleteHod, setDeleteHod] = useState(null);
	const [deleteHodInfo, setDeleteHodInfo] = useState(false)
	const [addhod, setAddhod] = useState("");
	const apiUrl = process.env.REACT_APP_API_URL;

	const [newstaffId, setNewStaffId] = useState("");
	const [newhodName, setNewHodName] = useState("");
	const [newgraduate, setNewGraduate] = useState("");
	// const [newcourseId, setNewCourseId] = useState("");
	const [newcategory, setNewCategory] = useState("");
	const [newdeptName, setNewDeptName] = useState("");
	const [newDeptId, setNewDeptId] = useState("");
	useEffect(() => {
		axios.get(API_URL).then((response) => {
			const sortedData = response.data.sort((a, b) => {
				const order = ["AIDED", "SFM", "SFW"];
				return order.indexOf(a.category) - order.indexOf(b.category);
			});
			setData(sortedData);
			setFilteredData(sortedData);
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
			row.category.toLowerCase().includes(searchText) ||
			row.course_id.toLowerCase().includes(searchText) ||
			row.dept_name.toLowerCase().includes(searchText)
		);
		setFilteredData(filtered);
	};

	const handleDelete = (row) => {

		setDeleteHod(true)
		setDeleteHodInfo(row)
		// setDeleteHod(row);  // Set the HOD to delete
	};

	const staffEditClose = () => {
		setEditingHod(false);
		setAddhod(false);
	}


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

	// const handleAddChange = (e) =>{
	// 	const{name, value} = e.target;
	// 	setAddhod((prev) => ({ ...prev, [name]: value}));
	// 	console.log(addhod);
	// }
	const staffDeleteClose = () => {
		setDeleteHod(false);
	}
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
		<div><center><img src={Loading} alt="" className="img" /></center></div>
	}

	if (error) {
		return <div>Error : {error}</div>;
	}

	const handleAddHod = () => {
		setAddhod(true);
	}
	const handlenewHod = async () => {
		try {
			console.log(newstaffId,newhodName);
			const newHodAdded = await axios.post(`${apiUrl}/api/newhodadded`, {newstaffId,newhodName,newcategory,newDeptId,newdeptName,newgraduate	});
	
			if (newHodAdded.data) {
				alert(newHodAdded.data.message);
				setAddhod(false);
			}
		} catch (err) {
			console.error(err.response || err.message); // Log full error response
			alert("Error: Something went wrong while adding the new HOD");
			setAddhod(false);

		}
	};
	

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
				<div>
					<button className="smsh-save-btn" onClick={handleAddHod}><span>ADD</span><FontAwesomeIcon icon={faPlus} className="smsh-icon-add" /></button>
				</div>
			</div>



			<div className="smsh-count">
				<span className="smsh-span"><b>Total Number of Heads : </b>{filteredData.length}</span>
			</div>
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
								<td>{row.course_id}</td>
								<td>{row.staff_id}</td>
								<td>{row.hod_name}</td>
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
							<td colSpan="8">No Data Available.</td>
						</tr>
					)}
				</tbody>
			</table>

			{/* Edit Modal */}
			{editingHod && (

				<div className="smsh-overlay">
					<div className="smsh-edit">
						<div className="smsh-close-class">
							<span onClick={staffEditClose} className="smsh-close">✖</span>
						</div>
						<label className="smsh-edit-label">STAFF ID : </label>
						<input
							type="text"
							name="staff_id"
							className="smsh-edit-inputbox"
							value={editForm.staff_id}
							onChange={handleEditChange}
							readOnly
							disabled
						/>
						<label className="smsh-edit-label">HOD NAME: </label>
						<input
							type="text"
							name="hod_name"
							value={editForm.hod_name}
							onChange={handleEditChange}
							className="smsh-edit-inputbox"
						/>


						<div className="smsm-edit-psw">
							<label className="smsm-edit-password">
								<label className="smsh-edit-label">GRADUATE : </label>
								<input
									type="text"
									name="graduate"
									value={editForm.graduate}
									onChange={handleEditChange}
									className="smsh-edit-inputbox-psw"
								/>
							</label>
							<label className="smsm-edit-password">
								<label className="smsh-edit-label">DEPT ID : </label>								<input
									type="text"
									name="course_id"
									value={editForm.course_id}
									onChange={handleEditChange}
									className="smsh-edit-inputbox-psw"
								/>
							</label>
						</div>

						<div className="smsm-edit-psw">
							<label className="smsm-edit-password">
								<label className="smsh-edit-label">CATEGORY : </label>								<input
									type="text"
									name="category"
									value={editForm.category}
									onChange={handleEditChange}
									className="smsh-edit-inputbox-psw"
								/>
							</label>
							<label className="smsm-edit-password">
								<label className="smsh-edit-label">DEPT NAME : </label>								<input
									type="text"
									name="dept_name"
									value={editForm.dept_name}
									onChange={handleEditChange}
									className="smsh-edit-inputbox-psw"
								/>
							</label>
						</div>
						<div className="smsh-delete-btn-container">
							<button onClick={handleEditSave} className="smsh-add-save-btn">Save</button>
							<button onClick={() => setEditingHod(null)} className="smsh-save-edit-btn">Cancel</button>
						</div>
					</div>
				</div>
				// <div className="modal">
				// 	<div className="modal-content">
				// 		<h2>Edit HOD Details</h2>

				// 		<div className="modal-buttons">
				// 			<button onClick={handleEditSave} style={{ backgroundColor: "#4CAF50", color: "white" }}>Save</button>
				// 			<button onClick={() => setEditingHod(null)} style={{ backgroundColor: "#f44336", color: "white" }}>Cancel</button>
				// 		</div>
				// 	</div>
				// </div>
			)}

			{/* Delete Confirmation Modal */}
			{deleteHod && (
				<div className="smsh-overlay">
					<div className="smsh-delete">
						<div className="smsh-close-class">
							<span onClick={staffDeleteClose} className="smsh-close">✖</span>
						</div>
						<h4>STAFF ID : {deleteHodInfo.staff_id}</h4>
						<h4>HOD NAME : {deleteHodInfo.hod_name}</h4>
						<h4>DEPARTMENT NAME : {deleteHodInfo.dept_name}</h4>
						<h4>CATEGORY : {deleteHodInfo.category}</h4>
						<div className="smsh-delete-btn-container">
							<button onClick={() => confirmDelete(deleteHodInfo.staff_id)} className="smsh-save-edit-btn">DELETE</button>
							<button onClick={cancelDelete} className="smsh-add-save-btn">CANCEL</button>
						</div>
					</div>
				</div>

				// <div className="modal">
				// 	<div className="modal-content">
				// 		<p><b></p>
				// 		<p><b></p>
				// 		<p><b>Category:</b> {deleteHodInfo.category}</p>
				// 		<p><b></p>
				// 		<div className="modal-buttons">
				// 			
				// 		</div>
				// 	</div>
				// </div>
			)}
			{addhod && (

				<div className="smsh-overlay">
					<div className="smsh-edit">
						<div className="smsh-close-class">
							<span onClick={staffEditClose} className="smsh-close">✖</span>
						</div>
						<label className="smsh-edit-label">STAFF ID : </label>
						<input
							type="text"
							name="staff_id"
							className="smsh-edit-inputbox"
							onChange={(e)=>setNewStaffId(e.target.value)}
						/>
						<label className="smsh-edit-label">HOD NAME: </label>
						<input
							type="text"
							name="hod_name"

							onChange={(e)=>setNewHodName(e.target.value)}
							className="smsh-edit-inputbox"
						/>


						<div className="smsm-edit-psw">
							<label className="smsm-edit-password">
								<label className="smsh-edit-label">GRADUATE : </label>
								<input
									type="text"
									name="graduate"
									onChange={(e)=>setNewGraduate(e.target.value)}
									className="smsh-edit-inputbox-psw"
								/>
							</label>
							<label className="smsm-edit-password">
								<label className="smsh-edit-label">DEPT ID : </label>								
								<input
									type="text"
									name="course_id"
									onChange={(e)=>setNewDeptId(e.target.value)}
									className="smsh-edit-inputbox-psw"
								/>
							</label>
						</div>

						<div className="smsm-edit-psw">
							<label className="smsm-edit-password">
								<label className="smsh-edit-label">CATEGORY : </label>								<input
									type="text"
									name="category"
									onChange={(e)=>setNewCategory(e.target.value)}
									className="smsh-edit-inputbox-psw"
								/>
							</label>
							<label className="smsm-edit-password">
								<label className="smsh-edit-label">DEPT NAME : </label>								<input
									type="text"
									name="dept_name"
									onChange={(e)=>setNewDeptName(e.target.value)}
									className="smsh-edit-inputbox-psw"
								/>
							</label>
						</div>
						<div className="smsh-delete-btn-container">
							<button onClick={handlenewHod} className="smsh-add-save-btn">SAVE</button>
							<button onClick={() => setAddhod(false)} className="smsh-save-edit-btn">CANCEL</button>
						</div>
					</div>
				</div>
				// <div className="modal">
				// 	<div className="modal-content">
				// 		<h2>Edit HOD Details</h2>

				// 		<div className="modal-buttons">
				// 			<button onClick={handleEditSave} style={{ backgroundColor: "#4CAF50", color: "white" }}>Save</button>
				// 			<button onClick={() => setEditingHod(null)} style={{ backgroundColor: "#f44336", color: "white" }}>Cancel</button>
				// 		</div>
				// 	</div>
				// </div>
			)}
		</div>
	);
}

export default StaffHodManage;
