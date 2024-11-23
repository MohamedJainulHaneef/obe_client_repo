import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus  } from '@fortawesome/free-solid-svg-icons';
import './stafftutor.css';

const API_URL = "http://localhost:5000/api/mentor";

function StaffTutorManage() 
{
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(API_URL)
            .then((response) => {
                setData(response.data);
                setFilteredData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();
        const filtered = data.filter((row) =>
            (row.staff_id?.toLowerCase() || "").includes(searchText) ||
            (row.staff_name?.toLowerCase() || "").includes(searchText)
        );
        setFilteredData(filtered);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="smst-main">
            <span className="smst-top-heading">STAFF DETAILS</span>
            <div className="smst-input-btn">
                <input
                    className="smst-search"
                    type="text"
                    placeholder="Search by Id or Name..."
                    onChange={handleSearch}
                />
                <button className="sm-save-btn"><span>ADD</span><FontAwesomeIcon icon={faPlus} className="smst-icon-add" /></button>
           </div>
           <div className="smsh-count">
                <span className="smst-span"><b>Total Records : </b>{filteredData.length}</span>
           </div>
            <table className="smst-table">
                <thead>
                    <tr>
                        <th>Batch</th>
                        <th>Staff ID</th>
                        <th>Mentor Name</th>
                        <th>Category</th>
                        <th>Degree</th>
                        <th>Department Name</th>
                        <th>Section</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((row, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'smst-repo-light' : 'smst-repo-dark'}>
                                <td>{row.batch}</td>
                                <td>{row.staff_id}</td>
                                <td>{row.staff_name}</td>
                                <td>{row.category}</td>
                                <td>{row.degree}</td>
                                <td>{row.dept_name}</td>
                                <td>{row.section}</td>
                                <td>
                                    <button className="smst-edit-btn">
                                        <span className="smst-edit-btn">Edit &nbsp; <FontAwesomeIcon icon={faEdit} className="smst-icon" /></span>
                                    </button>
                                </td>
                                <td>
                                    <button className="smst-delete-btn">
                                        <span className="smst-delete-btn">Delete &nbsp;<FontAwesomeIcon icon={faTrash} className="smst-icon" /></span>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9">No Data Found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default StaffTutorManage;
