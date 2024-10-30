import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../../assets/load.svg';
import './studentoutcome.css';

const apiUrl = 'http://localhost:5000/api';

const StudentOutcome = () => {
    const [markEntries, setMarkEntries] = useState({
        batch: [],
        active_sem: [],
        course_id: [],
        category: [],
        course_code: []
    });
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedBatch, setSelectedBatch] = useState('');
    const [selectedSem, setSelectedSem] = useState('');
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCourseCode, setSelectedCourseCode] = useState('');
    const [selectedSection, setSelectedSection] = useState('');

    const fetchMarkEntries = async (filters = {}) => {
        try {
            const response = await axios.get(`${apiUrl}/markentry`, { params: filters });
            setMarkEntries(response.data);
        } catch (error) {
            console.error('Error fetching mark entries:', error);
        }
    };

    const fetchStudents = async () => {
        try {
            const response = await axios.get(`${apiUrl}/studentmaster`);
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching student sections:', error);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchMarkEntries();
        fetchStudents();
        setLoading(false);
    }, []);

    useEffect(() => {
        if (selectedBatch) {
            fetchMarkEntries({ batch: selectedBatch });
        }
    }, [selectedBatch]);

    useEffect(() => {
        if (selectedCourseId) {
            fetchMarkEntries({ course_id: selectedCourseId, batch: selectedBatch });
        }
    }, [selectedCourseId, selectedBatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            selectedBatch,
            selectedSem,
            selectedCourseId,
            selectedCategory,
            selectedCourseCode,
            selectedSection
        });
    };

    if (loading) {
        return <img src={Loading} alt="Loading..." />;
    }

    return (
        <div className="student-outcome">
            <h1>Student Outcome</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Batch:</label>
                    <select value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)}>
                        <option value="">Select Batch</option>
                        {markEntries.batch.map((batch) => (
                            <option key={batch} value={batch}>{batch}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Active Semester:</label>
                    <select value={selectedSem} onChange={(e) => setSelectedSem(e.target.value)}>
                        <option value="">Select Semester</option>
                        {markEntries.active_sem.map((sem) => (
                            <option key={sem} value={sem}>{sem}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Course ID:</label>
                    <select value={selectedCourseId} onChange={(e) => setSelectedCourseId(e.target.value)}>
                        <option value="">Select Course ID</option>
                        {markEntries.course_id.map((courseId) => (
                            <option key={courseId} value={courseId}>{courseId}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Category:</label>
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        {markEntries.category.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Course Code:</label>
                    <select value={selectedCourseCode} onChange={(e) => setSelectedCourseCode(e.target.value)}>
                        <option value="">Select Course Code</option>
                        {markEntries.course_code.map((courseCode) => (
                            <option key={courseCode} value={courseCode}>{courseCode}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Section:</label>
                    <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
                        <option value="">Select Section</option>
                        {students.map((section) => (
                            <option key={section} value={section}>{section}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default StudentOutcome;






// import React, { useState, useEffect } from 'react';
// import axios from "axios";
// import Loading from '../../assets/load.svg';
// import './studentoutcome.css';

// function Studentoutcome() {
//     const [student, setStudent] = useState()
//     const apiUrl = process.env.REACT_APP_API_URL;

//     useEffect(() => 
//         {
//             const fetchOutcomeMapDetails = async () => 
//             {
//                     try {
//                         const response = await axios.get(`${apiUrl}/api/course_outcome`)
//                         const outcome = response.data;
//                         setStudent(outcome)
//                     } 
//                     catch (err) {
//                         console.log('Error fetching data:', err);
//                     }
//             }
//             fetchOutcomeMapDetails();
            
//         }, [student]);

//     if (!student) return <div><center><img src={Loading} alt="" className="img" /></center></div>;
//   return (
//     <div className='stu-outcome-container'>
//         <span className='stu-outcome-title'>STUDENT OUTCOME</span>
//             <table  className='stu-outcome-table'>
//                 <thead>
//                     <tr>
//                         <th className='stu-outcome-header'>Reg No</th>
//                         <th className='stu-outcome-header'>Dept ID</th>
//                         <th className='stu-outcome-header'>Course Code</th>
//                         <th className='stu-outcome-header'>Semester</th>
//                         <th className='stu-outcome-header'>LOT Percentage</th>
//                         <th className='stu-outcome-header'>MOT Percentage</th>
//                         <th className='stu-outcome-header'>HOT Percentage</th>
//                         <th className='stu-outcome-header'>Over All</th>
//                         <th className='stu-outcome-header'>Detail</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {student.map((studentdata, index) => (
//                         <tr key={index}>
//                             <td className='stu-outcome-content'>{studentdata.reg_no}</td>
//                             <td className='stu-outcome-content'>{studentdata.course_id}</td>
//                             <td className='stu-outcome-content'>{studentdata.course_code}</td>
//                             <td className='stu-outcome-content'>{studentdata.semester}</td>
//                             <td className='stu-outcome-content'>{studentdata.lot_percentage}</td>
//                             <td className='stu-outcome-content'>{studentdata.mot_percentage}</td>
//                             <td className='stu-outcome-content'>{studentdata.hot_percentage}</td>
//                             <td className='stu-outcome-content'></td>
//                             <td className='stu-outcome-content'></td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }
// export default Studentoutcome

