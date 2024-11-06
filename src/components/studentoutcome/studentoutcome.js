import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import './studentoutcome.css';
const apiUrl = process.env.REACT_APP_API_URL;

function StudentOutcome() 
{
    const { staffId } = useParams();
    const navigate = useNavigate();
    const [courseHandle, setCourseHandle] = useState(false);
    const [tutorHandle, setTutorHandle] = useState(false);
    const [hodHandle, setHodHandle] = useState(false);
    const [admin, setAdmin] = useState(false);

    useEffect(() => 
    {
        const checkStaffId = async () => 
        {
            if(staffId === 'ADMIN' || staffId === 'admin' || staffId === 'Admin')
            {
                setAdmin(true);
                return;
            }
            else 
            {
                try 
                {
                    const response = await axios.post(`${apiUrl}/api/checkstaffId`, {
                        staff_id: staffId
                    })

                    if (response.data) 
                    {
                        if (response.data.courseHandleStaffId) {
                            setCourseHandle(true);
                        }
                        if (response.data.tutorHandleStaffId) {
                            setTutorHandle(true);
                        }
                    }
                } 
                catch (err) {
                    console.log('Error fetching data:', err);
                }
            }
        }
        checkStaffId();
    }, [staffId]);

    const handleCourse = () => {
        // navigate(`/staff/${staffId}/coursestudentoutcome`);
    }

    const handleTutor = () => {
        // navigate(`/staff/${staffId}/coursestudentoutcome`);
    }

    const handleHod = () => {
        // navigate(`/staff/${staffId}/coursestudentoutcome`);
    }

    const handleAdmin = () => {
        // navigate(`/staff/${staffId}/coursestudentoutcome`);
    }
    
    return (
        <div className='co-main'>
            <div className="co-layout-top-div">
                <p className="co-layout-staff-id"><span className="co-staff">Staff Id :</span> {staffId}</p>
            </div>
            <div className="co-content-box">
                <div className='co-entire-box'>
                    {courseHandle && (
                        <button className="co-box" onClick={handleCourse}>
                            Course Report
                        </button>
                    )}
                    {tutorHandle && (
                        <button className="co-box" onClick={handleTutor}>
                            Tutor Report
                        </button>
                    )}
                    {hodHandle && (
                        <button className="co-box" onClick={handleHod}>
                            Hod Report
                        </button>
                    )}
                    {admin && (
                        <button className="co-box" onClick={handleAdmin}>
                            Admin Report
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default StudentOutcome;





























































































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Loading from '../../assets/load.svg';
// import './studentoutcome.css';

// const apiUrl = 'http://localhost:5000';

// const StudentOutcome = () => {
//     const [markEntries, setMarkEntries] = useState({
//         batch: [],
//         active_sem: [],
//         course_id: [],
//         category: [],
//         course_code: []
//     });
//     const [students, setStudents] = useState([]);
//     const [student, setStudent] = useState([]);
//     // const [overAll, setOverall] = useState();
//     const [loading, setLoading] = useState(true);

//     const [selectedBatch, setSelectedBatch] = useState('');
//     const [selectedSem, setSelectedSem] = useState('');
//     const [selectedCourseId, setSelectedCourseId] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [selectedCourseCode, setSelectedCourseCode] = useState('');
//     const [selectedSection, setSelectedSection] = useState('');

//     const fetchMarkEntries = async (filters = {}) => {
//         try {
//             const response = await axios.get(`${apiUrl}/api/markentry`, { params: filters });
//             setMarkEntries(response.data);
//         } catch (error) {
//             console.error('Error fetching mark entries:', error);
//         }
//     };

//     const fetchStudents = async () => {
//         try {
//             const response = await axios.get(`${apiUrl}/api/studentmaster`);
//             setStudents(response.data);
//         } catch (error) {
//             console.error('Error fetching student sections:', error);
//         }
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             await fetchMarkEntries();
//             await fetchStudents();
//             setLoading(false);
//         };
//         fetchData();
//     }, []);

//     useEffect(() => {
//         if (selectedBatch) {
//             fetchMarkEntries({ batch: selectedBatch });
//         }
//     }, [selectedBatch]);

//     useEffect(() => {
//         if (selectedCourseId) {
//             fetchMarkEntries({ course_id: selectedCourseId, batch: selectedBatch });
//         }
//     }, [selectedCourseId, selectedBatch]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const data = {
//                 selectedBatch,
//                 selectedSem,
//                 selectedCourseId,
//                 selectedCategory,
//                 selectedCourseCode,
//                 selectedSection
//             };
//             const resData = await axios.get(`${apiUrl}/api/studOutcome`, { params: data });
//             setStudent(resData.data);
//             if (Array.isArray(resData.data)) {
//                 const updatedStudents = resData.data.map(studentdata => {
//                     const lot = Number(studentdata.lot_percentage) || 0;
//                     const mot = Number(studentdata.mot_percentage) || 0;
//                     const hot = Number(studentdata.hot_percentage) || 0;
//                     const elot = Number(studentdata.elot_percentage) || 0;
//                     const emot = Number(studentdata.emot_percentage) || 0;
//                     const ehot = Number(studentdata.ehot_percentage) || 0;
//                     const overAll_lot = Number(studentdata.overAll_lot) || 0;
//                     const overAll_mot = Number(studentdata.overAll_mot) || 0;
//                     const overAll_hot = Number(studentdata.overAll_hot) || 0;
    
//                     const overC = (lot + mot + hot) / 3;
//                     const overE = (elot + emot + ehot) / 3;
//                     const overA = (overAll_lot + overAll_mot + overAll_hot) / 3;
                    
//                     let overall;
//                     let overallE;
//                     let overallCE;
    
//                     if (overC > 2) {
//                         overall = 'High';
//                     } else if (overC > 1) {
//                         overall = 'Medium';
//                     } else if (overC > 0) {
//                         overall = 'Low';
//                     } else {
//                         overall = 'N/A';
//                     }
                    
//                     if (overE > 2) {
//                         overallE = 'High';
//                     } else if (overE > 1) {
//                         overallE = 'Medium';
//                     } else if (overE > 0) {
//                         overallE = 'Low';
//                     } else {
//                         overallE = 'N/A';
//                     }

//                     if (overA > 2) {
//                         overallCE = 'High';
//                     } else if (overA > 1) {
//                         overallCE = 'Medium';
//                     } else if (overA > 0) {
//                         overallCE = 'Low';
//                     } else {
//                         overallCE = 'N/A';
//                     }
    
//                     return { ...studentdata, overall, overC, overallE, overE, overA, overallCE};
//                 });
//                 setStudent(updatedStudents);
//             }

//         } catch (error) {
//             console.log("Error saving student outcome:", error);
//         }
//     };

//     if (loading) {
//         return <img src={Loading} alt="Loading..." />;
//     }

//     return (
//         <div className="student-outcome">
//             <h1>Student Outcome</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Batch:</label>
//                     <select value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)}>
//                         <option value="">Select Batch</option>
//                         {markEntries.batch?.map((batch) => (
//                             <option key={batch} value={batch}>{batch}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <label>Active Semester:</label>
//                     <select value={selectedSem} onChange={(e) => setSelectedSem(e.target.value)}>
//                         <option value="">Select Semester</option>
//                         {markEntries.active_sem?.map((sem) => (
//                             <option key={sem} value={sem}>{sem}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <label>Course ID:</label>
//                     <select value={selectedCourseId} onChange={(e) => setSelectedCourseId(e.target.value)}>
//                         <option value="">Select Course ID</option>
//                         {markEntries.course_id?.map((courseId) => (
//                             <option key={courseId} value={courseId}>{courseId}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <label>Category:</label>
//                     <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
//                         <option value="">Select Category</option>
//                         {markEntries.category?.map((category) => (
//                             <option key={category} value={category}>{category}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <label>Course Code:</label>
//                     <select value={selectedCourseCode} onChange={(e) => setSelectedCourseCode(e.target.value)}>
//                         <option value="">Select Course Code</option>
//                         {markEntries.course_code?.map((courseCode) => (
//                             <option key={courseCode} value={courseCode}>{courseCode}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <label>Section:</label>
//                     <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
//                         <option value="">Select Section</option>
//                         {students?.map((section) => (
//                             <option key={section} value={section}>{section}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <button type="submit">Submit</button>
//             </form>
//             <div className='stu-outcome-container'>
//                 <span className='stu-outcome-title'>STUDENT OUTCOME</span>
//                 <table className='stu-outcome-table'>
//                     <thead>
//                         <tr>
//                             <th className='stu-outcome-header'>Reg No</th>
//                             {/* <th className='stu-outcome-header'>Dept ID</th> */}
//                             {/* <th className='stu-outcome-header'>Course Code</th> */}
//                             {/* <th className='stu-outcome-header'>Semester</th> */}
//                             <th className='stu-outcome-header'>CIA LOT</th>
//                             <th className='stu-outcome-header'>CIA MOT</th>
//                             <th className='stu-outcome-header'>CIA HOT</th>
//                             {/* <th className='stu-outcome-header'>Over All</th> */}
//                             <th className='stu-outcome-header'>ESE LOT </th>
//                             <th className='stu-outcome-header'>ESE MOT </th>
//                             <th className='stu-outcome-header'>ESE HOT </th>
//                             {/* <th className='stu-outcome-header'>Over All ESE</th> */}
//                             <th className='stu-outcome-header'>Over All LOT</th>
//                             <th className='stu-outcome-header'>Over All HOT</th>
//                             <th className='stu-outcome-header'>Over All MOT</th>
//                             <th className='stu-outcome-header'>Over All GRADE</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//            {student?.map((studentdata, index) => (
//                             <tr key={index}>
//                                 <td className='stu-outcome-content'>{studentdata.reg_no }</td>
//                                 {/* <td className='stu-outcome-content'>{studentdata.course_id}</td> */}
//                                 {/* <td className='stu-outcome-content'>{studentdata.course_code}</td> */}
//                                 {/* <td className='stu-outcome-content'>{studentdata.semester }</td> */}
//                                 <td className='stu-outcome-content'>{studentdata.lot_attainment}</td>
//                                 <td className='stu-outcome-content'>{studentdata.mot_attainment}</td>
//                                 <td className='stu-outcome-content'>{studentdata.hot_attainment}</td>
//                                 {/* <td className='stu-outcome-content'>{studentdata.overall}</td> */}
//                                 <td className='stu-outcome-content'>{studentdata.elot_attainment}</td>
//                                 <td className='stu-outcome-content'>{studentdata.emot_attainment}</td>  
//                                 <td className='stu-outcome-content'>{studentdata.ehot_attainment}</td>
//                                 {/* <td className='stu-outcome-content'>{studentdata.overallE}</td> */}
//                                 <td className='stu-outcome-content'>{studentdata.overAll_lot}</td>
//                                 <td className='stu-outcome-content'>{studentdata.overAll_mot}</td>  
//                                 <td className='stu-outcome-content'>{studentdata.overAll_hot}</td>
//                                 <td className='stu-outcome-content'>{studentdata.overallCE}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default StudentOutcome;





// // import React, { useState, useEffect } from 'react';
// // import axios from "axios";
// // import Loading from '../../assets/load.svg';
// // import './studentoutcome.css';

// // function Studentoutcome() {
// //     const [student, setStudent] = useState()
// //     const apiUrl = process.env.REACT_APP_API_URL;

// //     useEffect(() => 
// //         {
// //             const fetchOutcomeMapDetails = async () => 
// //             {
// //                     try {
// //                         const response = await axios.get(`${apiUrl}/api/course_outcome`)
// //                         const outcome = response.data;
// //                         setStudent(outcome)
// //                     } 
// //                     catch (err) {
// //                         console.log('Error fetching data:', err);
// //                     }
// //             }
// //             fetchOutcomeMapDetails();
            
// //         }, [student]);

// //     if (!student) return <div><center><img src={Loading} alt="" className="img" /></center></div>;
// //   return (
// //     <div className='stu-outcome-container'>
// //         <span className='stu-outcome-title'>STUDENT OUTCOME</span>
// //             <table  className='stu-outcome-table'>
// //                 <thead>
// //                     <tr>
// //                         <th className='stu-outcome-header'>Reg No</th>
// //                         <th className='stu-outcome-header'>Dept ID</th>
// //                         <th className='stu-outcome-header'>Course Code</th>
// //                         <th className='stu-outcome-header'>Semester</th>
// //                         <th className='stu-outcome-header'>LOT Percentage</th>
// //                         <th className='stu-outcome-header'>MOT Percentage</th>
// //                         <th className='stu-outcome-header'>HOT Percentage</th>
// //                         <th className='stu-outcome-header'>Over All</th>
// //                         <th className='stu-outcome-header'>Detail</th>
// //                     </tr>
// //                 </thead>
// //                 <tbody>
// //                     {student.map((studentdata, index) => (
// //                         <tr key={index}>
// //                             <td className='stu-outcome-content'>{studentdata.reg_no}</td>
// //                             <td className='stu-outcome-content'>{studentdata.course_id}</td>
// //                             <td className='stu-outcome-content'>{studentdata.course_code}</td>
// //                             <td className='stu-outcome-content'>{studentdata.semester}</td>
// //                             <td className='stu-outcome-content'>{studentdata.lot_percentage}</td>
// //                             <td className='stu-outcome-content'>{studentdata.mot_percentage}</td>
// //                             <td className='stu-outcome-content'>{studentdata.hot_percentage}</td>
// //                             <td className='stu-outcome-content'></td>
// //                             <td className='stu-outcome-content'></td>
// //                         </tr>
// //                     ))}
// //                 </tbody>
// //             </table>
// //         </div>
// //     );
// // }
// // export default Studentoutcome

