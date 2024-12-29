import { useEffect, useState, React } from 'react';
import axios from "axios";
import './hodreport.css';
import { useParams } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

function HodReport() 
{
    const { staffId } = useParams();
    const [ deptStatus, setDeptStatus ] = useState([]);

    useEffect(() => {

        const fetchDeptStatus = async () => {
            const response = await axios.post(`${apiUrl}/api/deptStatus`, {
                staff_id: staffId
            })
            setDeptStatus(response.data);
        }
        fetchDeptStatus();
    }, [apiUrl, staffId]);

    const filteredDeptStatus = deptStatus.filter(dept =>
        ![dept.cia_1, dept.cia_2, dept.ass_1, dept.ass_2].every(status => status === "Completed")
    )

    const sortedDeptStatus = filteredDeptStatus.sort((a, b) => {
        const classA = `${a.semester}${a.course_id}${a.section}`;
        const classB = `${b.semester}${b.course_id}${b.section}`;
        if (classA !== classB) return classA.localeCompare(classB);
        if (a.course_code !== b.course_code) return a.course_code.localeCompare(b.course_code);
        return a.staff_id.localeCompare(b.staff_id);
    })

    const getStatusClass = (status) => {

        switch (status) 
        {
            case "Completed":
                return "status-completed"; 
            case "Processing":
                return "status-processing";
            case "Incomplete":
                return "status-incomplete"; 
            default:
                return "";
        }
    }

    return (
        <div>
            {sortedDeptStatus.length > 0 ? (
                <div  className='hod-main'>
                    <span className="hod-top-heading">OBE MARK INCOMPLETE DATA</span>
                    <div className="hod-input-btn">
                        <input
                            className="scope-search"
                            type="text"
                            placeholder="Search by Staff ID..."
                        />
                        <h3>Total No of Records : {sortedDeptStatus.length}</h3>
                    </div>

                    <table className='hod-repo-table'>
                        <thead>
                            <tr>
                                <th className='hod-repo-th'>S No</th>
                                <th className='hod-repo-th'>Staff Id</th>
                                <th className='hod-repo-th'>Staff Name</th>
                                <th className='hod-repo-th'>Category</th>
                                <th className='hod-repo-th'>Class</th>
                                <th className='hod-repo-th'>Course Code</th>
                                <th className='hod-repo-th'>Course Title</th>
                                <th className='hod-repo-th'>CIA 1</th>
                                <th className='hod-repo-th'>CIA 2</th>
                                <th className='hod-repo-th'>ASS 1</th>
                                <th className='hod-repo-th'>ASS 2</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedDeptStatus.map((dept, index) => (
                                <tr key={index}>
                                    <td className='hod-repo-td'>{index + 1}</td>
                                    <td className='hod-repo-td'>{dept.staff_id}</td>
                                    <td className='hod-repo-td'>{dept.staff_name}</td>
                                    <td className='hod-repo-td'>{dept.category}</td>
                                    <td className='hod-repo-td'>{dept.semester} {dept.course_id} {dept.section}</td>
                                    <td className='hod-repo-td'>{dept.course_code}</td>
                                    <td className='hod-repo-td'>{dept.course_title}</td>
                                    <td className={`hod-repo-td-status ${getStatusClass(dept.cia_1)}`}>{dept.cia_1}</td>
                                    <td className={`hod-repo-td-status ${getStatusClass(dept.cia_2)}`}>{dept.cia_2}</td>
                                    <td className={`hod-repo-td-status ${getStatusClass(dept.ass_1)}`}>{dept.ass_1}</td>
                                    <td className={`hod-repo-td-status ${getStatusClass(dept.ass_2)}`}>{dept.ass_2}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            ) : (
                <div className='process-main'>
                    <div className='process-content'>
                        <p className="process-code">All Assessments are Completed. </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default HodReport;