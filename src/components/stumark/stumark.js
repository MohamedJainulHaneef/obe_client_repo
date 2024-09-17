import React, { useState, useEffect } from "react";
import axios from "axios";
import "./stumark.css";
import { useLocation } from 'react-router-dom';

function Stumark() 
{
    const location = useLocation();
    const [stuData, setStuData] = useState([]);
    const [activeSection, setActiveSection] = useState('1');
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
        setStuData(stuData.map(user => ({
            ...user,
            lot: '',
            mot: '',
            hot: '',
            total: ''
        })))
    }

    const handleInputChange = (registerNo, type, value) => {
        let validatedValue = value;

        if (type === 'lot') {
            validatedValue = value > 25 ? 25 : value;
        }
        else if (type === 'mot') {
            validatedValue = value > 40 ? 40 : value;
        }
        else if (type === 'hot') {
            validatedValue = value > 10 ? 10 : value;
        }

        const updatedStuData = stuData.map(user => {
            if (user.reg_no === registerNo) {
                const newLot = type === 'lot' ? validatedValue : user.lot;
                const newMot = type === 'mot' ? validatedValue : user.mot;
                const newHot = type === 'hot' ? validatedValue : user.hot;
                const newTotal = parseFloat(newLot || 0) + parseFloat(newMot || 0) + parseFloat(newHot || 0);
                return { ...user, [type]: validatedValue, total: newTotal };
            }
            return user;
        });

        setStuData(updatedStuData);
    };


    const handleUpdateMark = async (e) => {
        e.preventDefault();
        const updates = {};
        stuData.forEach(user => {
            updates[user.reg_no] = {
                lot: user.lot,
                mot: user.mot,
                hot: user.hot,
                total: user.total
            }
        })

        console.log('Sending Data:', { updates, activeSection, courseCode });

        try {
            const response = await axios.put('http://localhost:5000/updateMark',
                {
                    updates, activeSection, courseCode
                });
            if (response.data.success) {
                window.alert("Marks Submitted Successfully");
            }
            else {
                alert('Something went Wrong');
            }
        }
        catch (err) {
            console.error('Error ', err);
            window.alert("Something Went Wrong with the Server");
        }
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
                <div className="mark-dropdown-group">
                    <select
                        value={activeSection || ''}
                        onChange={handleSectionChange}
                        className="mark-dropdown"
                    >
                        <option value="1">CIA - 1</option>
                        <option value="2">CIA - 2</option>
                        <option value="3">ASS - 1</option>
                        <option value="4">ASS - 2</option>
                        <option value="5">ESE</option>
                    </select>
                </div>
                <div>
                    {activeSection && (
                        <div>
                            <table>
                                <thead>
                                    <tr>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {stuData.map((user, index) => (
                                        <tr key={index}>
                                            <td className="mark-sno">{index + 1}</td>
                                            <td className="mark-reg">{user.reg_no}</td>
                                            <td>{user.stu_name}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={user.lot}
                                                    name="lot"
                                                    max={25}
                                                    onChange={(e) => handleInputChange(user.reg_no, 'lot', e.target.value)}
                                                >

                                                </input>
                                            </td>
                                            {(activeSection === "1" || activeSection === "2" || activeSection === "5") && (
                                                <>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            name="mot"
                                                            max={40} value={user.mot}
                                                            onChange={(e) => handleInputChange(user.reg_no, 'mot', e.target.value)}
                                                        >
                                                        </input>
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            name="hot"
                                                            max={10}
                                                            value={user.hot}
                                                            onChange={(e) => handleInputChange(user.reg_no, 'hot', e.target.value)}
                                                        >
                                                        </input>
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            name="total"
                                                            value={user.total}
                                                            readOnly
                                                        >
                                                        </input>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="mark-button-head">
                                <button type="submit" className="mark-button-save" onClick={handleUpdateMark}>
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
        </div>
    )
}

export default Stumark;
