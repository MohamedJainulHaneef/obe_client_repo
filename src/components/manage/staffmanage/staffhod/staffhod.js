import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus  } from '@fortawesome/free-solid-svg-icons';
import './staffhod.css';

const API_URL = "http://localhost:5000/api/hod";

function StaffHodManage() 
{
     const [data, setData] = useState([]);
     const [filteredData, setFilteredData] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

     useEffect(() => 
     {
          axios.get(API_URL).then((response) => 
          {
               setData(response.data);
               setFilteredData(response.data);
               setLoading(false);
          })
          .catch((err) => {
               setError(err.message);
               setLoading(false);
          })
     }, [])

     const handleSearch = (e) => 
     {
          const searchText = e.target.value.toLowerCase();
          const filtered = data.filter((row) =>
               row.staff_id.toLowerCase().includes(searchText) ||
               row.hod_name.toLowerCase().includes(searchText) ||
               row.dept_name.toLowerCase().includes(searchText)
          );
          setFilteredData(filtered);
     };

     if (loading) {
          return <div>Loading...</div>;
     }

     if (error) {
          return <div>Error : {error}</div>;
     }

     return (
          <div className="smsh-main">
               <span className="smsh-top-heading">HOD DETAILS</span>
               <div className="smsh-input-btn">
                    <input
                         className="smsh-search"
                         type="text"
                         placeholder="Search by Id or Name..."
                         onChange={handleSearch}
                    />
                    <button className="sm-save-btn"><span>ADD</span><FontAwesomeIcon icon={faPlus} className="smsh-icon-add" /></button>
               </div>
               <div className="smsh-count">
                    <span className="smsh-span"><b>Total Number of Heads : </b>{filteredData.length}</span>
               </div>
               <table className="smsh-table">
                    <thead>
                         <tr>
                              <th>S No</th>
                              <th>Staff ID</th>
                              <th>HOD / MID Name</th>
                              <th>Category</th>
                              <th>Degree</th>
                              <th>Department Name</th> 
                              <th>Edit</th>
                              <th>Delete</th>
                         </tr>
                    </thead>
                    <tbody>
                         {filteredData.length > 0 ? (
                              filteredData.map((row, index) => (
                                   <tr key={index} className={index % 2 === 0 ? 'smsh-repo-light' : 'smsh-repo-dark'}>
                                        <td>{index + 1}</td>
                                        <td>{row.staff_id}</td>
                                        <td>{row.hod_name}</td>
                                        <td>{row.category}</td>
                                        <td>{row.degree}</td>
                                        <td>{row.dept_name}</td>
                                        <td>
                                             <button className="smsh-edit-btn">
                                                  <span className="smsh-edit-btn">Edit &nbsp; <FontAwesomeIcon icon={faEdit} className="smsh-icon" /></span>
                                             </button>
                                        </td>
                                        <td>
                                             <button className="smsh-delete-btn">
                                                  <span className="smsh-delete-btn">Delete &nbsp;<FontAwesomeIcon icon={faTrash} className="smsh-icon" /></span>
                                             </button>
                                        </td>
                                   </tr>
                              ))
                         ) : (
                              <tr>
                                   <td colSpan="8">No Data Found</td>
                              </tr>
                         )}
                    </tbody>
               </table>
          </div>
     )
}

export default StaffHodManage;