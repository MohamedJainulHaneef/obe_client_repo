import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import './deptreport.css';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function DeptReport() 
{
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
    
    useEffect(() => 
    {
        const academicYearSet = async () => 
        {
            try {
                const response = await axios.post(`${apiUrl}/activesem`, {});
                setAcademicYear(response.data.academic_year);
            } 
            catch (err) {
                alert('Error fetching Academic Year.');
            }
        }
        academicYearSet();
    }, []);

    useEffect(() => 
    {
        const fetchDeptStatusReport = async () => 
        {
            if (academicYear) 
            {
                try 
                {
                    const response = await axios.post(`${apiUrl}/api/deptstatusreport`, {
                        academic_year: academicYear,
                        dept_name: dept === "alldepartments" ? "ALL" : dept
                    })
                    setDeptStatusReport(response.data);
                } 
                catch (err) {
                    alert('Error fetching status report.');
                    console.log('Error fetching data:', err);
                }
            }
        }
        fetchDeptStatusReport();
    }, [academicYear, dept]);

    const handleSectionChange = (event) => 
    {
        setActiveSection(event.target.value);
    }

    const getActiveField = (dept) => 
    {
        switch (activeSection) 
        {
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

    const getStatus = (value) => 
    {
        if (value === 0) return 'Incomplete';
        if (value === 1) return 'Processing';
        if (value === 2) return 'Completed';
        return '';
    }

    const getStatusColor = (value) => 
    {
        if (value === 0) return { color: 'red' };
        if (value === 1) return { color: 'blue' };
        if (value === 2) return { color: 'green' };
        return {};
    }

    const handleFilterChange = (event) => 
    {
        const { name, checked } = event.target;

        if (name === 'all') 
        {
            setFilter({
                all: checked,
                incomplete: checked,
                processing: checked,
                completed: checked
            });
        } 
        else {
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

    const filteredReport = deptStatusReport.filter((dept) => 
    {
        const status = getActiveField(dept);
        const matchesSearch = 
        dept.staff_id.toLowerCase().includes(searchTerm.toLowerCase()) || 
        dept.staff_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        dept.course_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.dept_name.toLowerCase().includes(searchTerm.toLowerCase());
        dept.category.toLowerCase().includes(searchTerm.toLowerCase());

        if (!matchesSearch) return false;

        if (filter.all) return true;
        if (status === 0 && filter.incomplete) return true;
        if (status === 1 && filter.processing) return true;
        if (status === 2 && filter.completed) return true;
        return false;
    })

    const sortedReport = [...filteredReport].sort((a, b) => 
    {
        const statusOrder = getActiveField(a) - getActiveField(b);
        if (statusOrder !== 0) return statusOrder;
        const categoryOrder = ['aided', 'sfm', 'sfw'];
        const categoryA = categoryOrder.indexOf(a.category.toLowerCase());
        const categoryB = categoryOrder.indexOf(b.category.toLowerCase());
        if (categoryA !== categoryB) return categoryA - categoryB;
        const deptNameOrder = a.dept_name.localeCompare(b.dept_name);
        if (deptNameOrder !== 0) return deptNameOrder;
        return a.staff_id.localeCompare(b.staff_id);
    })

    const handleDownload = () => 
    {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const fileName = 'Dept_Report';

        const headers = 
        [
            'Staff Id', 
            'Staff Name', 
            'Dept Name', 
            'Course Code', 
            'Category', 
            'Section',
            'CIA - 1', 
            'CIA - 2', 
            'ASS - 1', 
            'ASS - 2', 
            'Status', 
        ];

        const dataWithHeaders = [headers, ...deptStatusReport.map(dept => 
        {
            const status = ['cia_1', 'cia_2', 'ass_1', 'ass_2'].every(key => getStatus(dept[key]) === 'Completed') 
            ? 'Finished' 
            : 'Pending';

            return [
                dept.staff_id,
                dept.staff_name,
                dept.dept_name,
                dept.course_code,
                dept.category,
                dept.section, 
                getStatus(dept.cia_1),
                getStatus(dept.cia_2),
                getStatus(dept.ass_1),
                getStatus(dept.ass_2),
                status, 
            ];
        })];

        const ws = XLSX.utils.aoa_to_sheet(dataWithHeaders);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        saveAs(data, fileName + fileExtension);
    }

    return (
        <div className='dept-repo-main'>
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
                    className="dept-search-input"
                />
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
                        <b>All</b> ( {sortedReport.length} ) 
                    </label>
                    <label className='dept-repo-label'>
                        <input
                            type="checkbox"
                            name="incomplete"
                            checked={filter.incomplete}
                            onChange={handleFilterChange}
                        />
                        <b>Incomplete</b> 
                        ( 
                            {sortedReport.filter(dept => getActiveField(dept) === 0).length} 
                        )
                    </label>
                    <label className='dept-repo-label'>
                        <input
                            type="checkbox"
                            name="processing"
                            checked={filter.processing}
                            onChange={handleFilterChange}
                        />
                        <b>Processing</b>
                        ( 
                            {sortedReport.filter(dept => getActiveField(dept) === 1).length} 
                        )
                    </label>
                    <label className='dept-repo-label'>
                        <input
                            type="checkbox"
                            name="completed"
                            checked={filter.completed}
                            onChange={handleFilterChange}
                        />
                        <b>Completed</b> 
                        ( 
                            {sortedReport.filter(dept => getActiveField(dept) === 2).length} 
                        )
                    </label>
                </div>
                <button className='dept-repo-btn' onClick={handleDownload}>Download Excel</button>
            </div>
            <table className="dept-repo-header">
                <thead>
                    <tr>
                        <th className="dept-repo-heading">S. No.</th>
                        <th className="dept-repo-heading">Staff Id</th>
                        <th className="dept-repo-heading">Staff Name</th>
                        <th className="dept-repo-heading">Dept Name</th>
                        <th className="dept-repo-heading">Course Code</th>
                        <th className="dept-repo-heading">Category</th>
                        <th className="dept-repo-heading">Section</th>
                        <th className="dept-repo-heading">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedReport.map((dept, index) => (
                        <tr 
                            key={index} 
                            className={index % 2 === 0 ? 'dept-repo-light' : 'dept-repo-dark'}
                        >
                            <td className="dept-repo-content">{index + 1}</td>
                            <td className="dept-repo-content">{dept.staff_id}</td>
                            <td className="dept-repo-content-sn">{dept.staff_name}</td>
                            <td className="dept-repo-content-dn">{dept.dept_name}</td>
                            <td className="dept-repo-content">{dept.course_code}</td>
                            <td className="dept-repo-content">{dept.category}</td>
                            <td className="dept-repo-content">{dept.section}</td>
                            <td 
                                className="dept-repo-content-sr" 
                                style={getStatusColor(getActiveField(dept))}
                            >
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