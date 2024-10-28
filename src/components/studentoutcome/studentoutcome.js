import React, { useState, useEffect } from 'react';
import axios from "axios";
import Loading from '../../assets/load.svg'

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
    <div>
            <table>
                <thead>
                    <tr>
                        <th>Reg No</th>
                        <th>Course ID</th>
                        <th>Semester</th>
                        <th>LOT Percentage</th>
                        <th>MOT Percentage</th>
                        <th>HOT Percentage</th>
                        <th>Over All</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {student.map((studentdata, index) => (
                        <tr key={index}>
                            <td>{studentdata.reg_no}</td>
                            <td>{studentdata.course_id}</td>
                            <td>{studentdata.semester}</td>
                            <td>{studentdata.lot_percentage}</td>
                            <td>{studentdata.mot_percentage}</td>
                            <td>{studentdata.hot_percentage}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Studentoutcome