import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './staffcoursemanage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const Staffcoursemanage = () => 
{
	const apiUrl = process.env.REACT_APP_API_URL;
	const [staffData, setStaffData] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [deleteCourseMap, setDeleteCourseMap] = useState(null);
	const [deleteCourseMapInfo, setDeleteCourseMapInfo] = useState(false)
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [newStaff, setNewStaff] = useState({
		staff_id: '', staff_name: '', category: '', batch: '', section: '', dept_id: '',
		degree: '', dept_name: '', semester: '', course_code: '', course_title: '', active_sem: ''
	})
	const [staffId, setStaffId] = useState([])
	const [selectedStaffId, setSelectedStaffId] = useState("")
	const [staffName, setStaffName] = useState("")
	const [selectedCategory, setSelectedCategory] = useState("")
	const [deptId, setDeptId] = useState([])
	const [selectedDeptId, setSelectedDeptId] = useState("")
	const [deptName, setDeptName] = useState("");
	const [degree, setDegree] = useState("");
	const [semester, setSemester] = useState([])
	const [selectedSemester, setSelectedSemester] = useState("")


	//Fetch Staff Data
	useEffect(() => {
		const fetchStaffDetails = async () => {
			try {
				const response = await axios.get(`${apiUrl}/api/staffcoursemanage`);
				setStaffData(response.data);
			}
			catch (error) {
				console.error('Error Fetching Staff Data', error);
			}
		}
		fetchStaffDetails();
	}, [apiUrl]);

	//Search Filter
	const filteredStaffData = staffData.filter((staff) =>
		(staff.section?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
		(staff.dept_id?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
		(staff.course_title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
		(staff.staff_name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
	)

	//Delete Staff Modal
	const handleDeleteModel = (staff) => {
		setDeleteCourseMap(true);
		setDeleteCourseMapInfo(staff);
	}

	//Close Delete Modal
	const staffDeleteClose = () => {
		setDeleteCourseMap(false);
	}
	//Delete Staff
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
	}

	//Open Add Modal
	const openAddModal = () => setIsAddModalOpen(true);

	//Close Add Modal
	const closeAddModal = () => {
		setIsAddModalOpen(false);
		setNewStaff({
			staff_id: '', staff_name: '', category: '', batch: '', section: '', dept_id: '',
			degree: '', dept_name: '', semester: '', course_code: '', course_title: '', active_sem: ''
		})
	}

	//add staff input change
	const handleAddInputChange = (e) => {
		const { name, value } = e.target;
		setNewStaff((prev) => ({ ...prev, [name]: value }));
	}

	//Save New Staff
	const handleSaveStaff = async () => {
		alert('Staff Added Successfully!');
		console.log(newStaff);

	}

	//fetch Staff Id
	useEffect(() => {
		const fetchCategory = async () => {
			try {
				const response = await axios.get(`${apiUrl}/api/staffId`);
				setStaffId(response.data)
				// console.log(response.data);


			}
			catch (error) {
				console.log(error)
			}
		}
		fetchCategory()

	}, [])

	//fetch staff name
	const handleStaffIdChange = async (value) => {
		setSelectedStaffId(value)
		try {
			const response = await axios.post(`${apiUrl}/api/staffname`, {
				staff_id: value

			})
			setStaffName(response.data)
		}
		catch (error) {
			console.log(error);

		}
	}

	//fetch dept-id
	const handleCategoryChange = async (value) => {
		setSelectedCategory(value)
		try {
			const response = await axios.post(`${apiUrl}/api/depId`, {
				category: value,
			})
			setDeptId(response.data)

		}
		catch (error) {
			console.log(error);

		}


	}

	//fetch department Name
	const handleIdChange = async (value) => {
		setSelectedDeptId(value)
		try {
			const response = await axios.post(`${apiUrl}/api/departmentname`, {
				dept_id: value
			})

			setDeptName(response.data.uniqueDeptNames)
			setDegree(response.data.uniqueDegrees)
			setSemester(response.data.uniqueSemester)


		}
		catch (error) {
			console.log(error);

		}

	}

	//fetch section
	const handleSemChange = async (value) => {
		console.log(value);

		setSelectedSemester(value)
		try {
			const response = await axios.post(`${apiUrl}/api/scmsection`, {
				semester: value,
			})





		}
		catch (error) {
			console.log(error);

		}
	}






	return (
		<div className="scm-manage">
			<span className="scm-top-heading">STAFF COURSE MANAGE</span>
			<div className="scm-input-btn">
				<input className="scm-search"
					type="text"
					placeholder="Search..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<div>
					<button onClick={openAddModal} className="scm-save-btn" ><span>ADD</span><FontAwesomeIcon icon={faPlus} className="smst-icon-add" /></button>
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
				</thead>
				<tbody>
					{filteredStaffData.map((staff, index) => (
						<React.Fragment key={index}>
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
								<td className="scm-data">{staff.dept_id}</td>
								<td className="scm-data">{staff.course_code}</td>
								<td className="scm-data" >
									{staff.course_title}
								</td>
								<td className="scm-data">
									<button
										className="scm-edit-btn"
									// onClick={openEditModal}
									>
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

			{/* Delete Modal */}
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
						<h4>DEPT ID : {deleteCourseMapInfo.dept_id}</h4>
						<h4>COURSE CODE : {deleteCourseMapInfo.course_code}</h4>
						<div className="smsh-delete-btn-container">
							<button onClick={() =>
								handleDeleteStaff(
									deleteCourseMapInfo.staff_id,
									deleteCourseMapInfo.course_code,
									deleteCourseMapInfo.category,
									deleteCourseMapInfo.section
								)
							}
								className="smsh-add-save-btn">
								DELETE
							</button>
							<button onClick={staffDeleteClose} className="smsh-save-edit-btn">CANCEL</button>
						</div>
					</div>
				</div>
			)}

			{/* Add Modal */}
			{isAddModalOpen && (
				<div className="scm-modal-overlay">
					<div className="scm-modal-content">
						<h3>Add Staff</h3>

						<select
							name="staff_id"
							value={selectedStaffId}
							onChange={(e) => handleStaffIdChange(e.target.value)}
						>
							<option value="">Select Staff ID</option>
							{staffId.map((id) => (
								<option key={id} value={id}>
									{id}
								</option>
							))}
						</select>

						<input
							type="text"
							name="staff_name"
							placeholder="Staff Name"
							value={staffName}
							onChange={handleAddInputChange}
							disabled
						/>

						<select
							name="category"
							value={selectedCategory}
							onChange={(e) => handleCategoryChange(e.target.value)}
						>
							<option value="" disabled>Select Category</option>
							<option value="SFM">SFM</option>
							<option value="SFW">SFW</option>
							<option value="AIDED">AIDED</option>
						</select>
						<select
							name="dept_id"
							value={selectedDeptId}
							onChange={(e) => handleIdChange(e.target.value)}
							className="w-full p-2 mb-4 border border-gray-300 rounded-md"
						>
							<option value="" disabled>
								Select Department ID
							</option>
							{deptId.map((id) => (
								<option key={id} value={id}>
									{id}
								</option>
							))}
						</select>
						<input
							type="text"
							name="dept_name"
							placeholder="Dept Name"
							value={deptName}
							disabled
						/>
						<input
							type="text"
							name="degree"
							placeholder="Degree"
							value={degree}
							onChange={handleAddInputChange}
							disabled
						/>
						<select
							name="semester"
							value={selectedSemester}
							onChange={(e) => handleSemChange(e.target.value)}
						>
							<option value="">
								Select Semester
							</option>
							{semester.map((sem, index) => (
								<option key={index} value={sem}>
									{sem}
								</option>
							))}
						</select>

						<input
							type="text"
							name="section"
							placeholder="Section"
							// value={}
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

						<div className='scm-scm-save'>
							<button onClick={handleSaveStaff} className='scm-save-btn'>Save</button>
							<button onClick={closeAddModal} className='scm-save-btn'>Cancel</button>
						</div>
					</div>
				</div>
			)}
		</div >
	)
}

export default Staffcoursemanage