import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import './tutorcououtcome.css';
import Loading from '../../../assets/load.svg'
const apiUrl = process.env.REACT_APP_API_URL;

function TutorCouOutcome() 
{
    const { staffId } = useParams();
    const [academicSem, setAcademicSem] = useState('');
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
                <h3>OUTCOME BASED EDUCATION - {academicSem}</h3>
            </div>
            <h2 className='tco-heading'>CCLA - Course Cognitive Level Attainment</h2>
            <table className='tco-table'>
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
                            <td className='tco-content-cia'>{attainmentData.lot[courseCode]}</td>
                            <td className='tco-content-cia'>{attainmentData.mot[courseCode]}</td>
                            <td className='tco-content-cia'>{attainmentData.hot[courseCode]}</td>
                            <td className='tco-content-ese'>{attainmentData.elot[courseCode]}</td>
                            <td className='tco-content-ese'>{attainmentData.emot[courseCode]}</td>
                            <td className='tco-content-ese'>{attainmentData.ehot[courseCode]}</td>
                            <td className='tco-content-all'>{attainmentData.overall[courseCode].lot}</td>
                            <td className='tco-content-all'>{attainmentData.overall[courseCode].mot}</td>
                            <td className='tco-content-all'>{attainmentData.overall[courseCode].hot}</td>
                            <td>{attainmentData.grade[courseCode]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2 className='tco-heading'>CAPSO - Course Attainment by Programme Specific Outcome</h2>
            <table className='tco-table'>
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
            <h2 className='tco-heading'>PSO - Programme Specific Outcome</h2>
            <table className='tco-table'>
                <thead>
                    <tr>
                        <th>CAPSO1 Mean</th>
                        <th>CAPSO2 Mean</th>
                        <th>CAPSO3 Mean</th>
                        <th>CAPSO4 Mean</th>
                        <th>CAPSO5 Mean</th>
                        <th>PSO</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{attainmentData.meanScores.pso1.toFixed(2)}</td>
                        <td>{attainmentData.meanScores.pso2.toFixed(2)}</td>
                        <td>{attainmentData.meanScores.pso3.toFixed(2)}</td>
                        <td>{attainmentData.meanScores.pso4.toFixed(2)}</td>
                        <td>{attainmentData.meanScores.pso5.toFixed(2)}</td>
                        <td>{attainmentData.meanScores.pso.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TutorCouOutcome;