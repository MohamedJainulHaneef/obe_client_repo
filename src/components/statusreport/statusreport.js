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
    const [admin, setAdmin] = useState(false);
    const [mentor, setMentor] = useState(false);
    const [hod, setHod] = useState(false);
   
    useEffect(()=> 
    {
        const checkStaffId = async () => {

            if(staffId === 'ADMIN' || staffId === 'Admin' || staffId === 'admin') { setAdmin(true) }
            else 
            {
                try {
                    const response = await axios.post(`${apiUrl}/api/chkstaffId`, { staff_id: staffId })

                    if (response.data) {
                        if (response.data.tutorHandleStaffId) { setMentor(true) }
                        if (response.data.hodHandleStaffId) { setHod(true) }
                    }
                } 
                catch (err) { console.log('Error fetching data:', err) }
            }
        }
        checkStaffId();
    },[staffId])

    useEffect(() => 
    {
        const academicSemSet = async () => 
        {
            try {
                const response = await axios.post(`${apiUrl}/activesem`, {});
                setAcademicSem(response.data.academic_sem);
            } 
            catch (err) { alert('Error fetching Academic Year.') } 
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
        if (dept === "ALL") { navigate(`/staff/${staffId}/alldepartments/departmentreport`) } 
        else { navigate(`/staff/${staffId}/${dept}/departmentreport`) }
    }

    const handleMatrixReport = () => navigate(`/staff/${staffId}/matrixreport`);
    const handleEseReport = () => navigate(`/staff/${staffId}/esereport`);
    const handleHod = () => navigate(`/staff/${staffId}/hodreport`);
    const handleMentor = () => navigate(`/staff/${staffId}/tutorreport`);

    return (
        <div className='report-main'>
            {(admin || hod || mentor) ? (
                <div className='report-entire-wrapper'>
                    <div className='report-entire-content'>
                        {admin && (
                            <>
                                <button className='report-btn' onClick={() => handleDeptReport("ALL")}>ALL</button>
                                <button className='report-btn' onClick={handleMatrixReport}>RELATIONSHIP MATRIX</button>
                                <button className='report-btn' onClick={handleEseReport}>ESE</button>
                                {reportDeptName.map((dept, index) => (
                                    <button key={index} className='report-btn' onClick={() => handleDeptReport(dept)}>{dept}</button>
                                ))}
                            </>
                        )}
                        {hod && <button className='report-btn' onClick={handleHod}>DEPT WISE REPORT</button>}
                        {mentor && <button className='report-btn' onClick={handleMentor}>CLASS WISE REPORT</button>}
                    </div>
                </div>
            ) : (
                <div className='report-content-div'>
                    <div className="rsmatrix-no-code">
                        <p>No Report Found for this ID</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default StatusReport;
