import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

function TutorStudent() 
{
    const location = useLocation();
    const [student, setStudent] = useState([]);
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

                         setStudent(response.data);
            if (Array.isArray(response.data)) {
                const updatedStudents = response.data.map(studentdata => {
                    const lot = Number(studentdata.lot_percentage) || 0;
                    const mot = Number(studentdata.mot_percentage) || 0;
                    const hot = Number(studentdata.hot_percentage) || 0;
                    const elot = Number(studentdata.elot_percentage) || 0;
                    const emot = Number(studentdata.emot_percentage) || 0;
                    const ehot = Number(studentdata.ehot_percentage) || 0;
                    const overAll_lot = Number(studentdata.overAll_lot) || 0;
                    const overAll_mot = Number(studentdata.overAll_mot) || 0;
                    const overAll_hot = Number(studentdata.overAll_hot) || 0;
    
                    const overC = (lot + mot + hot) / 3;
                    const overE = (elot + emot + ehot) / 3;
                    const overA = (overAll_lot + overAll_mot + overAll_hot) / 3;
                    
                    let overall;
                    let overallE;
                    let overallCE;
    
                    if (overC > 2) {
                        overall = 'High';
                    } else if (overC > 1) {
                        overall = 'Medium';
                    } else if (overC > 0) {
                        overall = 'Low';
                    } else {
                        overall = 'N/A';
                    }
                    
                    if (overE > 2) {
                        overallE = 'High';
                    } else if (overE > 1) {
                        overallE = 'Medium';
                    } else if (overE > 0) {
                        overallE = 'Low';
                    } else {
                        overallE = 'N/A';
                    }

                    if (overA > 2) {
                        overallCE = 'High';
                    } else if (overA > 1) {
                        overallCE = 'Medium';
                    } else if (overA > 0) {
                        overallCE = 'Low';
                    } else {
                        overallCE = 'N-A';
                    }
    
                    return { ...studentdata, overall, overC, overallE, overE, overA, overallCE};
                });
                setStudent(updatedStudents);
            }

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

               <div className='stu-outcome-container'>
                <span className='stu-outcome-title'>STUDENT OUTCOME</span>
                <table className='stu-outcome-table'>
                    <thead>
                        <tr>
                            <th className='stu-outcome-header'>Reg No</th>
                            {/* <th className='stu-outcome-header'>Dept ID</th> */}
                            {/* <th className='stu-outcome-header'>Course Code</th> */}
                            {/* <th className='stu-outcome-header'>Semester</th> */}
                            <th className='stu-outcome-header'>CIA LOT</th>
                            <th className='stu-outcome-header'>CIA MOT</th>
                            <th className='stu-outcome-header'>CIA HOT </th>
                            {/* <th className='stu-outcome-header'>Over All</th> */}
                            <th className='stu-outcome-header'>ESE LOT </th>
                            <th className='stu-outcome-header'>ESE MOT </th>
                            <th className='stu-outcome-header'>ESE HOT </th>
                            {/* <th className='stu-outcome-header'>Over All ESE</th> */}
                            <th className='stu-outcome-header'>Over All LOT</th>
                            <th className='stu-outcome-header'>Over All HOT</th>
                            <th className='stu-outcome-header'>Over All MOT</th>
                            <th className='stu-outcome-header'>Over All GRADE</th>
                        </tr>
                    </thead>
                    <tbody>
           {student?.map((studentdata, index) => (
                            <tr key={index}>
                                <td className='stu-outcome-content'>{studentdata.reg_no }</td>
                                {/* <td className='stu-outcome-content'>{studentdata.course_id}</td> */}
                                {/* <td className='stu-outcome-content'>{studentdata.course_code}</td> */}
                                {/* <td className='stu-outcome-content'>{studentdata.semester }</td> */}
                                <td className='stu-outcome-content'>{studentdata.lot_percentage}</td>
                                <td className='stu-outcome-content'>{studentdata.mot_percentage}</td>
                                <td className='stu-outcome-content'>{studentdata.hot_percentage}</td>
                                {/* <td className='stu-outcome-content'>{studentdata.overall}</td> */}
                                <td className='stu-outcome-content'>{studentdata.elot_percentage}</td>
                                <td className='stu-outcome-content'>{studentdata.emot_percentage}</td>  
                                <td className='stu-outcome-content'>{studentdata.ehot_percentage}</td>
                                {/* <td className='stu-outcome-content'>{studentdata.overallE}</td> */}
                                <td className='stu-outcome-content'>{studentdata.overAll_lot}</td>
                                <td className='stu-outcome-content'>{studentdata.overAll_mot}</td>  
                                <td className='stu-outcome-content'>{studentdata.overAll_hot}</td>
                                <td className='stu-outcome-content'>{studentdata.overallCE}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
     )
}

export default TutorStudent;
