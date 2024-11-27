import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './studentmanage.css';
import Loading from '../../../assets/load.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

function StudentManage() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [studata, setStudata] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for Delete modal
    const [newStudent, setNewStudent] = useState({ stu_name: '', reg_no: '', batch: '', mentor: '', emis: '' });
    const [editStudent, setEditStudent] = useState(null);
    const [studentToDelete, setStudentToDelete] = useState(null); // Store student for deletion
    const [loading, setLoading] = useState(true); // State to track loading

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [courseId, setCourseId] = useState([])
    const [selectedCourseId, setSelectedCourseId] = useState("");
    const [semester, setSemester] = useState([])
    const [selectedSemester, setSelectedSemester] = useState("");
    const [section, setSection] = useState([]);
    const [selectedSection, setSelectedSection] = useState("")
    const [courseCodes, setCourseCodes] = useState([]);
    const [selectedCourseCodes, setSelectedCourseCodes] = useState([]);


    //fetch course id based on the detailse

    const handleFetchCourse = async () => {
        try {
            const submit = {
                category: selectedCategory,
                courseId: selectedCourseId,
                semester: selectedSemester,
                section: selectedSection,
            };

            // Send the request to fetch course codes
            const response = await axios.post(`${apiUrl}/api/coursecode`, submit);

            console.log("Submission successful:", response.data);

            // Update the state with the fetched course codes
            setCourseCodes(response.data);
        } catch (error) {
            console.error("Error fetching course code:", error);
        }
    };







    // to fetch category

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/category`); // Changed POST to GET
                setCategories(response.data); // Assuming `response.data` contains an array
                // console.log('Fetched Categories:', response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategory();
    }, [apiUrl]);

    // to fetch course id

    const handleCategoryChange = async (value) => {
        setSelectedCategory(value);

        try {
            const response = await axios.post(`${apiUrl}/api/courseid`, {
                category: value, // Key must match what the backend expects
            });

            // Update the course ID state with the response data
            setCourseId(response.data);
            // console.log("Unique Course IDs:", response.data);

        } catch (error) {
            console.error("Error posting category:", error);
        }
    };

    //to fetch semester 

    const handleCourseIdChange = async (value) => {
        setSelectedCourseId(value);

        try {
            const response = await axios.post(`${apiUrl}/api/semester`, {
                category: selectedCategory, // Include the category
                courseId: value,           // Include the courseId
            });

            // console.log("Fetched Semesters:", response.data);

            // Update state with the fetched semesters
            setSemester(response.data);

        } catch (error) {
            console.error("Error fetching semesters:", error);
        }
    };

    //to fetch section

    const handleSemesterChange = async (value) => {
        setSelectedSemester(value); // Update selected semester state

        try {
            const response = await axios.post(`${apiUrl}/api/section`, {
                category: selectedCategory,  // Send selected category
                courseId: selectedCourseId,  // Send selected course ID
                semester: value,             // Send selected semester
            });

            // Update the state with fetched sections
            setSection(response.data);
            console.log("Fetched Sections:", response.data);

        } catch (error) {
            console.error("Error fetching sections:", error);
        }
    };

    const handleSectionChange = (value) => {
        setSelectedSection(value)

    };



    // To fetch all data 
    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/studetails`);
                setStudata(response.data);
            } catch (error) {
                console.error('Error fetching student details:', error);
            } finally {
                setLoading(false); // Hide spinner
            }
        };

        fetchStudentDetails();
    }, [apiUrl]);

    // Filter student data based on search term
    const filteredStudata = studata.filter((student) =>
        (student.stu_name?.toLowerCase() || '').includes(searchTerm.toLowerCase() || '') ||
        (student.reg_no?.toLowerCase() || '').includes(searchTerm.toLowerCase() || '')
    );

    // Add Student Handlers
    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => {
        setIsAddModalOpen(false);
        setNewStudent({
            stu_name: '',
            reg_no: '',
            course_id: '',
            category: '',
            semester: '',
            section: '',
            batch: ''
        });
    };

    const handleAddInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent((prev) => ({ ...prev, [name]: value }));
    };

    // Save the New Student

    const handleSaveStudent = async () => {
        try {
            // Prepare the payload
            const studentData = {
                stu_name: newStudent.stu_name,
                reg_no: newStudent.reg_no,
                batch: newStudent.batch,
                emis: newStudent.emis,
                section: selectedSection, // Use the selected value
                semester: selectedSemester, // Use the selected value
                mentor: newStudent.mentor,
                category: selectedCategory, // Use the selected value
                courseId: selectedCourseId, // Use the selected value
                courseCodes: selectedCourseCodes, // If multiple, send as an array
            };
            console.log(studentData)

            // Make the POST request
            const response = await axios.post(`${apiUrl}/api/addstudent`, studentData);

            // Optionally update state or provide feedback
            setStudata((prev) => [...prev, response.data]);
            closeAddModal();
            window.alert("New Student Successfully Added");

        } catch (error) {
            console.error("Error adding student:", error);
            window.alert("Failed to add the student. Please try again.");
        }
    };

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setSelectedCourseCodes((prevSelected) =>
            checked
                ? [...prevSelected, value]
                : prevSelected.filter((code) => code !== value)
        );
    };

    // Edit Student Handlers
    const openEditModal = (student) => {
        setEditStudent(student);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditStudent(null);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditStudent((prev) => ({ ...prev, [name]: value }));
    };

    // Save the Edited Student

    const handleSaveEditStudent = async () => {
        try {
            const response = await axios.put(`${apiUrl}/api/editstudent`, editStudent);
            setStudata((prev) =>
                prev.map((student) =>
                    student.reg_no === editStudent.reg_no ? response.data.student : student
                )
            );
            closeEditModal();
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    // Delete Handlers
    const openDeleteModal = (student) => {
        setStudentToDelete(student);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setStudentToDelete(null);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`${apiUrl}/api/deletestudent/${studentToDelete.reg_no}`);
            setStudata((prev) => prev.filter((student) => student.reg_no !== studentToDelete.reg_no));
            closeDeleteModal();
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    if (loading) {
        return (
            <div><center><img src={Loading} alt="Loading..." className="img" /></center></div>
        );
    }
    return (
        <div className="student-manage">
            <span className="scm-top-heading">STUDENT DETAILS</span>
            <div className="scm-input-btn">
                <input
                    className="scm-search"
                    type="text"
                    placeholder="Search by Name or Reg No ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div>

                    <button
                        className="scm-save-btn"
                    // onClick={openAddModal}
                    ><span>ADD</span><FontAwesomeIcon icon={faPlus} className="smst-icon-add" /></button>
                </div>
            </div>

            {/* Student Table */}
            <table className="student-table">
                <thead>
                    <tr>
                        <th className="student-header">No</th>
                        <th className="student-header">Reg No</th>
                        <th className="student-header">Category</th>
                        <th className="student-header">Name</th>
                        <th className="student-header">Id</th>
                        <th className="student-header">Batch</th>
                        <th className="student-header">Sem</th>
                        <th className="student-header">Sec</th>
                        <th className="student-header">Edit</th>
                        <th className="student-header">Delete</th>
                    </tr>
                </thead>
                <tbody>
    {filteredStudata.length > 0 ? (
        filteredStudata.map((student, index) => (
            <tr key={student.reg_no}>
                <td className="student-data">{index + 1}</td>
                <td className="student-data">{student.reg_no}</td>
                <td className="student-data">{student.category}</td>
                <td className="student-data-stu">{student.stu_name}</td>
                <td className="student-data">{student.course_id}</td>
                <td className="student-data">{student.batch}</td>
                <td className="student-data">{student.semester}</td>
                <td className="student-data">{student.section}</td>
                <td className="student-data">
                    <button className="scm-edit-btn">
                        <span className="sm-edit-btn">
                            Edit &nbsp;
                            <FontAwesomeIcon icon={faEdit} className="scm-icon" />
                        </span>
                    </button>
                </td>
                <td className="student-data">
                    <button className="scm-del-btn">
                        <span className="sc-del-btn">
                            Delete &nbsp;
                            <FontAwesomeIcon icon={faTrash} className="scm-icon" />
                        </span>
                    </button>
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="10" className="student-no-data">
                No data available.
            </td>
        </tr>
    )}
</tbody>

            </table>


            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && studentToDelete && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Confirm Delete</h3>
                        <p>Are you sure you want to delete the student with Registration Number <strong>{studentToDelete.reg_no}</strong>?</p>
                        <div className="modal-actions">
                            <button onClick={handleConfirmDelete} className="confirm-btn">Confirm</button>
                            <button onClick={closeDeleteModal} className="cancel-btn">Cancel</button>
                        </div>
                    </div>
                </div>
            )}


            {/* Add Student Modal */}
            {isAddModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Add Student</h3>
                        <input
                            type="text"
                            name="stu_name"
                            placeholder="Student Name"
                            value={newStudent.stu_name}
                            onChange={handleAddInputChange}
                        />
                        <input
                            type="text"
                            name="reg_no"
                            placeholder="Registration Number"
                            value={newStudent.reg_no}
                            onChange={handleAddInputChange}
                        />
                        <input
                            type="number"
                            name="batch"
                            placeholder="Batch"
                            value={newStudent.batch}
                            onChange={handleAddInputChange}
                        />
                        <input
                            type="text"
                            name="mentor"
                            placeholder="mentor"
                            value={newStudent.mentor}
                            onChange={handleAddInputChange}
                        />
                        <input
                            type="number"
                            name="emis"
                            placeholder="emis"
                            value={newStudent.emis}
                            onChange={handleAddInputChange}
                        />
                        <select className="aso-select" value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
                            <option className="aso-option" value="">Category</option>
                            {categories.map((category, index) => (
                                <option className="aso-option" key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        <select className="aso-select" value={selectedCourseId} onChange={(e) => handleCourseIdChange(e.target.value)}>
                            <option className="aso-option" value="">CourseID</option>
                            {courseId.map((course, index) => (
                                <option className="aso-option" key={index} value={course}>
                                    {course}
                                </option>
                            ))}
                        </select>
                        <select className="aso-select" value={selectedSemester} onChange={(e) => handleSemesterChange(e.target.value)}>
                            <option className="aso-option" value="">Semester</option>
                            {semester.map((sem, index) => (
                                <option className="aso-option" key={index} value={sem}>
                                    {sem}
                                </option>
                            ))}
                        </select>
                        <select className="aso-select" value={selectedSection} onChange={(e) => handleSectionChange(e.target.value)}>
                            <option className="aso-option" value="">Section</option>
                            {section.map((sec, index) => (
                                <option className="aso-option" key={index} value={sec}>
                                    {sec}
                                </option>
                            ))}
                        </select>
                        <button onClick={handleFetchCourse}>Get CourseId</button>

                        {/* Render checkboxes if course codes are available */}
                        {courseCodes.length > 0 && (
                            <div className="checkbox-container">
                                <h3>Select Course Codes:</h3>
                                <div className="checkbox-row">
                                    {courseCodes.map((courseCode, index) => (
                                        <div key={index} className="checkbox-item">
                                            <input
                                                type="checkbox"
                                                id={`course-${courseCode}`}
                                                value={courseCode}
                                                onChange={handleCheckboxChange}
                                                className="custom-checkbox"
                                            />
                                            <label htmlFor={`course-${courseCode}`} className="checkbox-label">
                                                {courseCode}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button onClick={handleSaveStudent}>Save</button>
                        <button onClick={closeAddModal}>Cancel</button>
                    </div>
                </div>
            )}

            {/* Edit Student Modal */}
            {isEditModalOpen && editStudent && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Edit Student</h3>
                        <input
                            type="text"
                            name="stu_name"
                            placeholder="Student Name"
                            value={editStudent.stu_name}
                            onChange={handleEditInputChange}
                        />
                        <input
                            type="text"
                            name="reg_no"
                            placeholder="Registration Number"
                            value={editStudent.reg_no}
                        // disabled // Prevent editing reg_no
                        />
                        <input
                            type="text"
                            name="category"
                            placeholder="Category"
                            value={editStudent.category}
                            onChange={handleEditInputChange}
                        />
                        <input
                            type="text"
                            name="section"
                            placeholder="Section"
                            value={editStudent.section}
                            onChange={handleEditInputChange}
                        />
                        <button onClick={handleSaveEditStudent}>Save</button>
                        <button onClick={closeEditModal}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StudentManage;