import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './admincououtcome.css';
import axios from "axios";
import Loading from '../../../assets/load.svg'

function AdminCouOutcome()  
{
    const apiUrl = process.env.REACT_APP_API_URL;
    const { staffId } = useParams();
    const [academicSem, setAcademicSem] = useState('');
    const [attainmentData, setAttainmentData] = useState(null);

    useEffect(() => 
    {
        const checkStaffId = async () => 
        {
            try {
                const response = await axios.post(`${apiUrl}/api/checkAdminCOC`, {})
                setAttainmentData(response.data.attainedScores); 
            } 
            catch (err) {
                console.log('Error fetching data:', err);
            }
        }
        checkStaffId();

        const academicSemSet = async () => 
        {
            try {
                const response = await axios.post(`${apiUrl}/activesem`, {});
                setAcademicSem(response.data.academic_sem);
            } 
            catch (err) {
                console.log('Error fetching academic year:', err);
            }
        }
        academicSemSet();

    }, [staffId,apiUrl]);

    if (!attainmentData) return <div><center><img src={Loading} alt="" className="img" /></center></div>;

    return (
        <div className="aco-main">
            <div className="aco-header">
                <div className="aco-header-title1">
                    <h1>JAMAL MOHAMED COLLEGE (Autonomous)</h1>
                    <span>
                        Nationally Accredited with A++ Grade by NAAC (4th Cycle) with CGPA
                        3.69 out of 4.0
                    </span>
                    <span>Affiliated to Bharathidasan University</span>
                    <h3>TIRUCHIRAPPALLI - 620 020 .</h3>
                </div>
            </div>
            <div className="aco-header-title2">
                <h3>OUTCOME BASED EDUCATION - {academicSem}</h3>
            </div>
            <h2 className="aco-heading">CCLA - Course Cognitive Level Attainment</h2>
            <div className="aco-table-container">
                <table className="aco-table">
                    <thead>
                        <tr>
                            <th rowSpan={2}>Course Code</th>
                            <th colSpan={3}>INTERNAL</th>
                            <th colSpan={3}>EXTERNAL</th>
                            <th colSpan={3}>TOTAL</th>
                            <th rowSpan={2}>Grade</th>
                        </tr>
                        <tr>
                            <th>LOT</th>
                            <th>MOT</th>
                            <th>HOT</th>
                            <th>LOT</th>
                            <th>MOT</th>
                            <th>HOT</th>
                            <th>LOT</th>
                            <th>MOT</th>
                            <th>HOT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(attainmentData.overall).map((courseCode) => (
                            <tr key={courseCode}>
                                <td>{courseCode}</td>
                                <td className="aco-content-cia">{attainmentData.lot[courseCode]}</td>
                                <td className="aco-content-cia">{attainmentData.mot[courseCode]}</td>
                                <td className="aco-content-cia">{attainmentData.hot[courseCode]}</td>
                                <td className="aco-content-ese">{attainmentData.elot[courseCode]}</td>
                                <td className="aco-content-ese">{attainmentData.emot[courseCode]}</td>
                                <td className="aco-content-ese">{attainmentData.ehot[courseCode]}</td>
                                <td className="aco-content-all">{attainmentData.overall[courseCode].lot}</td>
                                <td className="aco-content-all">{attainmentData.overall[courseCode].mot}</td>
                                <td className="aco-content-all">{attainmentData.overall[courseCode].hot}</td>
                                <td>{attainmentData.grade[courseCode]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default AdminCouOutcome;