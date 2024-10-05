import React, { useState, useEffect } from "react";
import axios from "axios";
import './scope.css';

function Scope() 
{
    const [scopeData, setScopeData] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => 
    {
        const scopeDetailsFetch = async () => {
            try {
                const response = await axios.get(`${apiUrl}/scopeset`);
                setScopeData(response.data);
            } 
            catch (err) {
                console.log('Error fetching data:', err);
            }
        };
        scopeDetailsFetch();
    }, [apiUrl]);

    const handleCheckboxChange = (staffId, field, checked) => 
    {
        setScopeData(prevData =>
            prevData.map(item => 
                item.staff_id === staffId ? { ...item, [field]: checked ? 1 : 0 } : item
            )
        );
    };

    const handleAllCheckboxChange = (field) => 
    {
        const allChecked = scopeData.every(item => item[field] === 1);
        setScopeData(prevData =>
            prevData.map(item => ({ ...item, [field]: allChecked ? 0 : 1 }))
        );
    };

    const handleSave = async () => 
    {
        const updates = {};
        scopeData.forEach(item => 
        {
            updates[item.staff_id] = 
            {
                dashboard: item.dashboard,
                course_list: item.course_list,
                course_outcome: item.course_outcome,
                student_outcome: item.student_outcome,
                program_outcome: item.program_outcome,
                program_specific_outcome: item.program_specific_outcome,
                mentor_report: item.mentor_report,
                hod_report: item.hod_report,
                report: item.report,
                input_files: item.input_files,
                manage: item.manage,
                relationship_matrix: item.relationship_matrix,
                settings: item.settings,
            }
        })

        try 
        {
            await axios.put(`${apiUrl}/updateScope`, { updates });
            alert("Data saved successfully!");
        } 
        catch (error) 
        {
            alert("Failed to Save Data. " + (error.response?.data.message || error.message));
        }
    }

    return (
        <div>
            <h1>
                Scope Data 
                <button 
                    onClick={handleSave} 
                >
                    SAVE
                </button>
            </h1>
            <div>
                <table className="scope-table">
                    <thead>
                        <tr>
                            <th >Staff ID</th>
                            <th className="">
                                Dashboard
                                <input 
                                    type="checkbox" 
                                    onChange={() => handleAllCheckboxChange('dashboard')}
                                    checked={scopeData.every(item => item.dashboard === 1)}
                                />
                            </th>
                            <th className="">
                                Course List
                                <input 
                                    type="checkbox" 
                                    onChange={() => handleAllCheckboxChange('course_list')}
                                    checked={scopeData.every(item => item.course_list === 1)}
                                />
                            </th>
                            <th className="">
                                Course Outcome
                                <input 
                                    type="checkbox" 
                                    onChange={() => handleAllCheckboxChange('course_outcome')}
                                    checked={scopeData.every(item => item.course_outcome === 1)}
                                />
                            </th>
                            <th className="">
                                Student Outcome
                                <input 
                                    type="checkbox" 
                                    onChange={() => handleAllCheckboxChange('student_outcome')}
                                    checked={scopeData.every(item => item.student_outcome === 1)}
                                />
                            </th>
                            <th className="">
                                Program Outcome
                                <input 
                                    type="checkbox" 
                                    onChange={() => handleAllCheckboxChange('program_outcome')}
                                    checked={scopeData.every(item => item.program_outcome === 1)}
                                />
                            </th>
                            <th className="">
                                Program Specific Outcome
                                <input 
                                    type="checkbox" 
                                    onChange={() => handleAllCheckboxChange('program_specific_outcome')}
                                    checked={scopeData.every(item => item.program_specific_outcome === 1)}
                                />
                            </th>
                            <th className="">
                                Mentor Report
                                <input 
                                    type="checkbox" 
                                    onChange={() => handleAllCheckboxChange('mentor_report')}
                                    checked={scopeData.every(item => item.mentor_report === 1)}
                                />
                            </th>
                            <th className="">
                                HOD Report
                                <input 
                                    type="checkbox" 
                                    onChange={() => handleAllCheckboxChange('hod_report')}
                                    checked={scopeData.every(item => item.hod_report === 1)}
                                />
                            </th>
                            <th className="">
                                Report
                                <input 
                                    type="checkbox" 
                                    onChange={() => handleAllCheckboxChange('report')}
                                    checked={scopeData.every(item => item.report === 1)}
                                />
                            </th>
                            <th className="">
                                Input Files
                                <input 
                                    type="checkbox" 
                                    onChange={() => handleAllCheckboxChange('input_files')}
                                    checked={scopeData.every(item => item.input_files === 1)}
                                />
                            </th>
                            <th className="">
                                Manage
                                <input 
                                    type="checkbox" 
                                    onChange={() => handleAllCheckboxChange('manage')}
                                    checked={scopeData.every(item => item.manage === 1)}
                                />
                            </th>
                            <th className="">
                                Relationship Matrix
                                <input 
                                    type="checkbox" 
                                    onChange={() => handleAllCheckboxChange('relationship_matrix')}
                                    checked={scopeData.every(item => item.relationship_matrix === 1)}
                                />
                            </th>
                            <th className="">
                                Settings
                                <input 
                                    type="checkbox" 
                                    onChange={() => handleAllCheckboxChange('settings')}
                                    checked={scopeData.every(item => item.settings === 1)}
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {scopeData.map((scopeItem) => (
                            <tr key={scopeItem.staff_id}>
                                <td>{scopeItem.staff_id}</td>
                                <td>
                                    <input 
                                        type="checkbox"
                                        checked={scopeItem.dashboard === 1}
                                        onChange={(e) => handleCheckboxChange(scopeItem.staff_id, 'dashboard', e.target.checked)}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="checkbox"
                                        checked={scopeItem.course_list === 1}
                                        onChange={(e) => handleCheckboxChange(scopeItem.staff_id, 'course_list', e.target.checked)}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="checkbox"
                                        checked={scopeItem.course_outcome === 1}
                                        onChange={(e) => handleCheckboxChange(scopeItem.staff_id, 'course_outcome', e.target.checked)}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="checkbox"
                                        checked={scopeItem.student_outcome === 1}
                                        onChange={(e) => handleCheckboxChange(scopeItem.staff_id, 'student_outcome', e.target.checked)}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="checkbox"
                                        checked={scopeItem.program_outcome === 1}
                                        onChange={(e) => handleCheckboxChange(scopeItem.staff_id, 'program_outcome', e.target.checked)}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="checkbox"
                                        checked={scopeItem.program_specific_outcome === 1}
                                        onChange={(e) => handleCheckboxChange(scopeItem.staff_id, 'program_specific_outcome', e.target.checked)}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="checkbox"
                                        checked={scopeItem.mentor_report === 1}
                                        onChange={(e) => handleCheckboxChange(scopeItem.staff_id, 'mentor_report', e.target.checked)}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="checkbox"
                                        checked={scopeItem.hod_report === 1}
                                        onChange={(e) => handleCheckboxChange(scopeItem.staff_id, 'hod_report', e.target.checked)}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="checkbox"
                                        checked={scopeItem.report === 1}
                                        onChange={(e) => handleCheckboxChange(scopeItem.staff_id, 'report', e.target.checked)}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="checkbox"
                                        checked={scopeItem.input_files === 1}
                                        onChange={(e) => handleCheckboxChange(scopeItem.staff_id, 'input_files', e.target.checked)}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="checkbox"
                                        checked={scopeItem.manage === 1}
                                        onChange={(e) => handleCheckboxChange(scopeItem.staff_id, 'manage', e.target.checked)}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="checkbox"
                                        checked={scopeItem.relationship_matrix === 1}
                                        onChange={(e) => handleCheckboxChange(scopeItem.staff_id, 'relationship_matrix', e.target.checked)}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="checkbox"
                                        checked={scopeItem.settings === 1}
                                        onChange={(e) => handleCheckboxChange(scopeItem.staff_id, 'settings', e.target.checked)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Scope;