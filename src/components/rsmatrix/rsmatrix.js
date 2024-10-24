import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './rsmatrix.css';

const apiUrl = process.env.REACT_APP_API_URL;

function Rsmatrix() {
    const { staffId } = useParams();
    const [activeSem, setActiveSem] = useState('');
    const [courseDetails, setCourseDetails] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [inputValues, setInputValues] = useState({}); // State for input values

    useEffect(() => {
        const fetchActiveSem = async () => {
            try {
                const response = await axios.post(`${apiUrl}/activesem`, {});
                setActiveSem(response.data.academic_year);
            } catch (err) {
                console.log('Error fetching active semester:', err);
            }
        };
        fetchActiveSem();
    }, []);

    useEffect(() => {
        const fetchCourseCodes = async () => {
            if (activeSem) {
                try {
                    const response = await axios.post(`${apiUrl}/coursecode`, {
                        staff_id: staffId,
                        academic_year: activeSem,
                    });
                    setCourseDetails(response.data);
                } catch (err) {
                    console.log('Error fetching course codes:', err);
                }
            }
        };
        fetchCourseCodes();
    }, [staffId, activeSem]);

    const handleCourseClick = (course) => {
        setSelectedCourse(course);
        setShowModal(true);
        // Initialize input values for the selected course
        setInputValues({}); 
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedCourse(null);
    };

    const handleInputChange = (co, index, value) => {
        // Update the input values for specific COs
        setInputValues((prev) => ({
            ...prev,
            [`${co}_${index}`]: value,
        }));
    };

    const handleSave = async () => {
        try {
            // Prepare data for saving
            const saveData = {
                course_code: selectedCourse.course_code,
                scores: inputValues,
            };
            alert('Data saved successfully!');
            closeModal(); // Close modal after saving
        } catch (err) {
            console.error('Error saving data:', err);
            alert('Failed to save data.');
        }
    };

    return (
        <div className="rsmatrix-main">
            {/* <h2>RELATIONSHIP MATRIX</h2> */}
            <div className="rsmatrix-parent">
                <div className="rsmatrix-top-div">
                    <span className="rsmatrix-label">Staff Id:</span> {staffId}
                </div>
                <div className="rsmatrix-container">
                    {courseDetails.length > 0 ? (
                        courseDetails.map((item, index) => (
                            <div
                                className="rsmatrix-box"
                                key={index}
                                onClick={() => handleCourseClick(item)} 
                            >
                                <strong>Course Code:</strong> {item.course_code}
                            </div>
                        ))
                    ) : (
                        <p className="no-course-codes">No Course Codes Found</p>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Relationship Matrix for {selectedCourse.course_code}</h2>
                        <table className='rs-table'>
                            <thead>
                                <tr>
                                    <th>Course Outcomes (COs)</th>
                                    <th>PO1</th>
                                    <th>PO2</th>
                                    <th>PO3</th>
                                    <th>PO4</th>
                                    <th>PO5</th>
                                    <th>PSO1</th>
                                    <th>PSO2</th>
                                    <th>PSO3</th>
                                    <th>PSO4</th>
                                    <th>PSO5</th>
                                    <th>Mean Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {['CO1', 'CO2', 'CO3', 'CO4', 'CO5'].map((co, idx) => (
                                    <tr key={idx}>
                                        <td>{co}</td>
                                        {Array.from({ length: 10 }).map((_, index) => (
                                            <td key={index} className="input-container">
                                                <input
                                                    type="number"
                                                    className="rsmatrix-input"
                                                    min="0"
                                                    max="5"
                                                    step="0.1"
                                                    value={inputValues[`${co}_${index}`] || ''}
                                                    onChange={(e) => handleInputChange(co, index, e.target.value)}
                                                />
                                            </td>
                                        ))}
                                        <td>
                                            <input type="number" className="rsmatrix-input" readOnly />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='rsmatrix-btn'>
                        <button className="save-modal" onClick={handleSave}>Save</button>
                        <button className="close-modal" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Rsmatrix;