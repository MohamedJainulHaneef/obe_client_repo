import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './staffcoursemanage.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

function StaffManage() {
	const apiUrl = process.env.REACT_APP_API_URL;
	const [staffData, setStaffData] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
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
				alert("Staff course entry deleted successfully!");
			}
		} catch (error) {
			console.error("Error deleting staff course:", error);
			alert("Failed to delete staff course. Please try again.");
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
					<button className="scm-save-btn" ><span>ADD</span><FontAwesomeIcon icon={faPlus} className="smst-icon-add" /></button>
				</div>
			</div>

			<table className="scm-table">
				<thead>
					<tr>
						<th className="scm-header" rowSpan={2}>
							S No
						</th>
						<th className="scm-header" colSpan={2}>
							Staff ID
						</th>
						<th className="scm-header">Category</th>
						<th className="scm-header">Section</th>
						<th className="scm-header">Course ID</th>
						<th className="scm-header">Course Code</th>
						<th className="scm-header" rowSpan={2}>
							Edit
						</th>
						<th className="scm-header" rowSpan={2}>
							Delete
						</th>
					</tr>
					<tr>
						<th className="scm-header" colSpan={2}>
							Staff Name
						</th>
						<th className="scm-header" colSpan={4}>
							Course Title
						</th>
					</tr>
				</thead>
				<tbody>
					{filteredStaffData.map((staff, index) => (
						<React.Fragment key={index}>
							{/* Row 1 */}
							<tr key={index} className={index % 2 === 0 ? 'scm-light' : 'scm-dark'}>
								<td className="scm-data" rowSpan={2}>
									{index + 1}
								</td>
								<td className="scm-data" colSpan={2}>
									{staff.staff_id}
								</td>

								<td className="scm-data">{staff.category}</td>
								<td className="scm-data">{staff.section}</td>
								<td className="scm-data">{staff.course_id}</td>
								<td className="scm-data">{staff.course_code}</td>
								<td className="scm-data" rowSpan={2}>
									<button className="scm-edit-btn">
										<span className="scm-edit-btn">
											Edit &nbsp;
											<FontAwesomeIcon icon={faEdit} className="scm-icon" />
										</span>
									</button>
								</td>
								<td className="scm-data" rowSpan={2}>
									<button
										onClick={() =>
											handleDeleteStaff(
												staff.staff_id,
												staff.course_code,
												staff.category,
												staff.section
											)
										}
										className="scm-del-btn"
									>
										<span className="scm-del-btn">
											Delete &nbsp;
											<FontAwesomeIcon icon={faTrash} className="scm-icon" />
										</span>
									</button>
								</td>
							</tr>
							{/* Row 2 */}
							<tr key={index} className={index % 2 === 0 ? 'scm-light' : 'scm-dark'}>
								<td className="scm-data" colSpan={2}>
									{staff.staff_name}
								</td>
								<td className="scm-data" colSpan={4}>
									{staff.course_title}
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
		</div>
	);
}

export default StaffManage;
