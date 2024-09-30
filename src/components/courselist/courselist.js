import { useEffect, useState, React } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './courselist.css';
import { useParams } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

function CourseList() 
{
    console.log(`this is myling${apiUrl}`)
    const { staffId } = useParams();
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState([]);

    useEffect(() => 
    {
        const fetchCourseMapDetails = async () => {
            try {
                const response = await axios.post(`${apiUrl}/coursemap`, {
                    staff_id: staffId
                });
                setCourseData(response.data);
            } 
            catch (err) {
                console.log('Error fetching data:', err);
            }
        };
        fetchCourseMapDetails();
    }, [staffId] );

    const markpage = (user) => 
    {
        navigate(`/staff/${staffId}/studentmark`, { state: { 
            deptName: user.branch, 
            section: user.section, 
            semester: user.semester,
            classDetails: user.degree,
            courseCode: user.course_code,
            courseTitle: user.course_title,
            courseId: user.course_id,
            category: user.category
        }})
    }
    
    return (

        <div className="course-main">
            <div className="course-layout-top-div">
                <p className="course-layout-staff-id"><span className="course-staff">Staff Id :</span> {staffId}</p>
            </div>
            <div className="course-content-box">
                <div className='course-entire-box'>
                    {courseData.map((user, index) => (
                        <button 
                            key={index} 
                            className="course-subject-box" 
                            onClick={() => markpage(user)} >
                            <div className="course-box-text-category">{user.category}</div>
                            <div className="course-box-text-dept">{user.branch}</div>
                            <div className="course-box-text">{user.degree} ( {user.section} ) - Semester : {user.semester}</div>
                            <div className="course-box-text">{user.course_code}</div>
                        </button>
                    ))}
            </div>
            </div>
        </div>
        
    )
}

export default CourseList;