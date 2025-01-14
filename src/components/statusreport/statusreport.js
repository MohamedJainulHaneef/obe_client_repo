import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import './statusreport.css'

function StatusReport() 
{
    const apiUrl = process.env.REACT_APP_API_URL;
    const { staffId } = useParams();
    const navigate = useNavigate();
    const [academicSem, setAcademicSem] = useState('');
    const [reportDeptName, setReportDeptName] = useState([]);
   
    useEffect(() => 
    {
        const academicSemSet = async () => 
        {
            try {
                const response = await axios.post(`${apiUrl}/activesem`, {});
                setAcademicSem(response.data.academic_sem);
            } 
            catch (err) {
                alert('Error fetching Academic Year.');
            } 
        }
        academicSemSet();

    }, [])

    useEffect(() => 
    {
        const fetchStatusReport = async () => 
        {
            if (academicSem) 
            {
                try {
                    const response = await axios.post(`${apiUrl}/api/statusDeptName`, {
                        academicSem,
                    })
                    const sortedDepartments = response.data.sort((a, b) => a.localeCompare(b))
                    setReportDeptName(sortedDepartments);
                } 
                catch (err) {
                    alert('Error fetching status report.');
                    console.log('Error fetching data:', err);
                }
            }
        }
        fetchStatusReport();
    }, [academicSem]);

    const handleDeptReport = (dept) => 
    {
        if (dept === "ALL") {
            navigate(`/staff/${staffId}/alldepartments/departmentreport`);
        } 
        else {
            navigate(`/staff/${staffId}/${dept}/departmentreport`);
        }
    }

    const handleMatrixReport = () => 
    {
        navigate(`/staff/${staffId}/matrixreport`);
    }

    const handleEseReport = () => 
    {
        navigate(`/staff/${staffId}/esereport`);
    }

    return (
        <div className='report-main'>
            <div className='report-entire-wrapper'>
                <div className='report-entire-content'>
                    <button className='report-btn' onClick={() => handleDeptReport("ALL")}>ALL</button>
                    <button className='report-btn' onClick={handleMatrixReport}>RELATIONSHIP MATRIX</button>
                    <button className='report-btn' onClick={handleEseReport}>ESE</button>
                    {reportDeptName.map((dept, index) => (
                        <button key={index} className='report-btn' onClick={() => handleDeptReport(dept)}>{dept}</button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default StatusReport;
