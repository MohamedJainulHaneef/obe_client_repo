import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './staffcoursemanage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

function StaffManage() {
	const apiUrl = process.env.REACT_APP_API_URL;
	const [staffData, setStaffData] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [deleteCourseMap, setDeleteCourseMap] = useState(null);
	const [deleteCourseMapInfo, setDeleteCourseMapInfo] = useState(false)
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
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [staffToEdit, setStaffToEdit] = useState({
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

	const openEditModal = (staff) => {
		setStaffToEdit(staff);  // Populate the modal with the staff data to be edited
		setIsEditModalOpen(true);
	};

	const handleEditInputChange = (e) => {
		const { name, value } = e.target;
		setStaffToEdit((prev) => ({ ...prev, [name]: value }));
	};

	const handleSaveEditedStaff = async () => {
		try {
			const response = await axios.put(`${apiUrl}/api/editstaff`, staffToEdit);

			if (response.status === 200) {
				setStaffData((prev) =>
					prev.map((staff) =>
						staff.staff_id === staffToEdit.staff_id && staff.course_code === staffToEdit.course_code && staff.section === staffToEdit.section
							? { ...staff, ...staffToEdit }
							: staff
					)
				);
				alert('Staff updated successfully!');
			}
			closeEditModal();
		} catch (error) {
			console.error('Error updating staff:', error);
			alert('Failed to update staff. Please try again.');
		}
	};

	const closeEditModal = () => {
		setIsEditModalOpen(false);
		setStaffToEdit({
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

	const handleDeleteModel = (staff) => {
		setDeleteCourseMap(true);
		setDeleteCourseMapInfo(staff)
		console.log(deleteCourseMapInfo)
	}

	const staffDeleteClose = () => {
		setDeleteCourseMap(false);
	}
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
				alert("Staff Course Entry Deleted Successfully!");
				setDeleteCourseMap(false);
			}
		} catch (error) {
			console.error("Error Deleting Staff Course:", error);
			alert("Failed to Delete Staff Course");
		}
	};

	return (
		<div className="scm-manage">
			<span className="scm-top-heading">STAFF COURSE MANAGE</span>
			<div className="scm-input-btn">
				<input className="scm-search"
					type="text"
					placeholder="Search by Name or Staff Id..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<div>
					{/* onClick={openAddModal} */}
					<button className="scm-save-btn" ><span>ADD</span><FontAwesomeIcon icon={faPlus} className="smst-icon-add" /></button>
				</div>
			</div>

			<table className="scm-table">
				<thead>
					<tr>
						<th className="scm-header">S No</th>
						<th className="scm-header" >Staff ID</th>
						<th className="scm-header">Staff Name</th>
						<th className="scm-header">Category</th>
						<th className="scm-header">Section</th>
						<th className="scm-header">Course ID</th>
						<th className="scm-header">Course Code</th>
						<th className="scm-header" >Course Title</th>
						<th className="scm-header">Edit</th>
						<th className="scm-header">Delete</th>
					</tr>
					<tr>
						
					</tr>
				</thead>
				<tbody>
					{filteredStaffData.map((staff, index) => (
						<React.Fragment key={index}>
							{/* Row 1 */}
							<tr key={index} className={index % 2 === 0 ? 'scm-light' : 'scm-dark'}>
								<td className="scm-data" >
									{index + 1}
								</td>
								<td className="scm-data" >
									{staff.staff_id}
								</td>
								<td className="scm-data" >
									{staff.staff_name}
								</td>
								<td className="scm-data">{staff.category}</td>
								<td className="scm-data">{staff.section}</td>
								<td className="scm-data">{staff.course_id}</td>
								<td className="scm-data">{staff.course_code}</td>
								
								<td className="scm-data" >
									{staff.course_title}
								</td>
								<td className="scm-data">
									<button className="scm-edit-btn">
										<span className="scm-edit-btn">
											Edit &nbsp;
											<FontAwesomeIcon icon={faEdit} className="scm-icon" />
										</span>
									</button>
								</td>
								<td className="scm-data" >
									<button
										
										onClick={() => handleDeleteModel(staff)}
										className="scm-del-btn"
									>
										<span className="scm-del-btn">
											Delete &nbsp;
											<FontAwesomeIcon icon={faTrash} className="scm-icon" />
										</span>
									</button>
								</td>
							</tr>
						</React.Fragment>
					))}
				</tbody>
			</table>
			{/* Add Staff Modal */}
			{isAddModalOpen && (
				<div className="scm-modal-overlay">
					<div className="scm-modal-content">
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
						<div className='scm-scm-save'>
							<button onClick={handleSaveStaff} className='scm-save-btn'>Save</button>
							<button onClick={closeAddModal} className='scm-save-btn'>Cancel</button>
						</div>
					</div>
				</div>
			)}

			{isEditModalOpen && (
				<div className="scm-modal-overlay">
					<div className="scm-modal-content">
						<h3>Edit Staff</h3>
						<input
							type="text"
							name="staff_id"
							placeholder="Staff ID"
							value={staffToEdit.staff_id}
							onChange={handleEditInputChange}
						/>
						<input
							type="text"
							name="staff_name"
							placeholder="Staff Name"
							value={staffToEdit.staff_name}
							onChange={handleEditInputChange}
						/>
						<input
							type="text"
							name="category"
							placeholder="Category"
							value={staffToEdit.category}
							onChange={handleEditInputChange}
						/>
						<input
							type="text"
							name="section"
							placeholder="Section"
							value={staffToEdit.section}
							onChange={handleEditInputChange}
						/>
						<input
							type="text"
							name="course_id"
							placeholder="Course ID"
							value={staffToEdit.course_id}
							onChange={handleEditInputChange}
						/>
						<input
							type="text"
							name="course_code"
							placeholder="Course Code"
							value={staffToEdit.course_code}
							onChange={handleEditInputChange}
						/>
						<input
							type="text"
							name="course_title"
							placeholder="Course Title"
							value={staffToEdit.course_title}
							onChange={handleEditInputChange}
						/>
						<input
							type="text"
							name="batch"
							placeholder="Batch"
							value={staffToEdit.batch}
							onChange={handleEditInputChange}
						/>
						<input
							type="text"
							name="semester"
							placeholder="Semester"
							value={staffToEdit.semester}
							onChange={handleEditInputChange}
						/>
						<input
							type="text"
							name="degree"
							placeholder="Degree"
							value={staffToEdit.degree}
							onChange={handleEditInputChange}
						/>
						<input
							type="text"
							name="dept_name"
							placeholder="Dept Name"
							value={staffToEdit.dept_name}
							onChange={handleEditInputChange}
						/>
						<input
							type="text"
							name="active_sem"
							placeholder="Active Sem"
							value={staffToEdit.active_sem}
							onChange={handleEditInputChange}
						/>
						<div className="scm-scm-save">
							<button onClick={handleSaveEditedStaff} className="scm-save-btn">Save</button>
							<button onClick={closeEditModal} className="scm-save-btn">Cancel</button>
						</div>
					</div>
				</div>
			)}
			{deleteCourseMap && (
				<div className="scm-overlay">
					<div className="scm-delete">
						<div className="smsh-close-class">
							<span onClick={staffDeleteClose} className="smsh-close">✖</span>
						</div>
						<h4>STAFF ID : {deleteCourseMapInfo.staff_id}</h4>
						<h4>STAFF NAME : {deleteCourseMapInfo.staff_name}</h4>
						<h4>DEPT NAME : {deleteCourseMapInfo.dept_name}</h4>
						<h4>CATEGORY : {deleteCourseMapInfo.category}</h4>
						<h4>SECTION : {deleteCourseMapInfo.section}</h4>
						<h4>COURSE ID : {deleteCourseMapInfo.course_id}</h4>
						<h4>COURSE CODE : {deleteCourseMapInfo.course_code}</h4>
						{/* <h4>COURSE TITLE : {deleteCourseMapInfo.course_title}</h4> */}
						<div className="smsh-delete-btn-container">
							<button  onClick={() =>
											handleDeleteStaff(
												deleteCourseMapInfo.staff_id,
												deleteCourseMapInfo.course_code,
												deleteCourseMapInfo.category,
												deleteCourseMapInfo.section
											)
										}className="smsh-add-save-btn">DELETE</button>
							<button  onClick={staffDeleteClose} className="smsh-save-edit-btn">CANCEL</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default StaffManage;
























// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './staffcoursemanage.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

// function StaffManage() {
// 	const apiUrl = process.env.REACT_APP_API_URL;
// 	const [staffData, setStaffData] = useState([]);
// 	const [searchTerm, setSearchTerm] = useState('');
// 	const [deleteCourseMap, setDeleteCourseMap] = useState(null);
// 	const [deleteCourseMapInfo, setDeleteCourseMapInfo] = useState(false)
// 	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
// 	const [newStaff, setNewStaff] = useState({
// 		staff_id: '',
// 		staff_name: '',
// 		category: '',
// 		batch: '',
// 		section: '',
// 		course_id: '',
// 		degree: '',
// 		dept_name: '',
// 		semester: '',
// 		course_code: '',
// 		course_title: '',
// 		active_sem: ''
// 	});
// 	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// 	const [staffToEdit, setStaffToEdit] = useState({
// 		staff_id: '',
// 		staff_name: '',
// 		category: '',
// 		batch: '',
// 		section: '',
// 		course_id: '',
// 		degree: '',
// 		dept_name: '',
// 		semester: '',
// 		course_code: '',
// 		course_title: '',
// 		active_sem: ''
// 	});


// 	useEffect(() => {
// 		const fetchStaffDetails = async () => {
// 			try {
// 				const response = await axios.get(`${apiUrl}/api/staffcoursemanage`);
// 				setStaffData(response.data);
// 			} catch (error) {
// 				console.error('Error fetching staff data', error);
// 			}
// 		};
// 		fetchStaffDetails();
// 	}, [apiUrl]);

// 	const filteredStaffData = staffData.filter((staff) =>
// 		(staff.staff_id?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
// 		(staff.staff_name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
// 	);

// 	// Add Staff Modal Handlers
// 	const openAddModal = () => setIsAddModalOpen(true);
// 	const closeAddModal = () => {
// 		setIsAddModalOpen(false);
// 		setNewStaff({
// 			staff_id: '',
// 			staff_name: '',
// 			category: '',
// 			batch: '',
// 			section: '',
// 			course_id: '',
// 			degree: '',
// 			dept_name: '',
// 			semester: '',
// 			course_code: '',
// 			course_title: '',
// 			active_sem: ''
// 		});
// 	};

// 	const handleAddInputChange = (e) => {
// 		const { name, value } = e.target;
// 		setNewStaff((prev) => ({ ...prev, [name]: value }));
// 	};

// 	const handleSaveStaff = async () => {
// 		try {
// 			const response = await axios.post(`${apiUrl}/api/addstaff`, newStaff);

// 			if (response.status === 201) {
// 				setStaffData((prev) => [...prev, response.data.staff]); // Update local state
// 				alert('Staff added successfully!');
// 			}
// 			closeAddModal();
// 		} catch (error) {
// 			console.error('Error adding staff:', error);
// 			alert('Failed to add staff. Please try again.');
// 		}
// 	};

// 	const openEditModal = (staff) => {
// 		setStaffToEdit(staff);  // Populate the modal with the staff data to be edited
// 		setIsEditModalOpen(true);
// 	};

// 	const handleEditInputChange = (e) => {
// 		const { name, value } = e.target;
// 		setStaffToEdit((prev) => ({ ...prev, [name]: value }));
// 	};

// 	const handleSaveEditedStaff = async () => {
// 		try {
// 			const response = await axios.put(`${apiUrl}/api/editstaff`, staffToEdit);

// 			if (response.status === 200) {
// 				setStaffData((prev) =>
// 					prev.map((staff) =>
// 						staff.staff_id === staffToEdit.staff_id && staff.course_code === staffToEdit.course_code && staff.section === staffToEdit.section
// 							? { ...staff, ...staffToEdit }
// 							: staff
// 					)
// 				);
// 				alert('Staff updated successfully!');
// 			}
// 			closeEditModal();
// 		} catch (error) {
// 			console.error('Error updating staff:', error);
// 			alert('Failed to update staff. Please try again.');
// 		}
// 	};

// 	const closeEditModal = () => {
// 		setIsEditModalOpen(false);
// 		setStaffToEdit({
// 			staff_id: '',
// 			staff_name: '',
// 			category: '',
// 			batch: '',
// 			section: '',
// 			course_id: '',
// 			degree: '',
// 			dept_name: '',
// 			semester: '',
// 			course_code: '',
// 			course_title: '',
// 			active_sem: ''
// 		});
// 	};

// 	const handleDeleteModel = (staff) => {
// 		setDeleteCourseMap(true);
// 		setDeleteCourseMapInfo(staff)
// 		console.log(deleteCourseMapInfo)
// 	}

// 	const staffDeleteClose = () => {
// 		setDeleteCourseMap(false);
// 	}
// 	const handleDeleteStaff = async (staffId, courseCode, category, section, courseId) => {
// 		try {
// 			const response = await axios.delete(`${apiUrl}/api/deletestaff`, {
// 				params: {
// 					staff_id: staffId,
// 					course_code: courseCode,
// 					category: category,
// 					section: section
// 				},
// 			});

// 			if (response.status === 200) {
// 				setStaffData((prev) =>
// 					prev.filter(
// 						(staff) =>
// 							!(
// 								staff.staff_id === staffId &&
// 								staff.course_code === courseCode &&
// 								staff.category === category &&
// 								staff.section === section
// 							)
// 					)
// 				);
// 				alert("Staff Course Entry Deleted Successfully!");
// 				setDeleteCourseMap(false);
// 			}
// 		} catch (error) {
// 			console.error("Error Deleting Staff Course:", error);
// 			alert("Failed to Delete Staff Course");
// 		}
// 	};

// 	return (
// 		<div className="scm-manage">
// 			<span className="scm-top-heading">STAFF COURSE MANAGE</span>
// 			<div className="scm-input-btn">
// 				<input className="scm-search"
// 					type="text"
// 					placeholder="Search by Name or Staff Id..."
// 					value={searchTerm}
// 					onChange={(e) => setSearchTerm(e.target.value)}
// 				/>
// 				<div>
// 					{/* onClick={openAddModal} */}
// 					<button className="scm-save-btn" ><span>ADD</span><FontAwesomeIcon icon={faPlus} className="smst-icon-add" /></button>
// 				</div>
// 			</div>

// 			<table className="scm-table">
// 				<thead>
// 					<tr>
// 						<th className="scm-header" rowSpan={2}>
// 							S No
// 						</th>
// 						<th className="scm-header" colSpan={2}>
// 							Staff ID
// 						</th>
// 						<th className="scm-header">Category</th>
// 						<th className="scm-header">Section</th>
// 						<th className="scm-header">Course ID</th>
// 						<th className="scm-header">Course Code</th>
// 						<th className="scm-header" rowSpan={2}>
// 							Edit
// 						</th>
// 						<th className="scm-header" rowSpan={2}>
// 							Delete
// 						</th>
// 					</tr>
// 					<tr>
// 						<th className="scm-header" colSpan={2}>
// 							Staff Name
// 						</th>
// 						<th className="scm-header" colSpan={4}>
// 							Course Title
// 						</th>
// 					</tr>
// 				</thead>
// 				<tbody>
// 					{filteredStaffData.map((staff, index) => (
// 						<React.Fragment key={index}>
// 							{/* Row 1 */}
// 							<tr key={index} className={index % 2 === 0 ? 'scm-light' : 'scm-dark'}>
// 								<td className="scm-data" rowSpan={2}>
// 									{index + 1}
// 								</td>
// 								<td className="scm-data" colSpan={2}>
// 									{staff.staff_id}
// 								</td>

// 								<td className="scm-data">{staff.category}</td>
// 								<td className="scm-data">{staff.section}</td>
// 								<td className="scm-data">{staff.course_id}</td>
// 								<td className="scm-data">{staff.course_code}</td>
// 								<td className="scm-data" rowSpan={2}>
// 									<button className="scm-edit-btn">
// 										<span className="scm-edit-btn">
// 											Edit &nbsp;
// 											<FontAwesomeIcon icon={faEdit} className="scm-icon" />
// 										</span>
// 									</button>
// 								</td>
// 								<td className="scm-data" rowSpan={2}>
// 									<button
										
// 										onClick={() => handleDeleteModel(staff)}
// 										className="scm-del-btn"
// 									>
// 										<span className="scm-del-btn">
// 											Delete &nbsp;
// 											<FontAwesomeIcon icon={faTrash} className="scm-icon" />
// 										</span>
// 									</button>
// 								</td>
// 							</tr>
// 							{/* Row 2 */}
// 							<tr key={index} className={index % 2 === 0 ? 'scm-light' : 'scm-dark'}>
// 								<td className="scm-data" colSpan={2}>
// 									{staff.staff_name}
// 								</td>
// 								<td className="scm-data" colSpan={4}>
// 									{staff.course_title}
// 								</td>
// 							</tr>
// 						</React.Fragment>
// 					))}
// 				</tbody>
// 			</table>
// 			{/* Add Staff Modal */}
// 			{isAddModalOpen && (
// 				<div className="scm-modal-overlay">
// 					<div className="scm-modal-content">
// 						<h3>Add Staff</h3>
// 						<input
// 							type="text"
// 							name="staff_id"
// 							placeholder="Staff ID"
// 							value={newStaff.staff_id}
// 							onChange={handleAddInputChange}
// 						/>
// 						<input
// 							type="text"
// 							name="staff_name"
// 							placeholder="Staff Name"
// 							value={newStaff.staff_name}
// 							onChange={handleAddInputChange}
// 						/>
// 						<input
// 							type="text"
// 							name="category"
// 							placeholder="Category"
// 							value={newStaff.category}
// 							onChange={handleAddInputChange}
// 						/>
// 						<input
// 							type="text"
// 							name="section"
// 							placeholder="Section"
// 							value={newStaff.section}
// 							onChange={handleAddInputChange}
// 						/>
// 						<input
// 							type="text"
// 							name="course_id"
// 							placeholder="Course ID"
// 							value={newStaff.course_id}
// 							onChange={handleAddInputChange}
// 						/>
// 						<input
// 							type="text"
// 							name="course_code"
// 							placeholder="Course Code"
// 							value={newStaff.course_code}
// 							onChange={handleAddInputChange}
// 						/>
// 						<input
// 							type="text"
// 							name="course_title"
// 							placeholder="Course Title"
// 							value={newStaff.course_title}
// 							onChange={handleAddInputChange}
// 						/>
// 						<input
// 							type="text"
// 							name="batch"
// 							placeholder="Batch"
// 							value={newStaff.batch}
// 							onChange={handleAddInputChange}
// 						/>
// 						<input
// 							type="text"
// 							name="semester"
// 							placeholder="Semester"
// 							value={newStaff.semester}
// 							onChange={handleAddInputChange}
// 						/>
// 						<input
// 							type="text"
// 							name="degree"
// 							placeholder="Degree"
// 							value={newStaff.degree}
// 							onChange={handleAddInputChange}
// 						/>
// 						<input
// 							type="text"
// 							name="dept_name"
// 							placeholder="Dept Name"
// 							value={newStaff.dept_name}
// 							onChange={handleAddInputChange}
// 						/>
// 						<input
// 							type="text"
// 							name="active_sem"
// 							placeholder="Active Sem"
// 							value={newStaff.active_sem}
// 							onChange={handleAddInputChange}
// 						/>
// 						<div className='scm-scm-save'>
// 							<button onClick={handleSaveStaff} className='scm-save-btn'>Save</button>
// 							<button onClick={closeAddModal} className='scm-save-btn'>Cancel</button>
// 						</div>
// 					</div>
// 				</div>
// 			)}

// 			{isEditModalOpen && (
// 				<div className="scm-modal-overlay">
// 					<div className="scm-modal-content">
// 						<h3>Edit Staff</h3>
// 						<input
// 							type="text"
// 							name="staff_id"
// 							placeholder="Staff ID"
// 							value={staffToEdit.staff_id}
// 							onChange={handleEditInputChange}
// 						/>
// 						<input
// 							type="text"
// 							name="staff_name"
// 							placeholder="Staff Name"
// 							value={staffToEdit.staff_name}
// 							onChange={handleEditInputChange}
// 						/>
// 						<input
// 							type="text"
// 							name="category"
// 							placeholder="Category"
// 							value={staffToEdit.category}
// 							onChange={handleEditInputChange}
// 						/>
// 						<input
// 							type="text"
// 							name="section"
// 							placeholder="Section"
// 							value={staffToEdit.section}
// 							onChange={handleEditInputChange}
// 						/>
// 						<input
// 							type="text"
// 							name="course_id"
// 							placeholder="Course ID"
// 							value={staffToEdit.course_id}
// 							onChange={handleEditInputChange}
// 						/>
// 						<input
// 							type="text"
// 							name="course_code"
// 							placeholder="Course Code"
// 							value={staffToEdit.course_code}
// 							onChange={handleEditInputChange}
// 						/>
// 						<input
// 							type="text"
// 							name="course_title"
// 							placeholder="Course Title"
// 							value={staffToEdit.course_title}
// 							onChange={handleEditInputChange}
// 						/>
// 						<input
// 							type="text"
// 							name="batch"
// 							placeholder="Batch"
// 							value={staffToEdit.batch}
// 							onChange={handleEditInputChange}
// 						/>
// 						<input
// 							type="text"
// 							name="semester"
// 							placeholder="Semester"
// 							value={staffToEdit.semester}
// 							onChange={handleEditInputChange}
// 						/>
// 						<input
// 							type="text"
// 							name="degree"
// 							placeholder="Degree"
// 							value={staffToEdit.degree}
// 							onChange={handleEditInputChange}
// 						/>
// 						<input
// 							type="text"
// 							name="dept_name"
// 							placeholder="Dept Name"
// 							value={staffToEdit.dept_name}
// 							onChange={handleEditInputChange}
// 						/>
// 						<input
// 							type="text"
// 							name="active_sem"
// 							placeholder="Active Sem"
// 							value={staffToEdit.active_sem}
// 							onChange={handleEditInputChange}
// 						/>
// 						<div className="scm-scm-save">
// 							<button onClick={handleSaveEditedStaff} className="scm-save-btn">Save</button>
// 							<button onClick={closeEditModal} className="scm-save-btn">Cancel</button>
// 						</div>
// 					</div>
// 				</div>
// 			)}
// 			{deleteCourseMap && (
// 				<div className="scm-overlay">
// 					<div className="scm-delete">
// 						<div className="smsh-close-class">
// 							<span onClick={staffDeleteClose} className="smsh-close">✖</span>
// 						</div>
// 						<h4>STAFF ID : {deleteCourseMapInfo.staff_id}</h4>
// 						<h4>STAFF NAME : {deleteCourseMapInfo.staff_name}</h4>
// 						<h4>DEPT NAME : {deleteCourseMapInfo.dept_name}</h4>
// 						<h4>CATEGORY : {deleteCourseMapInfo.category}</h4>
// 						<h4>SECTION : {deleteCourseMapInfo.section}</h4>
// 						<h4>COURSE ID : {deleteCourseMapInfo.course_id}</h4>
// 						<h4>COURSE CODE : {deleteCourseMapInfo.course_code}</h4>
// 						{/* <h4>COURSE TITLE : {deleteCourseMapInfo.course_title}</h4> */}
// 						<div className="smsh-delete-btn-container">
// 							<button  onClick={() =>
// 											handleDeleteStaff(
// 												deleteCourseMapInfo.staff_id,
// 												deleteCourseMapInfo.course_code,
// 												deleteCourseMapInfo.category,
// 												deleteCourseMapInfo.section
// 											)
// 										}className="smsh-confirm-btn">Delete</button>
// 							<button  onClick={staffDeleteClose} className="smsh-cancel-btn">Cancel</button>
// 						</div>
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	);
// }

// export default StaffManage;

