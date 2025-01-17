import React, { useEffect, useState } from 'react';
import axios from 'axios'

function ProSpecOutcome() 
{
    const [activeTab, setActiveTab] = useState('SpecDept')
    const [academicYear, setAcademicYear] = useState('')
    const [dept, setDept] = useState([]);
    const [selectedDept, setSelectedDept] = useState('');
    const [deptId, setDeptId] = useState([]);
    const [selectedDeptId, setSelectedDeptId] = useState('');
    const [attainmentData, setAttainmentData] = useState(null)
    const [attainmentTable, setAttainmentTable] = useState(false)
    const [programType, setProgramType] = useState('UG');
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchDeptName = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/proDeptName`)
                setAcademicYear(response.data.academic_year)
                setDept(response.data.dept_name)
            }
            catch (error) {
                alert('Error fetching Dept Names');
            }
        }
        fetchDeptName()
    }, [])

    const handleTab = (value) => { setActiveTab((prev) => (activeTab === 'SpecDept' ? 'AllDept' : 'SpecDept')) }

    const handleDeptChange = async (value) => {
        setSelectedDept(value);
        const changeDept = value;
        try {
            const response = await axios.post(`${apiUrl}/api/proDeptIdChange`, { changeDept })
            setDeptId(response.data)
        }
        catch (error) {
            alert('Error fetching Dept Id Names');
        }
    }

    const handleGetOutcomeSpec = async () => {
        try {
            const response = await axios.post(`${apiUrl}/api/proSpecOutcome`, {
                academicYear, selectedDept, selectedDeptId
            })
            setAttainmentData(response.data)
            setAttainmentTable(true)
        }
        catch (error) {
            alert('Error fetching Outcome Results');
        }
    }

    const handleProgramTypeChange = (event) => { setProgramType(event.target.value) }

    const handleGetOutcomeAll = async () => {
        try {
            const response = await axios.post(`${apiUrl}/api/proOutcome`, {
                academicYear, programType
            })
            setAttainmentData(response.data)
            setAttainmentTable(true)
        }
        catch (error) {
            alert('Error fetching Outcome Results');
        }
    }

    return (
        <>
            <button onClick={() => handleTab('SpecDept')}>Pso for spec dept</button>
            <button onClick={() => handleTab('AllDept')}>Pso for all dept</button>
            {activeTab === 'SpecDept' && (
                <div className="aso-main">
                    <div className="aso-dropdown-container">
                        <div className="aso-search-cnt">
                            <span className="aso-label">Academic Year: </span>
                            <input type="text" className="aso-select" value={academicYear} readOnly disabled />
                        </div>
                        <div className="aso-search-cnt">
                            <span className="aso-label">Department: </span>
                            <select
                                className="aso-select"
                                onChange={(e) => handleDeptChange(e.target.value)}
                                value={selectedDept}
                            >
                                <option className="aso-option" value="">
                                    Select
                                </option>
                                {dept.map((dept, index) => (
                                    <option className="aso-option" key={index}>
                                        {dept}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="aso-search-cnt">
                            <span className="aso-label">Class: </span>
                            <select
                                className="aso-select"
                                onChange={(e) => setSelectedDeptId(e.target.value)}
                                value={selectedDeptId}
                            >
                                <option className="aso-option">Select</option>
                                {deptId.map((deptId, index) => (
                                    <option className="aso-option" key={index}>
                                        {deptId}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="aso-btn-content">
                        <button className="aso-btn" onClick={handleGetOutcomeSpec}>
                            Get
                        </button>
                    </div>
                    {attainmentTable && (
                        <div className="aso-table-container">
                            <div className="aso-header">
                                <div className="aso-header-title1">
                                    <h1>JAMAL MOHAMED COLLEGE (Autonomous)</h1>
                                    <span>
                                        Nationally Accredited with A++ Grade by NAAC (4th Cycle) with CGPA
                                        3.69 out of 4.0
                                    </span>
                                    <span>Affiliated to Bharathidasan University</span>
                                    <h3>TIRUCHIRAPPALLI - 620 020</h3>
                                </div>
                            </div>
                            <div className="aso-header-title2">
                                <h3>OUTCOME BASED EDUCATION - {academicYear}</h3>
                            </div>
                            <h2 className="aso-heading">SCLA - Student Cognitive Level Attainment</h2>
                            {attainmentData.overall ? (
                                <table className="aso-table">
                                    <thead>
                                        <tr>
                                            <th>S No</th>
                                            <th>Course Code</th>
                                            <th>OBE Level</th>
                                            <th>Course Outcome</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(attainmentData.overall).map((courseCode, index) => (
                                            <tr key={courseCode}>
                                                <td>{index + 1}</td>
                                                <td>{courseCode}</td>
                                                <td>{attainmentData.avgOverallScore[courseCode]?.toFixed(2)}</td>
                                                <td>{attainmentData.grade[courseCode]}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan={3}><strong>Program Specific Outcome ( PSO )</strong></td>
                                            <td>{attainmentData.meanScores?.pso?.toFixed(2)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            ) : (
                                <p className="aso-no-content">No Data Available. Please refine your search.</p>
                            )}
                        </div>
                    )}
                </div>
            )}
            {activeTab === 'AllDept' && (
                <div className="aso-main">
                    <div className="aso-dropdown-container">
                        <div className="aso-search-cnt">
                            <span className="aso-label">Academic Year: </span>
                            <input type="text" className="aso-select" value={academicYear} readOnly disabled />
                        </div>
                        <div className="aso-search-cnt">
                            <span className="aso-label">Program Type: </span>
                            <label>
                                <input
                                    type="radio"
                                    name="programType"
                                    value="UG"
                                    checked={programType === 'UG'}
                                    onChange={handleProgramTypeChange}
                                />
                                UG
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="programType"
                                    value="PG"
                                    checked={programType === 'PG'}
                                    onChange={handleProgramTypeChange}
                                />
                                PG
                            </label>
                        </div>
                    </div>
                    <div className="aso-btn-content">
                        <button className="aso-btn" onClick={handleGetOutcomeAll}>
                            Get
                        </button>
                    </div>
                    {attainmentTable && (
                        <div className="aso-table-container">
                            <div className="aso-header">
                                <div className="aso-header-title1">
                                    <h1>JAMAL MOHAMED COLLEGE (Autonomous)</h1>
                                    <span>
                                        Nationally Accredited with A++ Grade by NAAC (4th Cycle) with CGPA
                                        3.69 out of 4.0
                                    </span>
                                    <span>Affiliated to Bharathidasan University</span>
                                    <h3>TIRUCHIRAPPALLI - 620 020</h3>
                                </div>
                            </div>
                            <div className="aso-header-title2">
                                <h3>OUTCOME BASED EDUCATION - {academicYear}</h3>
                            </div>
                            <h2 className="aso-heading">SCLA - Student Cognitive Level Attainment</h2>
                            <table className="aso-table">
                                <thead>
                                    <tr>
                                        <th>S No</th>
                                        <th>Department Name</th>
                                        <th>Pso value</th>
                                        <th>Grade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(attainmentData.departmentResults).map(([department, data], deptIndex) => {
                                        const psoValue = data.meanScores?.pso?.toFixed(2);
                                        const grade = data.grade;
                                        return (
                                            <tr key={department}>
                                                <td>{deptIndex + 1}</td>
                                                <td>{department}</td>
                                                <td>{psoValue || '-'}</td>
                                                <td>{grade || '-'}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default ProSpecOutcome;