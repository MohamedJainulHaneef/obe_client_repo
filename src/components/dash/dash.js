import { useEffect, useState, React } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './dash.css';
import { useParams } from 'react-router-dom';

function Dash() 
{
    const { staffId } = useParams();
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsersAndDonors = async () => {
            try {
                const usersResponse = await axios.get('http://localhost:5000/coursemap');
                const usersData = usersResponse.data.filter(user => user.staff_id === staffId);
                setUsers(usersData);
            } 
            catch (err) {
                console.log(err);
            }
        };
        fetchUsersAndDonors();
    }, [staffId]);

    const markpage = (user) => {
        navigate(`/staff/${staffId}/markpage`, { state: { 
            deptName: user.dept_name, 
            section: user.section, 
            semester: user.semester 
        }});
    };
    

    return (
        <div className="dash-main">
            <div className="dash-layout-top-div">
                <p className="dash-layout-staff-id"> <span className="dash-staff">Staff Id :</span> {staffId}</p>
            </div>
            <div className="dash-content-box">
                {users.map((user) => (
                    <button key={user.s_no} className="dash-subject-box" onClick={() => markpage(user)} >
                        <div className="dash-box-text-category">{user.category}</div>
                        <div className="dash-box-text">{user.dept_name}</div>
                        <div className="dash-box-text">{user.class} ({user.section}) - Semester : {user.semester}</div>
                        <div className="dash-box-text">{user.course_code}</div>
                    </button >
                ))}
            </div>
        </div>
    )
}

export default Dash;