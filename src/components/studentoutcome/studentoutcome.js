import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import './studentoutcome.css';
const apiUrl = process.env.REACT_APP_API_URL;

function StudentOutcome() 
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
            if(staffId === 'ADMIN' || staffId === 'admin' || staffId === 'Admin')
            {
                setAdmin(true);
                return;
            }
            else 
            {
                try 
                {
                    const response = await axios.post(`${apiUrl}/api/checkstaffId`, {
                        staff_id: staffId
                    })

                    if (response.data) 
                    {
                        if (response.data.courseHandleStaffId) {
                            setCourseHandle(true);
                        }
                        if (response.data.tutorHandleStaffId) {
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

    const handleCourse = () => {
        // navigate(`/staff/${staffId}/coursestudentoutcome`);
    }

    const handleTutor = () => {
        // navigate(`/staff/${staffId}/coursestudentoutcome`);
    }

    const handleHod = () => {
        // navigate(`/staff/${staffId}/coursestudentoutcome`);
    }

    const handleAdmin = () => {
        navigate(`/staff/${staffId}/adminstudentoutcome`);
    }
    
    return (
        <div className='co-main'>
            <div className="co-layout-top-div">
                <p className="co-layout-staff-id"><span className="co-staff">Staff Id :</span> {staffId}</p>
            </div>
            <div className="co-content-box">
                <div className='co-entire-box'>
                    {courseHandle && (
                        <button className="co-box" onClick={handleCourse}>
                            Course Report
                        </button>
                    )}
                    {tutorHandle && (
                        <button className="co-box" onClick={handleTutor}>
                            Mentor Report
                        </button>
                    )}
                    {hodHandle && (
                        <button className="co-box" onClick={handleHod}>
                            Hod Report
                        </button>
                    )}
                    {admin && (
                        <button className="co-box" onClick={handleAdmin}>
                            Admin Report
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default StudentOutcome;