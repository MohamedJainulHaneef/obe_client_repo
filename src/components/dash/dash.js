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
                console.log(staffId)
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

    const markpage = async () => 
    {
        navigate(`staff/${staffId}/markpage`);
    };

    return (

        <div className="dummy_main">
            <div className="layout-top-div">
                <p className="layout-staff_id"> <span class="staff">Staff Id :</span> {staffId}</p>
            </div>
            <div class="content-box">
                {users.map((user) => (
                    <button key={user.s_no} class="subject-box" onClick={markpage} >
                        <div className="box-text-category">{user.category}</div>
                        <div class="box-text">{user.dept_id}</div>
                        <div className="box-text">{user.course_code}</div>
                        <div className="box-text">SECTION : {user.section}</div>
                    </button >
                ))}
            </div>
        </div>
    );
}

export default Dash;