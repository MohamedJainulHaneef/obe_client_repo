import React, { useState, useEffect } from "react";
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

    useEffect(() => 
    {
        const fetchActiveSem = async () => 
        {
            try {
                const response = await axios.post(`${apiUrl}/activesem`, {});
                setAcademicSem(response.data.academic_year); 
            } 
            catch (err) {
                console.error('Error fetching data:', err);
            }
        };
        fetchActiveSem();
    }, [apiUrl]);

    const handleAcademic = () => 
    {
        setAcademic(true);
    }

    const handleAcademicSem = async () => 
    {
        try {
            const response = await axios.put(`${apiUrl}/academic`, {
                academicsem
            });
            window.alert("Academic Year Set Successfully", response.data);
            window.location.reload();
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
                        <div className="manage-academic-wrapper">
                            <select
                                value={academicsem}
                                onChange={(e) => setAcademicSem(e.target.value)}
                                className="scope-dropdown"
                            >
                                <option value="APR - 2024">APR - 2024</option>
                                <option value="NOV - 2024">NOV - 2024</option>
                                <option value="APR - 2025">APR - 2025</option>
                                <option value="NOV - 2025">NOV - 2025</option>
                                <option value="APR - 2026">APR - 2026</option>
                                <option value="NOV - 2026">NOV - 2026</option>
                                <option value="APR - 2027">APR - 2027</option>
                                <option value="NOV - 2027">NOV - 2027</option>
                                <option value="APR - 2028">APR - 2028</option>
                                <option value="NOV - 2028">NOV - 2028</option>
                                <option value="APR - 2029">APR - 2029</option>
                                <option value="NOV - 2029">NOV - 2029</option>
                                <option value="APR - 2030">APR - 2030</option>
                                <option value="NOV - 2030">NOV - 2030</option>
                            </select>
                            <button onClick={handleAcademicSem} className="scope-submit-btn">Submit</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
 
export default Manage;
