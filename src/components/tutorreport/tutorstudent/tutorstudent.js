import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

function TutorStudent() 
{
    const location = useLocation();
    const { uniqueValues, courseCode } = location.state || {};

    useEffect(() => 
     {
          const fetchTutorCourseCodes = async () => 
          {
               if (uniqueValues && uniqueValues.length > 0) 
               {
                    const dataToSend = uniqueValues.map(item => (
                    {
                         courseId: item.course_id,
                         category: item.category,
                         section: item.section
                    }))

                    try {
                         const response = await axios.post(`${apiUrl}/api/tutorstudent`, {
                              uniqueValues: dataToSend,
                              courseCode
                         })
                    } 
                    catch (err) {
                         console.log('Error sending unique values to backend:', err);
                    }
               } 
               else {
                    console.log('No unique values to send.');
               }
          };
          fetchTutorCourseCodes();

     }, [uniqueValues, courseCode]);

     return (
          <div>
               Hello
          </div>
     )
}

export default TutorStudent;
