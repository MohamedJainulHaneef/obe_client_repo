import React, { useState, useEffect } from "react";
import "./stumark.css";
import axios from "axios";
import { useLocation } from 'react-router-dom';

function Stumark() 
{
    const location = useLocation();
    const [stuData, setStuData] = useState([]);
    const { deptName, section, semester, classDetails, courseCode, courseTitle } = location.state || {};

    useEffect(() => 
    {
        const stuDetails = async () => {
            try {
                const response = await axios.post('http://localhost:5000/studentdetails', {
                    dept_name: classDetails,
                    stu_section: section,
                    stu_semester: semester
                });

                setStuData(response.data);
            } 
            catch (err) {
                console.log('Error fetching data:', err);
            }
        };
        stuDetails();
    }, [classDetails, section, semester]);

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
                        <h3>TIRUCHIRAPPALLI-620 020</h3>
                    </div>
                </div>
                <div className="mark-header-title2">
                    <h3>OUTCOME BASED EDUCATION - NOVEMBER 2024</h3>
                    <h3>{deptName}</h3>
                </div>
                <div className="mark-title-content">
                    <div className="mark-header-details1">
                        <span>Class: {classDetails} - {section}</span>
                        <span>Semester: {semester}</span>
                        <span>Course Code: {courseCode}</span>
                        <span>Maximum Marks: 100</span>
                        <span>Course Title: {courseTitle}</span>
                    </div>
                </div>
                <div className="student-table">
                    <h3>Student List</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Register Number</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stuData.length > 0 ? stuData.map((student, index) => (
                                <tr key={index}>
                                    <td>{student.stu_regno}</td>
                                    <td>{student.stu_name}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="2">No student data available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Stumark;
