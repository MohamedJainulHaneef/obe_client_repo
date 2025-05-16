import React, { useEffect, useState } from 'react';
import './prooutcome.css';
import jmclogo from '../../assets/jmclogo.png';
import axios from 'axios';

function ObeReport() 
{
    const apiUrl = process.env.REACT_APP_API_URL;
    const [attainmentSpecData, setAttainmentSpecData] = useState({});

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/specReport`);
                setAttainmentSpecData(response.data);
                console.log("All Departments' Data:", response.data);
            }
            catch (error) { console.error("Error fetching report:", error) }
        };
        fetchReport();
    }, [apiUrl]);

    return (
        <div className="pro-main">
            {Object.keys(attainmentSpecData).length === 0 ? (
                <p className="pro-no-content">No Data Available. Please refine your Search.</p>
            ) : (
                Object.entries(attainmentSpecData).map(([deptId, deptData]) => (
                    <>
                        <div key={deptId} className='pro-a4'>
                            <div className='pro-top'>
                                <div>
                                    <img src={jmclogo} alt="LOGO" className="pro-logo" />
                                </div>
                                <div className='pro-clg'>
                                    <p className='pro-p1'>JAMAL MOHAMED COLLEGE (Autonomous)</p>
                                    <p className='pro-p2'>TIRUCHIRAPPALLI - 620 020.</p>
                                    <p className='pro-p3'>OFFICE OF THE CONTROLLER OF EXAMINATIONS.</p>
                                </div>
                            </div>
                            <h4 className="pro-procedure">Steps to Calculate the Attainment of Programme Specific Outcome</h4>
                            <ol className='pro-olist'>
                                <li className='pro-list'>The CIA and ESE marks are normalized to a common scale value of 100.</li>
                                <li className='pro-list'>From the above normalized values, a weightage of 40% is assigned to the CIA Component and a weightage of 60% is assigned to the ESE component.</li>
                                <li className='pro-list'>These values are summed up to get a OBE score. A OBE scale value of 1 to 4 and the level of attainment (Low, Moderate, High and Excellent) by a student on a specific course is determined based on this score.  This is shown in Table 1.</li>
                                <li className='pro-list'>A mean of the OBE scale value for all the students indicate the attainment level of the particular course. This is shown in Table 2.</li>
                                <li className='pro-list'>The mean of the OBE scale value for all the courses of a specific programme determines attainment level of that specific programme. This is shown in Table 3.</li>
                            </ol>
                            <h4 className="pro-procedure-table">Table 1 : Weightage by students and scale used to assess the attainment for PG</h4>
                            <table className="pro-table">
                                <thead>
                                    <tr>
                                        <th>Weightage Obtained</th>
                                        <th>Scale Used</th>
                                        <th>Level of Attainment of Outcome</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>0 - 50</td>
                                        <td>1</td>
                                        <td>Low</td>
                                    </tr>
                                    <tr>
                                        <td>51 - 80</td>
                                        <td>2</td>
                                        <td>Moderate</td>
                                    </tr>
                                    <tr>
                                        <td>81 - 100</td>
                                        <td>3</td>
                                        <td>High</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h4 className="pro-procedure-table">Table 2 : Scale used to assess the Course Outcome for PG</h4>
                            <table className="pro-table">
                                <thead>
                                    <tr>
                                        <th>Scale Used</th>
                                        <th>Level of Attainment of Outcome</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>0 - 1.0</td>
                                        <td>Low</td>
                                    </tr>
                                    <tr>
                                        <td>1.1 - 2.0</td>
                                        <td>Moderate</td>
                                    </tr>
                                    <tr>
                                        <td>2.1 - 3.0</td>
                                        <td>High</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div key={deptId} className='pro-a4'>
                            <div className='pro-top'>
                                <div>
                                    <img src={jmclogo} alt="LOGO" className="pro-logo" />
                                </div>
                                <div className='pro-clg'>
                                    <p className='pro-p1'>JAMAL MOHAMED COLLEGE (Autonomous)</p>
                                    <p className='pro-p2'>TIRUCHIRAPPALLI - 620 020.</p>
                                    <p className='pro-p3'>OFFICE OF THE CONTROLLER OF EXAMINATIONS.</p>
                                </div>
                            </div>
                            <p className="pro-title">Attainment of Course Outcome</p>
                            <div className="pro-info">
                                <p><strong>Programme :</strong> {deptId}</p>
                                <p><strong>Period of Study :</strong></p>
                            </div>
                            {deptData?.overall ? (
                                <table className="pro-table">
                                    <thead>
                                        <tr>
                                            <th>S No</th>
                                            <th>Course Code</th>
                                            <th>OBE Level</th>
                                            <th>Course Outcome</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(deptData.overall).map((courseCode, index) => (
                                            <tr key={courseCode}>
                                                <td>{index + 1}</td>
                                                <td>{courseCode}</td>
                                                <td>{deptData.avgOverallScore[courseCode]?.toFixed(2)}</td>
                                                <td>{deptData.grade[courseCode]}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan={3}><strong>Program Specific Outcome (PSO)</strong></td>
                                            <td>{deptData.meanScores?.pso?.toFixed(2)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            ) : (
                                <p className="pro-no-content">No Data Available for this department.</p>
                            )}
                            <h3 className='pro-coe'>Controller of Examinations</h3>
                        </div>
                    </>
                ))
            )}
        </div>
    )
}

export default ObeReport;
