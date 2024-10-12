import { useEffect, useState } from 'react';
import axios from 'axios';

function StatusReport() 
{
    const apiUrl = process.env.REACT_APP_API_URL;
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
                    });
                    setReportDeptName(response.data);
                } 
                catch (err) {
                    alert('Error fetching status report.');
                    console.log('Error fetching data:', err);
                }
            }
        }
        fetchStatusReport();
    }, [academicYear]);

    return (
        <div>
            <div>
                <span>Status Report</span>
                <div>
                    {reportDeptName.map((dept, index) => (
                        <button key={index}>{dept.dept_name}</button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default StatusReport;