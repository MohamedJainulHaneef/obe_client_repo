import { useEffect, useState, React } from 'react';
import axios from "axios";
import './dash.css';
import { useParams } from 'react-router-dom';

function Dash() {
  const { staffId } = useParams(); // destructuring correctly to get staffId
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const fetchUsersAndDonors = async () => {
        try {
            console.log(staffId)
            const usersResponse = await axios.get('http://localhost:5000/coursemap');
    

            const usersData = usersResponse.data.filter(user => user.staff_id === staffId);
            setUsers(usersData);
        
        } catch (err) {
            console.log(err);
        }
    };
    fetchUsersAndDonors();
}, [staffId]);
  return (
    <div className="dummy_main">
      <div class="content-box">
      {users.map((user) => (
                <button key={user.s_no} class="subject-box">
                    {/* <div className="font-bold border border-white text-center uppercase">{user.fresherOrRenewal}</div> */}
                    <div className="box-text">{user.category}</div>      
                    <div class="box-text">DEPARTMENT-ID : {user.dept_id}</div>
                    <div className="box-text">COURSE-CODE : {user.course_code}</div>
                    <div className="box-text">SECTION : {user.section}</div>      

                </button >
            ))}
      </div>
    </div>
  );
}

export default Dash;