import React, { useState, useEffect } from "react";
import axios from "axios";
import './markrelease.css';

function MarkRelease() 
{
    // const [reportData, setReportData] = useState([]);
    // const [filteredData, setFilteredData] = useState([]);
    // const [checkboxState, setCheckboxState] = useState({});
    // const apiUrl = process.env.REACT_APP_API_URL;

    // useEffect(() => {
    //     const fetchReportData = async () => {
    //         try {
    //             const response = await axios.get(`${apiUrl}/reportdata`);
    //             const data = response.data;
    //             setReportData(data);
    //             setFilteredData(data);

                
    //             const initialCheckboxState = {};
    //             data.forEach(item => {
    //                 initialCheckboxState[item.staff_id] = {
    //                     cia_1: item.cia_1 === 1,
    //                     cia_2: item.cia_2 === 1,
    //                     ass_1: item.ass_1 === 1,
    //                     ass_2: item.ass_2 === 1,
    //                     ese: item.ese === 1
    //                 };
    //             });
    //             setCheckboxState(initialCheckboxState);
    //         } catch (err) {
    //             console.log('Error fetching data:', err);
    //         }
    //     };
    //     fetchReportData();
    // }, [apiUrl]);

    // const handleSearch = (e) => {
    //     const searchText = e.target.value.toLowerCase();
    //     const filteredList = reportData.filter(item =>
    //         item.staff_id.toLowerCase().includes(searchText)
    //     );
    //     setFilteredData(filteredList);
    // };

    // // Handle checkbox change
    // const handleCheckboxChange = (staff_id, field, checked) => {
    //     setCheckboxState(prevState => ({
    //         ...prevState,
    //         [staff_id]: {
    //             ...prevState[staff_id],
    //             [field]: checked
    //         }
    //     }));
    // };

    
    // const handleSave = async () => {
    //     const updates = {};
        
        
    //     Object.keys(checkboxState).forEach(staff_id => {
    //         const state = checkboxState[staff_id];
    //         updates[staff_id] = {
    //             cia_1: state.cia_1 ? 1 : 0,
    //             cia_2: state.cia_2 ? 1 : 0,
    //             ass_1: state.ass_1 ? 1 : 0,
    //             ass_2: state.ass_2 ? 1 : 0,
    //             ese: state.ese ? 1 : 0
    //         };
    //     });

    //     try {
            
    //         await axios.put(`${apiUrl}/updatemarkrelease`, { updates });
    //         alert("Report data saved successfully!");
    //     } catch (error) {
    //         alert("Failed to save data. " + (error.response?.data.message || error.message));
    //     }
    // };

    // return (
    //     <div className="release-main">
    //         <span className="release-top-heading">REPORT DATA</span>
    //         <div className="release-input-btn">
    //             <input className="release-search"
    //                 type="text"
    //                 placeholder="Search by Staff ID..."
    //                 onChange={handleSearch}
    //             />
    //             <button onClick={handleSave} className="release-save-btn">SAVE</button> {/* Global save button */}
    //         </div>
    //         <div className="release-table-wrapper">
    //             <table className="release-table">
    //                 <thead className="release-table-head">
    //                     <tr>
    //                         <th className="release-table-header">S. No</th>
    //                         <th className="release-table-header">Staff ID</th>
    //                         <th className="release-table-header">Staff Name</th> {/* New Staff Name column */}
    //                         <th className="release-table-header">Course ID</th> {/* New Course Code column */}
    //                         <th className="release-table-header">Category</th>
    //                         <th className="release-table-header">Section</th>
    //                         <th className="release-table-header">CIA 1</th>
    //                         <th className="release-table-header">CIA 2</th>
    //                         <th className="release-table-header">Ass 1</th>
    //                         <th className="release-table-header">Ass 2</th>
    //                         <th className="release-table-header">ESE</th>
    //                         <th className="release-table-header">Action</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {filteredData.map((reportItem, index) => (
    //                         <tr key={reportItem.staff_id} className="release-row">
    //                             <td className={index % 2 === 0 ? 'release-dark' : 'release-light'}>
    //                                 {index + 1}
    //                             </td>
    //                             <td className={index % 2 === 0 ? 'release-dark' : 'release-light'}>
    //                                 {reportItem.staff_id}
    //                             </td>
    //                             <td className={index % 2 === 0 ? 'release-dark' : 'release-light'}>
    //                                 {reportItem.coursemapping.staff_name} {/* Fetch staff_name from coursemapping */}
    //                             </td>
    //                             <td className={index % 2 === 0 ? 'release-dark' : 'release-light'}>
    //                                 {reportItem.coursemapping.course_id} {/* Fetch course_code from coursemapping */}
    //                             </td>
    //                             <td className={index % 2 === 0 ? 'release-dark' : 'release-light'}>
    //                                 {reportItem.category}
    //                             </td>
    //                             <td className={index % 2 === 0 ? 'release-dark' : 'release-light'}>
    //                                 {reportItem.section}
    //                             </td>
    //                             <td className={index % 2 === 0 ? 'release-dark' : 'release-light'}>
    //                                 <input 
    //                                     type="checkbox" 
    //                                     checked={checkboxState[reportItem.staff_id]?.cia_1 || false}
    //                                     onChange={(e) => handleCheckboxChange(reportItem.staff_id, 'cia_1', e.target.checked)} 
    //                                 />
    //                             </td>
    //                             <td className={index % 2 === 0 ? 'release-dark' : 'release-light'}>
    //                                 <input 
    //                                     type="checkbox" 
    //                                     checked={checkboxState[reportItem.staff_id]?.cia_2 || false}
    //                                     onChange={(e) => handleCheckboxChange(reportItem.staff_id, 'cia_2', e.target.checked)} 
    //                                 />
    //                             </td>
    //                             <td className={index % 2 === 0 ? 'release-dark' : 'release-light'}>
    //                                 <input 
    //                                     type="checkbox" 
    //                                     checked={checkboxState[reportItem.staff_id]?.ass_1 || false}
    //                                     onChange={(e) => handleCheckboxChange(reportItem.staff_id, 'ass_1', e.target.checked)} 
    //                                 />
    //                             </td>
    //                             <td className={index % 2 === 0 ? 'release-dark' : 'release-light'}>
    //                                 <input 
    //                                     type="checkbox" 
    //                                     checked={checkboxState[reportItem.staff_id]?.ass_2 || false}
    //                                     onChange={(e) => handleCheckboxChange(reportItem.staff_id, 'ass_2', e.target.checked)} 
    //                                 />
    //                             </td>
    //                             <td className={index % 2 === 0 ? 'release-dark' : 'release-light'}>
    //                                 <input 
    //                                     type="checkbox" 
    //                                     checked={checkboxState[reportItem.staff_id]?.ese || false}
    //                                     onChange={(e) => handleCheckboxChange(reportItem.staff_id, 'ese', e.target.checked)} 
    //                                 />
    //                             </td>
    //                             <td className={index % 2 === 0 ? 'release-dark' : 'release-light'}>
    //                                 <button 
    //                                     onClick={() => console.log(`Save button clicked for staff_id: ${reportItem.staff_id}`)} 
    //                                     className="row-save-btn">
    //                                     SAVE
    //                                 </button> {/* SAVE button in each row */}
    //                             </td>
    //                         </tr>
    //                     ))}
    //                 </tbody>
    //             </table>
    //         </div>
    //     </div>
    // );
}

export default MarkRelease;
