import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './rsmatrixreport.css';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


function MatrixReport() 
{
    const apiUrl = process.env.REACT_APP_API_URL;
    const [academicYear, setAcademicYear] = useState('');
    const [allMatrixReport, setAllMatrixReport] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [courseCount, setCourseCount] = useState('');
    const [comCount, setComCount] = useState('');
    const [filter, setFilter] = useState({
        all: true,
        incomplete: true,
        completed: true
    });

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
    }, [])

    useEffect(() => 
    {
        const fetchMatrixReport = async () => 
        {
            if (academicYear) 
            {
                try 
                {
                    const response = await axios.post(`${apiUrl}/api/allmatrixreport`, {
                        academic_year: academicYear,
                    });
                    setAllMatrixReport(response.data);
                } 
                catch (err) {
                    alert('Error Fetching Status Report');
                    console.log('Error Fetching Data:', err);
                }
            }
        }
        fetchMatrixReport();

        const matrixCompletedCount = async () => 
        {
            if (academicYear) 
            {
                try 
                {
                    const response = await axios.post(`${apiUrl}/api/matrixcount`, {
                        academic_year: academicYear,
                    })
                    if (response.data) 
                    {
                        setCourseCount(response.data.uniqueCourseCount);
                        setComCount(response.data.completeCount);
                    }
                } 
                catch (err) {
                    alert('Error Fetching Status Report.');
                    console.log('Error Fetching Data:', err);
                }
            }
        }
        matrixCompletedCount();
    }, [academicYear])

    const handleFilterChange = (event) => 
    {
        const { name, checked } = event.target;

        if (name === 'all') 
        {
            setFilter({
                all: checked,
                incomplete: checked,
                completed: checked
            })
        } 
        else 
        {
            setFilter((prevFilter) => ({
                ...prevFilter,
                [name]: checked,
                all: checked && prevFilter.incomplete && prevFilter.completed
            }))
        }
    }

    const getStatusPriority = (status) => 
    {
        if (status === 'Incomplete') return 1;
        if (status === 'Processing') return 2;
        if (status === 'Completed') return 3;
        
    }

    const sortedReports = [...allMatrixReport]
    .sort((a, b) => {
        const statusPriorityA = getStatusPriority(a.status);
        const statusPriorityB = getStatusPriority(b.status);

        if (statusPriorityA !== statusPriorityB) {
            return statusPriorityA - statusPriorityB;
        }
        return a.staff_id.localeCompare(b.staff_id);
    })

    const filteredReports = sortedReports.filter(matrix => 
    {
        const matchesSearch = 
        matrix.staff_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        matrix.staff_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        matrix.course_code.toLowerCase().includes(searchTerm.toLowerCase());

        if (!matchesSearch) return false;

        if (filter.all) return true;
        if (matrix.status === 'Incomplete' && filter.incomplete) return true;
        if (matrix.status === 'Completed' && filter.completed) return true;
        return false;
    })

    const handleDownload = () => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const fileName = 'RSMatrix_Report';
    
        const headers = [
            'Staff Id', 
            'Staff Name', 
            'Dept Id', 
            'Course Code', 
            'Category', 
            'Section',
            'Status', 
            
        ];
        const dataWithHeaders = [headers, ...allMatrixReport.map(dept => [
            dept.staff_id,
            dept.staff_name,
            dept.course_id,
            dept.course_code,
            dept.category,
            dept.section,
            dept.status,
        ])];
    
        const ws = XLSX.utils.aoa_to_sheet(dataWithHeaders);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        saveAs(data, fileName + fileExtension);
    };

    return (
        <div className='rsm-repo-main'>
            <div className='rsm-repo-search'>
                <input
                    type="text"
                    placeholder="Search...."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="rsm-search-input"
                />
            </div>
            <div className='rsm-repo-btn-content'>
                <div className="rsm-repo-filter">
                    <label className='rsm-repo-label'>
                        <input
                            type="checkbox"
                            name="all"
                            checked={filter.all}
                            onChange={handleFilterChange}
                        />
                        <b>All</b> ({filteredReports.length})
                    </label>
                    <label className='rsm-repo-label'>
                        <input
                            type="checkbox"
                            name="incomplete"
                            checked={filter.incomplete}
                            onChange={handleFilterChange}
                        />
                        <b>Incomplete</b> 
                        (
                        {filteredReports.filter(matrix => matrix.status === 'Incomplete').length}
                        )
                    </label> 
                    <label className='rsm-repo-label'>
                        <input
                            type="checkbox"
                            name="completed"
                            checked={filter.completed}
                            onChange={handleFilterChange}
                        />
                        <b>Completed</b> (
                        {filteredReports.filter(matrix => matrix.status === 'Completed').length}
                        )
                    </label>
                </div>
                <div className='rsm-repo-com-status'>
                    <b>No of Course Codes Completed : </b>{comCount} / {courseCount}
                </div>
                <button className='dept-repo-btn' onClick={handleDownload}>Download Excel</button>
            </div>
            <table className="rsm-repo-header">
                <thead>
                    <tr>
                        <th className="rsm-repo-heading">S. No.</th>
                        <th className="rsm-repo-heading">Staff Id</th>
                        <th className="rsm-repo-heading">Staff Name</th>
                        <th className="rsm-repo-heading">Dept Id</th>
                        <th className="rsm-repo-heading">Course Code</th>
                        <th className="rsm-repo-heading">Category</th>
                        <th className="rsm-repo-heading">Section</th>
                        <th className="rsm-repo-heading">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReports.map((matrix, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'rsm-repo-light' : 'rsm-repo-dark'}>
                            <td className="rsm-repo-content">{index + 1}</td>
                            <td className="rsm-repo-content">{matrix.staff_id}</td>
                            <td className="rsm-repo-content-sn">{matrix.staff_name}</td>
                            <td className="rsm-repo-content">{matrix.course_id}</td>
                            <td className="rsm-repo-content">{matrix.course_code}</td>
                            <td className="rsm-repo-content">{matrix.category}</td>
                            <td className="rsm-repo-content">{matrix.section}</td>
                            <td className="rsm-repo-content" style={{ color: matrix.status === 'Completed' ? 'green' : 'red' }}>
                                {matrix.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MatrixReport;
