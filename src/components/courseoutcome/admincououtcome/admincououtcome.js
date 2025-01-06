import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './admincououtcome.css';
import axios from "axios";
import Loading from '../../../assets/load.svg'

function AdminCouOutcome()  
{
    const apiUrl = process.env.REACT_APP_API_URL;
    const { staffId } = useParams();
    const [academicYear, setAcademicYear] = useState('');
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

        const academicYearSet = async () => 
        {
            try {
                const response = await axios.post(`${apiUrl}/activesem`, {});
                setAcademicYear(response.data.academic_year);
            } 
            catch (err) {
                console.log('Error fetching academic year:', err);
            }
        }
        academicYearSet();

    }, [staffId,apiUrl]);

    if (!attainmentData) return <div><center><img src={Loading} alt="" className="img" /></center></div>;

    return (
        <div className='aco-main'>
            <div className="aco-header">
                <div className="aco-header-title1">
                    <h1 className="">JAMAL MOHAMED COLLEGE (Autonomous)</h1>
                    <span>
                        Nationally Accredited with A++ Grade by NAAC (4th Cycle) with CGPA
                        3.69 out of 4.0
                    </span>
                    <span>Affiliated to Bharathidasan University</span>
                    <h3>TIRUCHIRAPPALLI - 620 020 .</h3>
                </div>
            </div>
            <div className="aco-header-title2">
                <h3>OUTCOME BASED EDUCATION - {academicYear}</h3>
            </div>
            <h2 className='aco-heading'>CCLA - Course Cognitive Level Attainment</h2>
            <table className='aco-table'>
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
                    {Object.keys(attainmentData.overall).map(courseCode => (
                        <tr key={courseCode}>
                            <td>{courseCode}</td>
                            <td className='aco-content-clr'>{attainmentData.lot[courseCode]}</td>
                            <td className='aco-content-clr'>{attainmentData.mot[courseCode]}</td>
                            <td className='aco-content-clr'>{attainmentData.hot[courseCode]}</td>
                            <td>{attainmentData.elot[courseCode]}</td>
                            <td>{attainmentData.emot[courseCode]}</td>
                            <td>{attainmentData.ehot[courseCode]}</td>
                            <td className='aco-content-clr'>{attainmentData.overall[courseCode].lot.toFixed(1)}</td>
                            <td className='aco-content-clr'>{attainmentData.overall[courseCode].mot.toFixed(1)}</td>
                            <td className='aco-content-clr'>{attainmentData.overall[courseCode].hot.toFixed(1)}</td>
                            <td>{attainmentData.grade[courseCode]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2 className='aco-heading'>CAPSO - Course Attainment by Programme Specific Outcome</h2>
            <table className='aco-table'>
                <thead>
                    <tr>
                        <th>Course Code</th>
                        <th>CAPSO1</th>
                        <th>CAPSO2</th>
                        <th>CAPSO3</th>
                        <th>CAPSO4</th>
                        <th>CAPSO5</th>
                        <th>CAPSO</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(attainmentData.capso).map(courseCode => (
                        <tr key={courseCode}>
                            <td>{courseCode}</td>
                            <td>{attainmentData.capso[courseCode].capso1.toFixed(2)}</td>
                            <td>{attainmentData.capso[courseCode].capso2.toFixed(2)}</td>
                            <td>{attainmentData.capso[courseCode].capso3.toFixed(2)}</td>
                            <td>{attainmentData.capso[courseCode].capso4.toFixed(2)}</td>
                            <td>{attainmentData.capso[courseCode].capso5.toFixed(2)}</td>
                            <td>{attainmentData.capso[courseCode].capso.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminCouOutcome;