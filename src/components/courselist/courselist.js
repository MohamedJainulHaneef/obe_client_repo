import { useEffect, useState, React } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './courselist.css';
import { useParams } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

function CourseList() 
{
    const { staffId } = useParams();
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState([]);
    const [academicSem, setAcademicSem] = useState('');
    const [staffName, setStaffName] = useState('');

    useEffect(() => 
    {
        const fetchStaffName = async () => 
        {
            try {
                const response = await axios.post(`${apiUrl}/staffName`,{staffId});
                setStaffName(response.data)
            }
            catch(err) {
                console.log('Error Fetching Staff Name : ', err)
            }
        }
        fetchStaffName();

        const academicSemSet = async () => 
        {
            try {
                const response = await axios.post(`${apiUrl}/activesem`, {});
                setAcademicSem(response.data.academic_sem);
            } 
            catch (err) {
                console.log('Error Fetching Data:', err);
            }
        };
        academicSemSet();

    }, [apiUrl,staffId]);

    useEffect(() => 
    {
        const fetchCourseMapDetails = async () => 
        {
            if (academicSem) 
            {
                try 
                {
                    const response = await axios.post(`${apiUrl}/api/coursemap`, {
                        staff_id: staffId,
                        academic_sem: academicSem
                    })
                    const courseMappings = response.data;

                    const courseMappingsWithStatus = await Promise.all(
                        courseMappings.map(async (course) => 
                        {
                            try 
                            {
                                const statusResponse = await axios.post(`${apiUrl}/api/report/status`, {
                                    category: course.category,
                                    dept_name: course.dept_name,
                                    section: course.section,
                                    semester: course.semester,
                                    course_code: course.course_code,
                                })
                                return { ...course, status: statusResponse.data.status };
                            } 
                            catch (err) {
                                console.log('Error Fetching Course Status:', err);
                                return { ...course, status: 'Error' };
                            }
                        })
                    )
                    setCourseData(courseMappingsWithStatus);
                } 
                catch (err) {
                    console.log('Error fetching data:', err);
                }
            }
        }
        fetchCourseMapDetails();
        
    }, [staffId, academicSem, apiUrl]);

    const markpage = (user) => 
    {
        navigate(`/staff/${staffId}/studentmark`, { state: 
        { 
            deptName: user.dept_name, 
            section: user.section, 
            semester: user.semester,
            classDetails: user.degree,
            courseCode: user.course_code,
            courseTitle: user.course_title,
            deptId: user.dept_id,
            category: user.category
        }})
    }
    
    return (
        <div className="course-main">
            <div className="course-layout-top-div">
                <p className="course-layout-staff-id">
                    <span className="course-staff">Welcome </span> {staffName.staff_name}
                </p>
                <p className="course-layout-staff-id">
                    <span className="course-staff">Staff Id :</span> {staffId}
                </p>
            </div>
            <div className="course-content-box">
                <div className="course-entire-box">
                    {courseData && courseData.length > 0 ? (
                        courseData.map((user, index) => (
                            <button 
                                key={index} 
                                className="course-subject-box" 
                                onClick={() => markpage(user)}
                            >
                                <div 
                                    className="course-box-status"
                                    style={{ color: user.status === "Completed" ? "green" : "red" }}
                                >
                                    {user.status}
                                </div>
                                <div className="course-box-text-category">{user.category}</div>
                                <div className="course-box-text-dept">{user.dept_name}</div>
                                <div className="course-box-text">
                                    {user.degree} ( {user.section} ) - Semester : {user.semester}
                                </div>
                                <div className="course-box-text">{user.course_code}</div>
                            </button>
                        ))
                    ) : (
                        <p className="rsmatrix-no-code">No Course Codes Found for this ID</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CourseList;