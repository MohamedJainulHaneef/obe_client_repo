import React, { useState } from "react";
import "./stumark.css";
import { useLocation } from 'react-router-dom';
    
function Stumark()
{
    const location = useLocation();
    const { deptName, section, semester } = location.state || {};

    const [activeSection, setActiveSection] = useState(null);

    const handleButtonClick = (section) => {
        setActiveSection(prevSection => (prevSection === section ? null : section));
    };

    return (
        <div className="mark-main">
            <div className="mark-body">
                <div className="mark-header">
                    {/* <img src={logo} alt="" className="logo" /> */}
                    <div className="mark-header-title1">
                        <h1 className="mark-title">JAMAL MOHAMED COLLEGE (Autonomous)</h1>
                        <span>
                            Nationally Accredited with A++ Grade by NAAC (4th Cycle) with CGPA
                            3.69 out of 4.0
                        </span>
                        <span>Affiliated to Bharathidasan University</span>
                        <h3>TIRUCHIRAPPALLI-620020</h3>
                    </div>
                </div>
                <div className="mark-header-title2">
                    <h3>OUTCOME BASED EDUCATION - NOVEMBER 2024</h3>
                    <h3>{deptName}</h3>
                </div>
                <div className="mark-title-content">
                    <div className="mark-header-details1">
                        <span>Class: I-MCA {section}</span>
                        <span>Semester: {semester}</span>
                        <span>Course Code: 23</span>
                        <span>Maximum Marks: 100</span>
                        <span>Course Title: DATABASE SYSTEM</span>
                    </div>
                </div>
                <div className="mark-button-group">
                    {["CIA-1", "CIA-2", "ASS-1", "ASS-2", "ESE"].map((section) => (
                        <button
                            key={section}
                            type="button"
                            className={`mark-button ${activeSection === section ? 'active' : ''}`}
                            onClick={() => handleButtonClick(section)}
                        >
                            {section}
                        </button>
                    ))}
                </div>
                {(activeSection === "CIA-1" || activeSection === "CIA-2" || activeSection === "ASS-1" || activeSection === "ASS-2" || activeSection === "ESE") && (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Regno</th>
                                    <th>Name</th>
                                    {activeSection !== "CIA-1" && activeSection !== "CIA-2" ? (
                                        <th>LOT</th>
                                    ) : (
                                        <>
                                            <th>LOT</th>
                                            <th>HOT</th>
                                            <th>MOT</th>
                                            <th>TOTAL</th>
                                        </>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>24MCA001</td>
                                    <td>Mohamed Jainul Haneef Mohamed Ismail</td>
                                    {activeSection !== "CIA-1" && activeSection !== "CIA-2" ? (
                                        <td><input type="text" required /></td>
                                    ) : (
                                        <>
                                            <td><input type="text" required /></td>
                                            <td><input type="text" required /></td>
                                            <td><input type="text" required /></td>
                                            <td><input type="text" /></td>
                                        </>
                                    )}
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>24MCA002</td>
                                    <td>Mohamed Hamdhan</td>
                                    {activeSection !== "CIA-1" && activeSection !== "CIA-2" ? (
                                        <td><input type="text" /></td> ) : (
                                        <>
                                            <td><input type="text" /></td>
                                            <td><input type="text" /></td>
                                            <td><input type="text" /></td>
                                            <td><input type="text" /></td>
                                        </>
                                    )}
                                </tr>
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
                    </>
                )}
            </div>
        </div>
    )
}

export default Stumark;