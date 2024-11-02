import { useEffect, useState, React } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import './tutorreport.css';
const apiUrl = process.env.REACT_APP_API_URL;

function TutorReport() 
{
     const { staffId } = useParams();
     const [academicYear, setAcademicYear] = useState('');
     const [tutorCourseCode, setTutorCourseCode] = useState([]);

     useEffect(() => 
     {
          const fetchAcademicYear = async () => 
          {
               try {
                    const response = await axios.post(`${apiUrl}/activesem`, {});
                    setAcademicYear(response.data.academic_year);
                    console.log("Academic Year:", response.data.academic_year);
               }
               catch (err) {
                    console.log('Error fetching academic year:', err);
               }
          }
          fetchAcademicYear();
     }, []);
     
     useEffect(() => 
     {
          const fetchTutorCourseCodes = async () => 
          {
               if (academicYear) 
               {
                    try {
                         const response = await axios.post(`${apiUrl}/api/tutorreportcode`, {
                              staff_id: staffId,
                              academic_year: academicYear
                         });
                         setTutorCourseCode(response.data.uniqueCourseCodes);
                         console.log("Tutor Course Codes:", response.data.mentorStuReg);
                    } 
                    catch (err) {
                         console.log('Error fetching tutor course codes:', err);
                    }
               }
          }
          fetchTutorCourseCodes();
                    
     }, [staffId, academicYear]);

     const handleCourseClick = (courseCode) => {
          navigate('/course-details', { state: { mentorStuReg, courseCode } });
     };
     
     return (
          <div>
               <div >
                    <button >
                         {tutorCourseCode.map((courseCode, index) => (
                              <button 
                                   key={index} 
                                   className='trepo-btn-content'
                                   onClick={() => handleCourseClick(courseCode)} 
                              >
                                   <span>{courseCode}</span>
                              </button>
                         ))}
                    </button>
               </div>
          </div>
     )
}

export default TutorReport;