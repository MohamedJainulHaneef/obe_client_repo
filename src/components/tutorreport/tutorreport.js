import { useEffect, useState, React } from 'react';
import axios from "axios";
import './tutorreport.css';
import { useParams } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

function TutorReport() 
{
    const { staffId } = useParams();
    const [ deptStatus, setDeptStatus ] = useState([]);

    useEffect(() => {

        const fetchTutorReport = async () => {
            try {
                const response = await axios.post(`${apiUrl}/api/tutorStatusReport`, {
                    staff_id: staffId
                })
                setDeptStatus(response.data);
            }
            catch (error) {

            }
        }
        fetchTutorReport();

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

        switch (status) {
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
                <div className='tutor-main'>
                    <span className="tutor-top-heading">OBE MARK INCOMPLETE DATA</span>
                    <div className="tutor-input-btn">
                        <input
                            className="scope-search"
                            type="text"
                            placeholder="Search by Staff ID..."
                        />
                        <h3>Total No of Records : {sortedDeptStatus.length}</h3>
                    </div>

                    <table className='tutor-repo-table'>
                        <thead>
                            <tr>
                                <th className='tutor-repo-th'>S No</th>
                                <th className='tutor-repo-th'>Staff Id</th>
                                <th className='tutor-repo-th'>Staff Name</th>
                                {/* <th className='tutor-repo-th'>Category</th> */}
                                {/* <th className='tutor-repo-th'>Class</th> */}
                                <th className='tutor-repo-th'>Course Code</th>
                                <th className='tutor-repo-th'>Course Title</th>
                                <th className='tutor-repo-th'>CIA 1</th>
                                <th className='tutor-repo-th'>CIA 2</th>
                                <th className='tutor-repo-th'>ASS 1</th>
                                <th className='tutor-repo-th'>ASS 2</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedDeptStatus.map((dept, index) => (
                                <tr key={index}>
                                    <td className='tutor-repo-td'>{index + 1}</td>
                                    <td className='tutor-repo-td'>{dept.staff_id}</td>
                                    <td className='tutor-repo-td'>{dept.staff_name}</td>
                                    {/* <td className='tutor-repo-td'>{dept.category}</td> */}
                                    {/* <td className='tutor-repo-td'>{dept.semester} {dept.course_id} {dept.section}</td> */}
                                    <td className='tutor-repo-td'>{dept.course_code}</td>
                                    <td className='tutor-repo-td'>{dept.course_title}</td>
                                    <td className={`tutor-repo-td-status ${getStatusClass(dept.cia_1)}`}>{dept.cia_1}</td>
                                    <td className={`tutor-repo-td-status ${getStatusClass(dept.cia_2)}`}>{dept.cia_2}</td>
                                    <td className={`tutor-repo-td-status ${getStatusClass(dept.ass_1)}`}>{dept.ass_1}</td>
                                    <td className={`tutor-repo-td-status ${getStatusClass(dept.ass_2)}`}>{dept.ass_2}</td>
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

export default TutorReport;