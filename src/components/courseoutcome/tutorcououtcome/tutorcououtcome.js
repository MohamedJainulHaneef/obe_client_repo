import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import './tutorcououtcome.css';
import Loading from '../../../assets/load.svg'
const apiUrl = process.env.REACT_APP_API_URL;

function TutorCouOutcome() 
{
    const { staffId } = useParams();
    const [academicYear, setAcademicYear] = useState('');
    const [attainmentData, setAttainmentData] = useState(null);

    useEffect(() => 
    {
        const checkStaffId = async () => 
        {
            try {
                const response = await axios.post(`${apiUrl}/api/checkTutorCOC`, {
                    staff_id: staffId
                })
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
        <div className='tco-main'>
            <div className="tco-header">
                <div className="tco-header-title1">
                    <h1 className="">JAMAL MOHAMED COLLEGE (Autonomous)</h1>
                    <span>
                        Nationally Accredited with A++ Grade by NAAC (4th Cycle) with CGPA
                        3.69 out of 4.0
                    </span>
                    <span>Affiliated to Bharathidasan University</span>
                    <h3>TIRUCHIRAPPALLI - 620 020 .</h3>
                </div>
            </div>
            <div className="tco-header-title2">
                <h3>OUTCOME BASED EDUCATION - {academicYear}</h3>
            </div>
            <h2 className='tco-heading'>Attainment Levels of Courses</h2>
            <table className='tco-table'>
                <thead>
                    <tr>
                        <th>Course Code</th>
                        <th>CIA Lot</th>
                        <th>CIA Mot</th>
                        <th>CIA Hot</th>
                        <th>ESE Lot</th>
                        <th>ESE Mot</th>
                        <th>ESE Hot</th>
                        <th>Overall Lot</th>
                        <th>Overall Mot</th>
                        <th>Overall Hot</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(attainmentData.overall).map(courseCode => (
                        <tr key={courseCode}>
                            <td>{courseCode}</td>
                            <td>{attainmentData.lot[courseCode]}</td>
                            <td>{attainmentData.mot[courseCode]}</td>
                            <td>{attainmentData.hot[courseCode]}</td>
                            <td>{attainmentData.elot[courseCode]}</td>
                            <td>{attainmentData.emot[courseCode]}</td>
                            <td>{attainmentData.ehot[courseCode]}</td>
                            <td>{attainmentData.overall[courseCode].lot.toFixed(1)}</td>
                            <td>{attainmentData.overall[courseCode].mot.toFixed(1)}</td>
                            <td>{attainmentData.overall[courseCode].hot.toFixed(1)}</td>
                            <td>{attainmentData.grade[courseCode]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TutorCouOutcome;