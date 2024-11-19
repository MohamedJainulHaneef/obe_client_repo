import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './staffcoursemanage.css';

function StaffManage() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/staffcoursemanage`);
        setStaffData(response.data);
      } catch (error) {
        console.error('Error fetching staff data', error);
      }
    };
    fetchStaffDetails();
  }, [apiUrl]);

  return (
    <div className="staff-manage">
      <h2>Staff Details</h2>
      <table className="staff-table">
        <thead>
          <tr>
            <th>S NO</th>
            <th>Staff ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Section</th>
            <th>Course ID</th>
            <th>Course Code</th>
            <th>Course Title</th>
          </tr>
        </thead>
        <tbody>
          {staffData.map((staff, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{staff.staff_id}</td>
              <td>{staff.staff_name}</td>
              <td>{staff.category}</td>
              <td>{staff.section}</td>
              <td>{staff.course_id}</td>
              <td>{staff.course_code}</td>
              <td>{staff.course_title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StaffManage;

