import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import './courseoutcome.css';
const apiUrl = process.env.REACT_APP_API_URL;

function CourseOutcome() 
{
    const { staffId } = useParams();
    const navigate = useNavigate();
    const [courseHandle, setCourseHandle] = useState(false);
    const [tutorHandle, setTutorHandle] = useState(false);
    const [hodHandle, setHodHandle] = useState(false);
    const [admin, setAdmin] = useState(false);
    

    useEffect(() => 
    {
        const checkStaffId = async () => 
            {
                if(staffId === 'ADMIN')
                    {
                        setAdmin(true);
                        return;
                    }
    
                    else {
                try 
                {
                    const response = await axios.post(`${apiUrl}/api/checkstaffId`, {
                        staff_id: staffId
                    })
    
                    if (response.data) 
                    {
                        if (response.data.courseHandleStaffId) 
                        {
                            setCourseHandle(true);
                        }
                        if (response.data.tutorHandleStaffId) 
                        {
                            setTutorHandle(true);
                        }
                    }
                } 
                catch (err) {
                    console.log('Error fetching data:', err);
                }
            }
            }
            checkStaffId();
    }, [staffId]);

    const handleTutor = () => {
        navigate(`/staff/${staffId}/tutorcourseoutcome`);
    }
    
    return (
        <div className='so-main'>
            <div className="so-layout-top-div">
                <p className="so-layout-staff-id"><span className="so-staff">Staff Id :</span> {staffId}</p>
            </div>
            <div className="so-content-box">
                <div className='so-entire-box'>
                    {courseHandle && (
                        <button className="" >
                            Course Handled
                        </button>
                    )}
                    {tutorHandle && (
                        <button className="" onClick={handleTutor}>
                            Tutor Handled
                        </button>
                    )}
                    {admin && (
                        <button className="">
                            Admin Handled
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CourseOutcome;