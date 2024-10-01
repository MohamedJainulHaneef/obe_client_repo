import React, { useState } from "react";
import '../settings/setting.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Setting() {
    const apiUrl = process.env.REACT_APP_API_URL;    
    const [academic, setAcademic] = useState(false);
    const [academicsem, setAcademicSem] = useState('');
    const navigate = useNavigate();

    const handleAcademic = () => {
        setAcademic(true);
    }

    const handleAcademicSem = async () => {
        try {
            const response = await axios.put(`${apiUrl}/academic`, {
                academicsem
            });

            window.alert("Academic year ", response.data);
        } catch (err) {
            console.error('Error ', err);
            window.alert("Something Went Wrong with the Server");
        }
    }

    const handleStaffManage = () => {
        console.log("Navigating to Staff Manage");
        navigate(`setting/staffmanage`);
    };
    
    return (
        <div className="setting-body">
            <div className="setting-container">
                <button className="setting-item">
                    <h2 className="setting-btn" onClick={handleAcademic}>Academic Year</h2>
                </button>
                <button className="setting-item">
                    <h2 className="setting-btn">Student Manage</h2>
                </button>
                <button className="setting-item">
                    <h2 className="setting-btn">Course Manage</h2>
                </button>
                <button className="setting-item" onClick={handleStaffManage}>
                    <h2 className="setting-btn">Staff Manage</h2>
                </button>
                <button className="setting-item">
                    <h2 className="setting-btn">Mark Manage</h2>
                </button>
                <button className="setting-item">
                    <h2 className="setting-btn">Scope Manage</h2>
                </button>
            </div>

            {academic && (
                <div className="pop-up-container">
                    <div className="pop-up">
                        <div>
                            <select
                                value={academicsem}
                                onChange={(e) => setAcademicSem(e.target.value)}
                            >
                                <option value="Apr-2024">Apr-2024</option>
                                <option value="Nov-2024">Nov-2024</option>
                                <option value="Apr-2025">Apr-2024</option>
                                <option value="Nov-2025">Nov-2024</option>
                                <option value="Apr-2026">Apr-2024</option>
                                <option value="Nov-2026">Nov-2024</option>
                                <option value="Apr-2027">Apr-2024</option>
                                <option value="Nov-2027">Nov-2024</option>
                                <option value="Apr-2028">Apr-2024</option>
                                <option value="Nov-2028">Nov-2024</option>
                                <option value="Apr-2029">Apr-2024</option>
                                <option value="Nov-2029">Nov-2024</option>
                                <option value="Apr-2030">Apr-2024</option>
                                <option value="Nov-2030">Nov-2024</option>
                             
                            </select>
                            <button onClick={handleAcademicSem}>Submit</button>
                        </div> 
                    </div>
                </div>
            )}
        </div>
    );
}

export default Setting;
