import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './manage.css';
import axios from "axios";

function Manage() 
{
    const { staffId } = useParams();
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
            window.alert("Academic Year Set Successfully", response.data);
        }
        catch (err) {
            console.error('Error ', err);
            window.alert("Something Went Wrong with the Server");
        }
    }

    const handleStaffManage = () => {
        navigate(`/staff/${staffId}/staffmanage`);
    };

    const handleScopeManage = () => {
        navigate(`/staff/${staffId}/scopemanage`);
    };

    const handleRelease = () => {
        navigate(`/staff/${staffId}/reportrelease`);
    };

    return (
        <div className="manage-body">
            <div className="manage-container">
                <button className="manage-btn" onClick={handleAcademic}>Academic Year</button>
                <button className="manage-btn">Student Manage</button>
                <button className="manage-btn">Course Manage</button>
                <button className="manage-btn" onClick={handleStaffManage}>Staff Manage</button>
                <button className="manage-btn">Mark Manage</button>
                <button className="manage-btn" onClick={handleScopeManage}>Scope Manage</button>
                <button className="manage-btn" onClick={handleRelease}>Release</button>
            </div>

            <div className="manage-popup-container">
                {academic && (
                    <div className="manage-popup">
                        <div>
                            <select
                                value={academicsem}
                                onChange={(e) => setAcademicSem(e.target.value)}
                            >
                                <option value="Apr-2024">Apr-2024</option>
                                <option value="Nov-2024">Nov-2024</option>
                            </select>
                            <button onClick={handleAcademicSem}>Submit</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Manage;
