import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './rsmatrixreport.css';

function MatrixReport() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [academicYear, setAcademicYear] = useState('');
    const [allMatrixReport, setAllMatrixReport] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const academicYearSet = async () => {
            try {
                const response = await axios.post(`${apiUrl}/activesem`, {});
                setAcademicYear(response.data.academic_year);
            } catch (err) {
                alert('Error fetching Academic Year.');
            }
        };
        academicYearSet();
    }, []);

    useEffect(() => {
        const fetchDeptStatusReport = async () => {
            if (academicYear) {
                try {
                    const response = await axios.post(`${apiUrl}/api/allmatrixreport`, {
                        academic_year: academicYear,
                    });
                    setAllMatrixReport(response.data);
                } catch (err) {
                    alert('Error fetching status report.');
                    console.log('Error fetching data:', err);
                }
            }
        };
        fetchDeptStatusReport();
    }, [academicYear]);

    const filteredReports = allMatrixReport.filter(matrix =>
        matrix.staff_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        matrix.staff_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        matrix.course_code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='rsm-repo-main'>
            <input
                type="text"
                placeholder="Search..."
                className="search-box"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="rsm-repo-filter">
                <b>All</b> ({filteredReports.length})
                <b> | Incomplete</b> ({filteredReports.filter(matrix => matrix.status === 'Incomplete').length})
                <b> | Completed</b> ({filteredReports.filter(matrix => matrix.status === 'Completed').length})
            </div>

            <table className="rsm-repo-header">
                <thead>
                    <tr>
                        <th className="rsm-repo-heading">S. No.</th>
                        <th className="rsm-repo-heading">Staff Id</th>
                        <th className="rsm-repo-heading">Staff Name</th>
                        <th className="rsm-repo-heading">Course Code</th>
                        <th className="rsm-repo-heading">Category</th>
                        <th className="rsm-repo-heading">Section</th>
                        <th className="rsm-repo-heading">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReports.map((matrix, index) => (
                        <tr key={index} className="staff-map-row">
                            <td className="rsm-repo-content">{index + 1}</td>
                            <td className="rsm-repo-content">{matrix.staff_id}</td>
                            <td className="rsm-repo-content">{matrix.staff_name}</td>
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
