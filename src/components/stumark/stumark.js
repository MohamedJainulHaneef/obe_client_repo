import React, { useState, useEffect } from "react";
import axios from "axios";
import "./stumark.css";
import { useLocation } from 'react-router-dom';

function Stumark() {
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
    }

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
                        <option value="1">CIA - 1</option>
                        <option value="2">CIA - 2</option>
                        <option value="3">ASS - 1</option>
                        <option value="4">ASS - 2</option>
                        <option value="5">ESE</option>
                    </select>
                </div>
                <div>
                    { activeSection && (
                        <div>
                            <table>
                                <thead>
                                    <th className="mark-sno">S. No.</th>
                                    <th className="mark-reg">Reg. No.</th>
                                    <th className="mark-name">Name</th>
                                    <th className="mark-obe">LOT</th>
                                    {(activeSection === "1" || activeSection === "2" || activeSection === "5") && (
                                        <>
                                            <th className="mark-obe">MOT</th>
                                            <th className="mark-obe">HOT</th>
                                            <th className="mark-obe">Total</th>
                                        </>
                                    )}
                                </thead>
                                <tbody>
                                    { stuData.map((user,index) => (
                                        <tr key={index}>
                                            <td className="mark-sno">{index+1}</td>
                                            <td className="mark-reg">{user.reg_no}</td>
                                            <td>{user.stu_name}</td>
                                            <td><input></input></td>
                                            {(activeSection === "1" || activeSection === "2" || activeSection === "5") && (
                                                <>
                                                    <td>
                                                        <input>
                                                        </input>
                                                        </td>
                                                    <td>
                                                        <input>
                                                        </input>
                                                        </td> 
                                                    <td>
                                                        <input>
                                                        </input>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="mark-button-head">
                        <button type="submit" className="">
                            SAVE
                        </button>
                        <button type="submit" className="">
                            SAVE & CONFIRM
                        </button>
                    </div>
                        </div>
                        
                    )}
                    
                </div>
                
            </div>
        </div>
    )
}

export default Stumark;
