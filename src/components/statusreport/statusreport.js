import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import './statusreport.css'

function StatusReport() 
{
    const apiUrl = process.env.REACT_APP_API_URL;
    const { staffId } = useParams();
    const navigate = useNavigate();
    const [academicYear, setAcademicYear] = useState('');
    const [reportDeptName, setReportDeptName] = useState([]);
   
    useEffect(() => 
    {
        const academicYearSet = async () => 
        {
            try {
                const response = await axios.post(`${apiUrl}/activesem`, {});
                setAcademicYear(response.data.academic_year);
            } 
            catch (err) {
                alert('Error fetching Academic Year.');
            } 
        }
        academicYearSet();

    }, [])

    useEffect(() => 
    {
        const fetchStatusReport = async () => 
        {
            if (academicYear) 
            {
                try {
                    const response = await axios.post(`${apiUrl}/api/statusDeptName`, {
                        academicYear,
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
    }, [academicYear]);

    const handleDeptReport = (dept) => {
        navigate(`/staff/${staffId}/${dept}/departmentreport`);
    }

    return (
        <div className='report-main'>
            <div className='report-entire-wrapper'>
                <div className='report-entire-content'>
                    {reportDeptName.map((dept, index) => (
                        <button key={index} className='report-btn' onClick={() => handleDeptReport(dept)}>{dept}</button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default StatusReport;