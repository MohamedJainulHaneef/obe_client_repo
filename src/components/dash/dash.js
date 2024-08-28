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
          

            const usersData = usersResponse.data.filter(user => user.staff_id === staffId);;
            setUsers(usersData);
        
        } catch (err) {
            console.log(err);
        }
    };
    fetchUsersAndDonors();
}, [staffId]);
  return (
    <div className="dummy_main">
      {users.map((user) => (
                <div key={user.s_no} class="box">
                    {/* <div className="font-bold border border-white text-center uppercase">{user.fresherOrRenewal}</div> */}
                    <div class="">{user.dept_id}</div>
                    <div className="font-bold border border-white text-center py-3 uppercase">{user.course_code}</div>
                    <div className="font-bold border border-white text-center py-3 uppercase">{user.section}</div>
                    <div className="font-bold border border-white text-center py-3 uppercase">{user.scholtype}</div>
                    
                </div>
            ))}
    </div>
  );
}

export default Dash;