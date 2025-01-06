import React, { useState, useEffect } from "react";
import axios from "axios";
import './tutorstuoutcome.css';
import { useParams } from 'react-router-dom';

function AdminStuOutcome() 
{
     const apiUrl = process.env.REACT_APP_API_URL;

     const { staffId } = useParams();
     const [outcomeData, setOutcomeData] = useState("");
     const [academicYear, setAcademicYear] = useState('');
     const [outcomeTable, setOutcomeTable] = useState('');
     const [category, setCategory] = useState('');
     const [department, setDepartment] = useState('');
     const [deptId, setDeptId] = useState('');
     const [section, setSection] = useState('');
     const [semester, setSemester] = useState('');

     useEffect(() => 
     {
          const academicYearSet = async () => 
          {
               try {
                    const response = await axios.post(`${apiUrl}/activesem`, {});
                    setAcademicYear(response.data.academic_year);
               }
               catch (err) {
                    console.log('Error Fetching Academic Year:', err);
               }
          }
          academicYearSet();

     }, []);

     useEffect(() => 
     {
          const fetchAcademicYearAndData = async () => 
          {
               try {
                    const tutorDetails = await axios.post(`${apiUrl}/api/tutordetails`, {
                         staffId
                    })
                    setCategory(tutorDetails.data.tutorDetails.category);
                    setDepartment(tutorDetails.data.tutorDetails.dept_name);
                    setDeptId(tutorDetails.data.tutorDetails.course_id);
                    setSemester(tutorDetails.data.studentSection.semester);
                    setSection(tutorDetails.data.tutorDetails.section);
               } 
               catch (error) {
                    console.error("Error Fetching Active Academic Year or Course Data :", error);
                    alert("Failed to fetch Academic Year and Related Data");
               }
          };
          fetchAcademicYearAndData();
     }, []);

     const sendData = async () => 
     {
          const values = await axios.post(`${apiUrl}/api/tutorstuoutcome`, { 
               category, department, deptId , semester, section, academicYear
          })
          setOutcomeData(values.data);
          setOutcomeTable(true);
     }

     return (
          <div className="tso-main">
               <div className="tso-dropdown-container">
                    <div className="tso-search-cnt">
                         <span className="tso-label">Academic Year : </span>
                         <input
                              type="text"
                              className="tso-select"
                              value={academicYear}
                              readOnly
                              disabled
                         />
                    </div>
                    <div className="tso-search-cnt">
                         <span className="tso-label">Category : </span>
                         <input
                              type="text"
                              className="tso-select"
                              value={category}
                              readOnly
                              disabled
                         />
                    </div>
                    <div className="tso-search-cnt">
                         <span className="tso-label">Department : </span>
                         <input
                              type="text"
                              className="tso-select"
                              value={department}
                              readOnly
                              disabled
                         />
                    </div>
                    <div className="tso-search-cnt">
                         <span className="tso-label">Class : </span>
                         <input
                              type="text"
                              className="tso-select"
                              value={deptId}
                              readOnly
                              disabled
                         />
                    </div>
                    <div className="tso-search-cnt">
                         <span className="tso-label">Semester : </span>
                         <input
                              type="text"
                              className="tso-select"
                              value={semester}
                              readOnly
                              disabled
                         />
                    </div>
                    <div className="tso-search-cnt">
                         <span className="tso-label">Section : </span>
                         <input
                              type="text"
                              className="tso-select"
                              value={section}
                              readOnly
                              disabled
                         />
                    </div>
               </div>
               <div className="tso-btn-content">
                    <button className="tso-btn" onClick={sendData}>Get</button>
               </div>
               {outcomeTable && (
                    <div className="tso-table-container" >
                    <div className="tso-header">
                         <div className="tso-header-title1">
                              <h1 className="">JAMAL MOHAMED COLLEGE (Autonomous)</h1>
                              <span>
                                   Nationally Accredited with A++ Grade by NAAC (4th Cycle) with CGPA
                                   3.69 out of 4.0
                              </span>
                              <span>Affiliated to Bharathidasan University</span>
                              <h3>TIRUCHIRAPPALLI - 620 020 .</h3>
                         </div>
                    </div>
                    <div className="tso-header-title2">
                         <h3>OUTCOME BASED EDUCATION - {academicYear}</h3>
                    </div>
                    <h2 className='tso-heading'>SCLA - Student Cognitive Level Attainment</h2>
                    {outcomeData && outcomeData.length > 0 ? (
                         <table className="tso-table">
                              <thead>
                                <tr>
                                <th className='tso-header' rowSpan={2}>Reg No</th>
                                    <th className='tso-header' rowSpan={2}>Course Code</th>
                                    <th className='tso-header' colSpan={3}>INTERNAL</th>
                                    <th className='tso-header' colSpan={3}>EXTERNAL</th>
                                    <th className='tso-header' colSpan={3}>TOTAL</th>
                                    <th className='tso-header'rowSpan={2}>GRADE</th>
                                </tr>
                                <tr>
                                    <th className='tso-header'>LOT</th>
                                    <th className='tso-header'>MOT</th>
                                    <th className='tso-header'>HOT</th>
                                    <th className='tso-header'>LOT</th>
                                    <th className='tso-header'>MOT</th>
                                    <th className='tso-header'>HOT</th>
                                    <th className='tso-header'>LOT</th>
                                    <th className='tso-header'>MOT</th>
                                    <th className='tso-header'>HOT</th>
                                </tr>
                            </thead>
                              <tbody>
                                   {outcomeData.map((item, index) => (
                                        <tr key={index}>
                                        <td className='tso-content'>{item.reg_no}</td>
                                        <td className='tso-content'>{item.course_code}</td>
                                        <td className='tso-content-clr'>{item.lot_attainment}</td>
                                        <td className='tso-content-clr'>{item.mot_attainment}</td>
                                        <td className='tso-content-clr'>{item.hot_attainment}</td>
                                        <td className='tso-content'>{item.elot_attainment}</td>
                                        <td className='tso-content'>{item.emot_attainment}</td>
                                        <td className='tso-content'>{item.ehot_attainment}</td>
                                        <td className='tso-content-clr'>{item.overAll_lot}</td>
                                        <td className='tso-content-clr'>{item.overAll_mot}</td>
                                        <td className='tso-content-clr'>{item.overAll_hot}</td>
                                        <td className='tso-content'>{item.final_grade}</td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    ) : (
                         <p className="tso-no-content">No data available. Please refine your Search.</p>
                    )}
                    </div>
               )}
          </div>
     )
}

export default AdminStuOutcome;