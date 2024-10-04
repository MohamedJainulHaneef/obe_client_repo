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
    }, []);

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
                report: item.report,
                upload_files: item.upload_files,
                logout: item.logout,
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
                    style={{ marginLeft: '10px', padding: '10px', fontSize: '16px' }}
                >
                    SAVE
                </button>
            </h1>
            <div style={{ maxHeight: '900px', overflowY: 'auto' }}>
                <table className="scope-table">
                    <thead>
                        <tr>
                            <th style={{ position: 'sticky', top: 0 }}>Staff ID</th>
                            <th style={{ position: 'sticky', top: 0 }}>
                                <input 
                                    type="checkbox" 
                                    onChange={() => handleAllCheckboxChange('dashboard')}
                                    checked={scopeData.every(item => item.dashboard === 1)}
                                />
                                ALL
                            </th>
                            <th style={{ position: 'sticky', top: 0 }}>
                                <input 
                                    type="checkbox" 
                                    onChange={() => handleAllCheckboxChange('course_list')}
                                    checked={scopeData.every(item => item.course_list === 1)}
                                />
                                ALL
                            </th>
                            <th style={{ position: 'sticky', top: 0 }}>
                                <input 
                                    type="checkbox" 
                                    onChange={() => handleAllCheckboxChange('report')}
                                    checked={scopeData.every(item => item.report === 1)}
                                />
                                ALL
                            </th>
                            <th style={{ position: 'sticky', top: 0 }}>
                                <input 
                                    type="checkbox" 
                                    onChange={() => handleAllCheckboxChange('upload_files')}
                                    checked={scopeData.every(item => item.upload_files === 1)}
                                />
                                ALL
                            </th>
                            <th style={{ position: 'sticky', top: 0 }}>
                                <input 
                                    type="checkbox" 
                                    onChange={() => handleAllCheckboxChange('logout')}
                                    checked={scopeData.every(item => item.logout === 1)}
                                />
                                ALL
                            </th>
                        </tr>
                        <tr>
                            <th style={{ position: 'sticky', top: 0 }}>Staff ID</th>
                            <th style={{ position: 'sticky', top: 0 }}>Dashboard</th>
                            <th style={{ position: 'sticky', top: 0 }}>Course List</th>
                            <th style={{ position: 'sticky', top: 0 }}>Report</th>
                            <th style={{ position: 'sticky', top: 0 }}>Upload Files</th>
                            <th style={{ position: 'sticky', top: 0 }}>Logout</th>
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
                                        checked={scopeItem.report === 1}
                                        onChange={(e) => handleCheckboxChange(scopeItem.staff_id, 'report', e.target.checked)}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="checkbox"
                                        checked={scopeItem.upload_files === 1}
                                        onChange={(e) => handleCheckboxChange(scopeItem.staff_id, 'upload_files', e.target.checked)}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="checkbox"
                                        checked={scopeItem.logout === 1}
                                        onChange={(e) => handleCheckboxChange(scopeItem.staff_id, 'logout', e.target.checked)}
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