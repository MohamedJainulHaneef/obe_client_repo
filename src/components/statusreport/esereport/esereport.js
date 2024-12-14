import { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import './esereport.css'

function EseReport() 
{
    const apiUrl = process.env.REACT_APP_API_URL;
    const [ courseCode, setCourseCode ] = useState([])

    useEffect( () => 
    {
        const eseCourseCodes = async () => 
        {
            try
            {
                const response = await axios.get(`${apiUrl}/api/esereport`)
                const sortedCourses = response.data.courses.sort((a, b) => 
                {
                    if (a.course_code < b.course_code) return -1;
                    if (a.course_code > b.course_code) return 1;
                    return 0;
                })
                setCourseCode(sortedCourses)
            }
            catch (err) {
                console.error("Error fetching ESE Report Data:", err);
            }
        }
        eseCourseCodes();

    },[apiUrl])

    const downloadExcel = () => 
    {
        const worksheetData = courseCode.map(course => ({
            'Course Code': course.course_code,
            'Course Title': course.course_title
        }))

        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'ESE Report');
        XLSX.writeFile(workbook, 'Ese Report.xlsx');
    }

    return (
        <div className='ese-repo-main'>
            <span className='ese-repo-heading'>ESE REPORT</span>
            <div className='ese-repo-ex-btn'>
                <button onClick={downloadExcel} className='ese-repo-btn'>
                    Download Excel
                </button>
            </div>
            <div className='ese-repo-content'>
                {courseCode.map((code,index) => (
                    <div key={index} className='ese-repo-container'>
                        <div className='ese-repo-sub1'>{code.course_code}</div>
                        <div className='ese-repo-sub2'>{code.course_title}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EseReport;