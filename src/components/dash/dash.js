import { useEffect, useState, React } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './dash.css';
import { useParams } from 'react-router-dom';

function Dash ()
{
    const { staffId } = useParams();
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState([]);

    useEffect(() => 
    {
        const fetchUsersAndDonors = async () => {
            try {
                const response = await axios.post('http://localhost:5000/coursemapp', {
                    staff_id: staffId
                });
                setCourseData(response.data);
            } 
            catch (err) {
                console.log('Error fetching data:', err);
            }
        };
        fetchUsersAndDonors();
    }, [staffId] );

    const markpage = (user) => 
    {
        navigate(`/staff/${staffId}/markpage`, { state: { 
            deptName: user.dept_name, 
            section: user.section, 
            semester: user.semester,
            classDetails: user.class,
            courseCode: user.course_code,
            courseTitle: user.course_title
        }})
    }
    
    return (

        <div className="dash-main">
            <div className="dash-layout-top-div">
                <p className="dash-layout-staff-id"> <span className="dash-staff">Staff Id :</span> {staffId}</p>
            </div>
            <div className="dash-content-box">
                {courseData.map((user, index) => (
                    <button 
                        key={index} 
                        className="dash-subject-box" 
                        onClick={() => markpage(user)} >
                        <div className="dash-box-text-category">{user.category}</div>
                        <div className="dash-box-text">{user.dept_name}</div>
                        <div className="dash-box-text">{user.class} ( {user.section} ) - Semester : {user.semester}</div>
                        <div className="dash-box-text">{user.course_code}</div>
                    </button>
                ))}
            </div>
        </div>
        
    )
}

export default Dash;