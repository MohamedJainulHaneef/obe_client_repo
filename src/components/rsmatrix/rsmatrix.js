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
    const [meanOverallScore, setMeanOverallScore] = useState(''); 
    const [correlation, setCorrelation] = useState('');

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

    const handleCourseClick = async (course) => {
        setSelectedCourse(course);
        setShowModal(true);
        try {
            const response = await axios.get(`${apiUrl}/api/rsmatrix/${course.course_code}`);
            const matrixData = response.data;
            setInputValues({
                CO1_0: matrixData.co1_po1,
                CO1_1: matrixData.co1_po2,
                CO1_2: matrixData.co1_po3,
                CO1_3: matrixData.co1_po4,
                CO1_4: matrixData.co1_po5,
                CO1_5: matrixData.co1_pso1,
                CO1_6: matrixData.co1_pso2,
                CO1_7: matrixData.co1_pso3,
                CO1_8: matrixData.co1_pso4,
                CO1_9: matrixData.co1_pso5,
                CO2_0: matrixData.co2_po1,
                CO2_1: matrixData.co2_po2,
                CO2_2: matrixData.co2_po3,
                CO2_3: matrixData.co2_po4,
                CO2_4: matrixData.co2_po5,
                CO2_5: matrixData.co2_pso1,
                CO2_6: matrixData.co2_pso2,
                CO2_7: matrixData.co2_pso3,
                CO2_8: matrixData.co2_pso4,
                CO2_9: matrixData.co2_pso5,
                CO3_0: matrixData.co3_po1,
                CO3_1: matrixData.co3_po2,
                CO3_2: matrixData.co3_po3,
                CO3_3: matrixData.co3_po4,
                CO3_4: matrixData.co3_po5,
                CO3_5: matrixData.co3_pso1,
                CO3_6: matrixData.co3_pso2,
                CO3_7: matrixData.co3_pso3,
                CO3_8: matrixData.co3_pso4,
                CO3_9: matrixData.co3_pso5,
                CO4_0: matrixData.co4_po1,
                CO4_1: matrixData.co4_po2,
                CO4_2: matrixData.co4_po3,
                CO4_3: matrixData.co4_po4,
                CO4_4: matrixData.co4_po5,
                CO4_5: matrixData.co4_pso1,
                CO4_6: matrixData.co4_pso2,
                CO4_7: matrixData.co4_pso3,
                CO4_8: matrixData.co4_pso4,
                CO4_9: matrixData.co4_pso5,
                CO5_0: matrixData.co5_po1,
                CO5_1: matrixData.co5_po2,
                CO5_2: matrixData.co5_po3,
                CO5_3: matrixData.co5_po4,
                CO5_4: matrixData.co5_po5,
                CO5_5: matrixData.co5_pso1,
                CO5_6: matrixData.co5_pso2,
                CO5_7: matrixData.co5_pso3,
                CO5_8: matrixData.co5_pso4,
                CO5_9: matrixData.co5_pso5,
            });
            setMeanOverallScore(response.data.mean);
            setCorrelation(matrixData.olrel);
            console.log('Data', matrixData)
        } catch (err) {
            console.log('Error fetching matrix data:', err);
        }
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
        // calculateSemPercentage()

    };
    const calculateMeanScore = () => {
        const newInputValues = { ...inputValues };
        let overallTotal = 0;
        let overallCount = 0;

        ['CO1', 'CO2', 'CO3', 'CO4', 'CO5'].forEach((co) => {
            let total = 0;
            let count = 0;

            for (let i = 0; i < 10; i++) {
                const value = parseFloat(inputValues[`${co}_${i}`]);
                if (!isNaN(value)) {
                    total += value;
                    count += 1;
                }
            }

            const meanScore = count > 0 ? (total / count).toFixed(2) : '';
            newInputValues[`${co}_meanScore`] = meanScore;
            if (meanScore) {
                overallTotal += parseFloat(meanScore);
                overallCount += 1;
            }
        });

        setInputValues(newInputValues);
        
        // Calculate Mean Overall Score and Correlation
        const meanOverall = overallCount > 0 ? (overallTotal / overallCount).toFixed(2) : '';
        setMeanOverallScore(meanOverall);

        // Determine Correlation
        let corrLevel = '';
        if (meanOverall < 1.5) corrLevel = 'Low';
        else if (meanOverall >= 1.5 && meanOverall < 2.5) corrLevel = 'Medium';
        else if (meanOverall >= 2.5) corrLevel = 'High';
        setCorrelation(corrLevel);
    };

    useEffect(() => {
        calculateMeanScore();
    }, [inputValues]);



    const handleSave = async () => {
        try {
            const saveData = {
                course_code: selectedCourse.course_code,
                scores: inputValues,
                meanOverallScore,
                correlation,
            };
            console.log('save', saveData);
            await axios.post(`${apiUrl}/api/rsmatrix`,saveData);
            console.log('save', saveData);
            alert('Data saved successfully!');
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
                                                    defaultValue={inputValues[`${co}_${index}`] || ''}
                                                    onChange={(e) => handleInputChange(co, index, e.target.value)}
                                                />
                                            </td>
                                        ))}
                                        <td>
                                            <input type="number" className="rsmatrix-input" readOnly value={inputValues[`${co}_meanScore`] || ''} />
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={11}>Mean Overall Score</td>
                                    <td>
                                    <input type="number" className="rsmatrix-input" readOnly value={meanOverallScore} />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={11}>
                                        Correlation
                                    </td>
                                    <td>
                                        <input type="text" className="rsmatrix-input" readOnly value={correlation} />
                                    </td>
                                </tr>
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