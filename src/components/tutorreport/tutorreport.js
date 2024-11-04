// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import './tutorreport.css';

// function TutorReport() {
// 	const { staffId } = useParams();

// 	return (
// 		<div className='trepo-main'>
// 			<div className="trepo-layout-top-div">
// 				<p className="trepo-layout-staff-id"><span>Staff Id :</span> {staffId}</p>
// 			</div>
// 			<div className="trepo-parent">
// 				<div className="trepo-box">
// 					<p><strong>COURSE REPORT</strong></p>
// 				</div>
// 				<div className="trepo-box">
// 					<p><strong>STUDENT REPORT</strong></p>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default TutorReport;

import React from 'react'

function TutorReport() {
  return (
    <div></div>
  )
}

export default TutorReport;







































































































// import { useEffect, useState, React } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from "axios";
// import './tutorreport.css';
// const apiUrl = process.env.REACT_APP_API_URL;
// // Hello Komali

// function TutorReport()
// {
//      const { staffId } = useParams();
//      const navigate = useNavigate();
//      const [academicYear, setAcademicYear] = useState('');
//      const [tutorCourseCode, setTutorCourseCode] = useState([]);
//      const [mentorStuReg, setMentorStuReg] = useState([]);

//      useEffect(() =>
//      {
//           const fetchAcademicYear = async () =>
//           {
//                try {
//                     const response = await axios.post(`${apiUrl}/activesem`, {});
//                     setAcademicYear(response.data.academic_year);
//                }
//                catch (err) {
//                     console.log('Error fetching academic year:', err);
//                }
//           };
//           fetchAcademicYear();
//      }, []);

//      useEffect(() =>
//      {
//           const fetchTutorCourseCodes = async () =>
//           {
//                if (academicYear)
//                {
//                     try {
//                          const response = await axios.post(`${apiUrl}/api/tutorreportcode`, {
//                               staff_id: staffId,
//                               academic_year: academicYear
//                          });
//                          setTutorCourseCode(response.data.uniqueCourseCodes);
//                          setMentorStuReg(response.data.mentorStuReg);
//                     }
//                     catch (err) {
//                          console.log('Error fetching tutor course codes:', err);
//                     }
//                }
//           };
//           fetchTutorCourseCodes();

//      }, [staffId, academicYear]);

//      const handleCourseClick = (courseCode) =>
//      {
//           if (mentorStuReg && mentorStuReg.length > 0)
//           {
//                const uniqueStudents = new Set();
//                const uniqueValues = [];
//                mentorStuReg.forEach(student =>
//                {
//                     const uniqueKey = `${student.course_id}-${student.category}-${student.section}`;
//                     if (!uniqueStudents.has(uniqueKey))
//                     {
//                          uniqueStudents.add(uniqueKey);
//                          uniqueValues.push(
//                          {
//                               course_id: student.course_id,
//                               category: student.category,
//                               section: student.section,
//                          })
//                     }
//                })
//               navigate(`/staff/${staffId}/tutorstudentoutcome`, { state: { uniqueValues, courseCode } });
//           }
//           else {
//               console.log("Error Found");
//           }
//      }

//      return (
//           <div>
//                <div >
//                     {tutorCourseCode.map((courseCode, index) => (
//                          <button
//                               key={index}
//                               className='trepo-btn-content'
//                               onClick={() => handleCourseClick(courseCode)}
//                          >
//                               <span>{courseCode}</span>
//                          </button>
//                     ))}
//                </div>
//           </div>
//      );
// }

// export default TutorReport;
