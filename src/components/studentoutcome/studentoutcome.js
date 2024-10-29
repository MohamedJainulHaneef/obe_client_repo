import React, { useState, useEffect } from 'react';
import axios from "axios";
import Loading from '../../assets/load.svg';
import './studentoutcome.css';

function Studentoutcome() {
    const [student, setStudent] = useState()
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => 
        {
            const fetchOutcomeMapDetails = async () => 
            {
                    try {
                        const response = await axios.get(`${apiUrl}/api/course_outcome`)
                        const outcome = response.data;
                        setStudent(outcome)
                    } 
                    catch (err) {
                        console.log('Error fetching data:', err);
                    }
            }
            fetchOutcomeMapDetails();
            
        }, [student]);

    if (!student) return <div><center><img src={Loading} alt="" className="img" /></center></div>;
  return (
    <div className='stu-outcome-container'>
        <span className='stu-outcome-title'>STUDENT OUTCOME</span>
            <table  className='stu-outcome-table'>
                <thead>
                    <tr>
                        <th className='stu-outcome-header'>Reg No</th>
                        <th className='stu-outcome-header'>Dept ID</th>
                        <th className='stu-outcome-header'>Course Code</th>
                        <th className='stu-outcome-header'>Semester</th>
                        <th className='stu-outcome-header'>LOT Percentage</th>
                        <th className='stu-outcome-header'>MOT Percentage</th>
                        <th className='stu-outcome-header'>HOT Percentage</th>
                        <th className='stu-outcome-header'>Over All</th>
                        <th className='stu-outcome-header'>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {student.map((studentdata, index) => (
                        <tr key={index}>
                            <td className='stu-outcome-content'>{studentdata.reg_no}</td>
                            <td className='stu-outcome-content'>{studentdata.course_id}</td>
                            <td className='stu-outcome-content'>{studentdata.course_code}</td>
                            <td className='stu-outcome-content'>{studentdata.semester}</td>
                            <td className='stu-outcome-content'>{studentdata.lot_percentage}</td>
                            <td className='stu-outcome-content'>{studentdata.mot_percentage}</td>
                            <td className='stu-outcome-content'>{studentdata.hot_percentage}</td>
                            <td className='stu-outcome-content'></td>
                            <td className='stu-outcome-content'></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Studentoutcome