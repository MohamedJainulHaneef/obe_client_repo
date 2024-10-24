import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import './deptreport.css'

function DeptReport() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const { dept } = useParams();
    const [activeSection, setActiveSection] = useState('1');
    const [academicYear, setAcademicYear] = useState('');
    const [deptStatusReport, setDeptStatusReport] = useState([]);
    const [filter, setFilter] = useState({
        all: true, 
        incomplete: true,
        processing: true,
        completed: true
    });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const academicYearSet = async () => {
            try {
                const response = await axios.post(`${apiUrl}/activesem`, {});
                setAcademicYear(response.data.academic_year);
            } catch (err) {
                alert('Error fetching Academic Year.');
            }
        }
        academicYearSet();
    }, []);

    useEffect(() => {
        const fetchDeptStatusReport = async () => {
            if (academicYear) {
                try {
                    const response = await axios.post(`${apiUrl}/api/deptstatusreport`, {
                        academic_year: academicYear,
                        dept_name: dept === "alldepartments" ? "ALL" : dept
                    });
                    setDeptStatusReport(response.data);
                } catch (err) {
                    alert('Error fetching status report.');
                    console.log('Error fetching data:', err);
                }
            }
        }
        fetchDeptStatusReport();
    }, [academicYear, dept]);

    const handleSectionChange = (event) => {
        setActiveSection(event.target.value);
    }

    const getActiveField = (dept) => {
        switch (activeSection) {
            case '1':
                return dept.cia_1;
            case '2':
                return dept.cia_2;
            case '3':
                return dept.ass_1;
            case '4':
                return dept.ass_2;
            case '5':
                return dept.ese;
            default:
                return '';
        }
    }

    const getStatus = (value) => {
        if (value === 0) return 'Incomplete';
        if (value === 1) return 'Processing';
        if (value === 2) return 'Completed';
        return '';
    }

    const getStatusColor = (value) => {
        if (value === 0) return { color: 'red' };
        if (value === 1) return { color: 'black' };
        if (value === 2) return { color: 'green' };
        return {};
    }

    const handleFilterChange = (event) => {
        const { name, checked } = event.target;

        if (name === 'all') {
            setFilter({
                all: checked,
                incomplete: checked,
                processing: checked,
                completed: checked
            });
        } else {
            setFilter((prevFilter) => ({
                ...prevFilter,
                [name]: checked,
                all: checked && prevFilter.incomplete && prevFilter.processing && prevFilter.completed
            }));
        }
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }

    // Filter logic to check staff_id, course_code, and category
    const filteredReport = deptStatusReport.filter((dept) => {
        const status = getActiveField(dept);
        const matchesSearch = 
            dept.staff_id.toLowerCase().includes(searchTerm.toLowerCase()) || 
            dept.course_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dept.category.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (!matchesSearch) return false;

        if (filter.all) return true;
        if (status === 0 && filter.incomplete) return true;
        if (status === 1 && filter.processing) return true;
        if (status === 2 && filter.completed) return true;
        return false;
    });

    // Calculate counts for each filter type
    const totalCount = deptStatusReport.length;
    const incompleteCount = deptStatusReport.filter(dept => getActiveField(dept) === 0).length;
    const processingCount = deptStatusReport.filter(dept => getActiveField(dept) === 1).length;
    const completedCount = deptStatusReport.filter(dept => getActiveField(dept) === 2).length;

    // Calculate search-specific counts
    const searchTotal = filteredReport.length;
    const searchIncompletedCount = filteredReport.filter(dept => getActiveField(dept) === 0).length;
    const searchProcessedCount = filteredReport.filter(dept => getActiveField(dept) === 1).length;
    const searchCompletedCount = filteredReport.filter(dept => getActiveField(dept) === 2).length;

    return (
        <div className='dept-repo-main'>
            {/* <h2>Department Report (Total: {totalCount})</h2> */}

            

            <select
                value={activeSection || ''}
                onChange={handleSectionChange}
                className="mark-dropdown"
            >
                <option value="1">CIA - 1</option>
                <option value="2">CIA - 2</option>
                <option value="3">ASS - 1</option>
                <option value="4">ASS - 2</option>
                <option value="5">ESE</option>
            </select>
            <div className='dept-repo-search'>
                    <input 
                    type="text" 
                    placeholder="Search...." 
                    value={searchTerm} 
                    onChange={handleSearchChange}
                    className="search-input"
                />
            
            {/* Display search-specific counts under the search box */}
            {/* {searchTerm && (
                <div className="dept-repo-search-counts">
                    <p><b>Total : </b>{searchTotal}</p>
                    <p><b>Incomplete :</b> {searchIncompletedCount}</p>
                    <p><b>Processed :</b> {searchProcessedCount}</p>
                    <p><b>Completed :</b> {searchCompletedCount}</p>
                </div>
            )} */}
                </div>
            <div className='dept-repo-btn-content'>
                    
                <div className="dept-repo-filter">
                    <label className='dept-repo-label'>
                        <input
                            type="checkbox"
                            name="all"
                            checked={filter.all}
                            onChange={handleFilterChange}
                        />
                        <b>All</b> ( {searchTotal} ) {/* Display total count here */}
                    </label>
                    <label className='dept-repo-label'>
                        <input
                            type="checkbox"
                            name="incomplete"
                            checked={filter.incomplete}
                            onChange={handleFilterChange}
                        />
                        <b>Incomplete</b> ( {searchIncompletedCount} ) {/* Display incomplete count here */}
                    </label>
                    <label className='dept-repo-label'>
                        <input
                            type="checkbox"
                            name="processing"
                            checked={filter.processing}
                            onChange={handleFilterChange}
                        />
                        <b>Processing</b> ( {searchProcessedCount} ) {/* Display processing count here */}
                    </label>
                    <label className='dept-repo-label'>
                        <input
                            type="checkbox"
                            name="completed"
                            checked={filter.completed}
                            onChange={handleFilterChange}
                        />
                        <b>Completed</b> ( {searchCompletedCount} ) {/* Display completed count here */}
                    </label>
                </div>
                <button className='dept-repo-btn'>Download Excel</button>
            </div>
            
            <table className="dept-repo-header">
                <thead>
                    <tr>
                        <th className="dept-repo-heading">S. No.</th>
                        <th className="dept-repo-heading">Staff Id</th>
                        <th className="dept-repo-heading">Course Code</th>
                        <th className="dept-repo-heading">Category</th>
                        <th className="dept-repo-heading">Section</th>
                        <th className="dept-repo-heading">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReport.map((dept, index) => (
                        <tr key={index} className="staff-map-row">
                            <td className="dept-repo-content">{index + 1}</td>
                            <td className="dept-repo-content">{dept.staff_id}</td>
                            <td className="dept-repo-content">{dept.course_code}</td>
                            <td className="dept-repo-content">{dept.category}</td>
                            <td className="dept-repo-content">{dept.section}</td>
                            <td className="dept-repo-content" style={getStatusColor(getActiveField(dept))}>
                                {getStatus(getActiveField(dept))}
                            </td>                             
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DeptReport;
