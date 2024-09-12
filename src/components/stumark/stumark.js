import React, { useState, useEffect } from "react";
import axios from "axios";
import "./stumark.css";
import { useLocation } from 'react-router-dom';

function Stumark() 
{
    const location = useLocation();
    const [stuData, setStuData] = useState([]);
    const [activeSection, setActiveSection] = useState(null);
    const { deptName, section, semester, classDetails, courseCode, courseTitle, courseId, category } = location.state || {};

    useEffect(() => {
        const stuDetails = async () => {
            try {
                const response = await axios.post('http://localhost:5000/studentdetails', {
                    course_id: courseId,
                    stu_section: section,
                    stu_semester: semester,
                    stu_category: category,
                    stu_course_code: courseCode
                });
                console.log(response.data.reg_no);
                setStuData(response.data);
            } 
            catch (err) {
                console.log('Error fetching data:', err);
            }
        };
        stuDetails();
    }, [courseId, section, semester, category, courseCode]);

    const handleSectionChange = (event) => {
        setActiveSection(event.target.value);
    };

    const renderTableHeaders = () => {
        if (activeSection === "CIA-1" || activeSection === "CIA-2") {
            return (
                <>
                    <th>LOT</th>
                    <th>MOT</th>
                    <th>HOT</th>
                    <th>TOTAL</th>
                </>
            );
        }
        if (activeSection === "ESE") {
            return (
                <>
                    <th>LOT</th>
                    <th>MOT</th>
                    <th>HOT</th>
                    <th>TOTAL</th>
                </>
            );
        }
        return (
            <th>LOT</th>
        );
    };

    const renderTableData = () => {
        return stuData.length > 0 ? stuData.map((student, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{student.reg_no}</td>
                <td>{student.stu_name}</td>
                {activeSection === "CIA-1" || activeSection === "CIA-2" ? (
                    <>
                        <td><input type="text" /></td>
                        <td><input type="text" /></td>
                        <td><input type="text" /></td>
                        <td><input type="text" /></td>
                    </>
                ) : activeSection === "ESE" ? (
                    <>
                        <td><input type="text" /></td>
                        <td><input type="text" /></td>
                        <td><input type="text" /></td>
                        <td><input type="text" /></td>
                    </>
                ) : (
                    <td><input type="text" /></td>
                )}
            </tr>
        )) : (
            <tr>
                <td colSpan={activeSection === "CIA-1" || activeSection === "CIA-2" ? 7 : (activeSection === "ESE" ? 5 : 4)}>
                    No student data available.
                </td>
            </tr>
        );
    };

    return (
        <div className="mark-main">
            <div className="mark-body">
                <div className="mark-header">
                    <div className="mark-header-title1">
                        <h1 className="mark-title">JAMAL MOHAMED COLLEGE (Autonomous)</h1>
                        <span>
                            Nationally Accredited with A++ Grade by NAAC (4th Cycle) with CGPA
                            3.69 out of 4.0
                        </span>
                        <span>Affiliated to Bharathidasan University</span>
                        <h3>TIRUCHIRAPPALLI - 620 020 .</h3>
                    </div>
                </div>
                <div className="mark-header-title2">
                    <h3>OUTCOME BASED EDUCATION - NOVEMBER 2024</h3>
                    <h3>{deptName}</h3>
                </div>
                <div className="mark-title-content">
                    <div className="mark-header-details1">
                        <div className="mark-course-details">
                            <span className="mark-course-header">Class</span>
                            :
                            <span className="mark-course-footer">{classDetails} - {section}</span>
                        </div>
                        <div className="mark-course-details">
                            <span className="mark-course-header">Semester</span>
                            :
                            <span className="mark-course-footer">{semester}</span>
                        </div>
                        <div className="mark-course-details">
                            <span className="mark-course-header">Course Code</span>
                            :
                            <span className="mark-course-footer">{courseCode}</span>
                        </div>
                        <div className="mark-course-details">
                            <span className="mark-course-header">Course Title</span>
                            :
                            <span className="mark-course-footer">{courseTitle}</span>
                        </div>
                    </div>
                </div>
                <div className="mark-dropdown-group">
                    <select
                        value={activeSection || ''}
                        onChange={handleSectionChange}
                        className="mark-dropdown"
                    >
                        <option value="">Select</option>
                        <option value="CIA-1">CIA - 1</option>
                        <option value="CIA-2">CIA - 2</option>
                        <option value="ASS-1">ASS - 1</option>
                        <option value="ASS-2">ASS - 2</option>
                        <option value="ESE">ESE</option>
                    </select>
                </div>
                {activeSection && (
                    <div className="student-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Regno</th>
                                    <th>Name</th>
                                    {renderTableHeaders()}
                                </tr>
                            </thead>
                            <tbody>
                                {renderTableData()}
                            </tbody>
                        </table>
                        <div className="mark-button-head">
                            <button type="submit" className="mark-button-save">
                                SAVE
                            </button>
                            <button type="submit" className="mark-button-saveconfirm">
                                SAVE & CONFIRM
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Stumark;