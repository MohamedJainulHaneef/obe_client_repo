import { useEffect, useState, React } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

function TutorReport() 
{
     const { staffId } = useParams();
     const [academicYear, setAcademicYear] = useState('');

     useEffect(() => 
     {
          const academicYearSet = async () => 
          {
               try {
                    const response = await axios.post(`${apiUrl}/activesem`, {});
                    setAcademicYear(response.data.academic_year);
                    console.log(response.data.academic_year)
               }
               catch (err) {
                    console.log('Error fetching data:', err);
               }
          }
          academicYearSet();
     }, []);

     useEffect(() => 
     {
          const fetchTutorRepoCode = async () => 
          {
               if (academicYear) 
               {
                    try 
                    {
                         const response = await axios.post(`${apiUrl}/api/tutorreportcode`, {
                              staff_id: staffId,
                              academic_year: academicYear
                         })
                         console.log(staffId,academicYear)  
                    } 
                    catch (err) {
                         console.log('Error fetching data:', err);
                    }
               }
          }
          fetchTutorRepoCode();
          
     }, [staffId, academicYear]);

     return (
          <div>
               Tutor Report
          </div>
     )
}

export default TutorReport;