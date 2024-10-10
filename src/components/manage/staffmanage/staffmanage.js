import React, { useEffect, useState } from "react";
import './staffmanage.css';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function StaffManage() 
{
    const [staffData, setStaffData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => 
    {
        const staffDetails = async () => 
        {
            try 
            {
                const StaffResponse = await axios.get(`${apiUrl}/staffdetails`);
                if (StaffResponse.data) {
                    console.log(StaffResponse.data);
                    setStaffData(StaffResponse.data);
                    setFilteredData(StaffResponse.data);
                }
            } 
            catch (err) {
                console.log('Error fetching data:', err);
            }
        };

        staffDetails();

    }, [apiUrl]);

    const handleSearch = (e) => 
    {
        const searchText = e.target.value.toLowerCase();
        const filterList = staffData.filter((staff) =>
            staff.staff_id.toLowerCase().includes(searchText) ||
            staff.staff_name.toLowerCase().includes(searchText)
        );
        setFilteredData(filterList);
    };

    const handleEdit = (staffId) => 
    {
        console.log("Edit staff with ID:", staffId);
    };

    const handleDelete = (staffId) =>
    {
        console.log("Delete staff with ID:", staffId);
    };

    return (
        <div className="staff-manage">
            <span className="staff-top-heading">STAFF DATA</span>
            <div className="staff-input-btn">
                <input className="staff-search"
                    type="text"
                    placeholder="Search by ID or NAME ..."
                    onChange={handleSearch}
                />
                <div>
                    <button className="staff-save-btn">ADD</button>
                    <button className="staff-save-btn">SAVE</button>
                </div>
            </div>
            <div>
                <table className="staff-header">
                    <thead>
                        <tr>
                            <th className="staff-th-sno">S. No.</th>
                            <th className="staff-th-id">Staff Id</th>
                            <th className="staff-th-name">Staff Name</th>
                            <th className="staff-th-edit">Edit</th>
                            <th className="staff-th-delete">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((staff, index) => (
                            <tr key={index} className="staff-map-row">
                                <td className="staff-td-sno">{index + 1}</td>
                                <td className="staff-td-id">{staff.staff_id}</td>
                                <td className="staff-td-name">{staff.staff_name}</td>
                                <td className="staff-td-edit">
                                    <button onClick={() => handleEdit(staff.staff_id)} className="staff-btns">
                                        <FontAwesomeIcon icon={faEdit} className="staff-icon" /> 
                                        <span className="staff-span">Edit</span>
                                    </button>
                                </td>
                                <td className="staff-td-delete">
                                    <button onClick={() => handleDelete(staff.staff_id)} className="staff-btns">
                                        <FontAwesomeIcon icon={faTrash} className="staff-icon" /> 
                                        <span className="staff-span">Delete</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StaffManage;
