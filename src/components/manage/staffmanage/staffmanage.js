import React, { useEffect, useState } from "react";
import './staffmanage.css';
import axios from "axios";
// import { useLocation } from "react-router-dom";

function StaffManage() {
    const [staffData, setStaffData] = useState([]);
    // const { staffId, staffName } = location.state || {};
    // const location = useLocation()
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const staffDetails = async () => {
            try {
                const StaffResponse = await axios.get(`${apiUrl}/staffdetails`, {});
                if (StaffResponse.data) {
                    console.log(StaffResponse.data)
                    // window.alert('staff master')
                }
                setStaffData(StaffResponse.data)
            }
            catch (err) {
                console.log('Error fetching data:', err);
            }
        };
        staffDetails();
    },[apiUrl])

    const handleSearch = (e) =>{
        const searchText = e.target.value.toLowerCase();
        const filterList = staffData.filter((staff)=>
            staff.staff_id.toLowerCase().includes(searchText) ||
            staff.staff_name.toLowerCase().includes(searchText)
        );
        setStaffData(filterList)
    }

    return (
        <div className="staff_manage">
            <h2>Hello</h2>
            <input 
                type="text"
                onChange={handleSearch}
                />
            <div>
                <table >
                    <thead>
                        <tr className="feild">
                            <th className="sno">S. No.</th>
                            <th className="staff-id">Staff Id</th>
                            <th className="staff-name">Staff Name</th>
                            <th className="staff-edit">edit</th>
                            <th className="delete">Delete</th>
                        </tr>
                    </thead>


                    {staffData.map((staff, index) => (
                            <tbody key={index} className="staff-map-row">
                            <tr  >
                                <td className="sno">{index+1}</td>
                                <td className="staff_id">{staff.staff_id}</td>
                                <td className="staff_name">{staff.staff_name}</td>
                                <td >edit</td>
                                <td >delete</td>

                            </tr> 
                            </tbody>
                    ))
                    }



                    <tbody>
                    </tbody>
                </table>
            </div>

        </div>
    );
}
export default StaffManage;