import React, { useState, useEffect } from "react";
import axios from "axios";

function Scope() {
    const [scopeData, setScopeData] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
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

    return (
        <div>
            <h1>Scope Data</h1>
            <div style={{ maxHeight: '900px', overflowY: 'auto' }}> {/* Make the table scrollable */}
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
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
                                        defaultChecked={scopeItem.dashboard === 1}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="checkbox"
                                        defaultChecked={scopeItem.course_list === 1}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="checkbox"
                                        defaultChecked={scopeItem.report === 1}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="checkbox"
                                        defaultChecked={scopeItem.upload_files === 1}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="checkbox"
                                        defaultChecked={scopeItem.logout === 1}
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
