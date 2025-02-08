import React, { useState, useEffect } from "react";
import axios from "axios";
import './adminstuoutcome.css';

function AdminStuOutcome() 
{
    const apiUrl = process.env.REACT_APP_API_URL;
    const [showSclaPopup, setShowSclaPopup] = useState(false);
    const [categories, setCategories] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");
    const [outcomeData, setOutcomeData] = useState("");
    const [academicSem, setAcademicSem] = useState('');
    const [outcomeTable, setOutcomeTable] = useState('');
    
    useEffect(() => 
    {
        const fetchacademicSemAndData = async () => 
        {
            try {
                const yearResponse = await axios.post(`${apiUrl}/activesem`, {});
                const activeYear = yearResponse.data.academic_sem;
                setAcademicSem(activeYear);
                fetchCourseData({ academic_year: activeYear });
            } 
            catch (error) {
                console.error("Error Fetching Active Academic Year or Course Data :", error);
                alert("Failed to fetch Academic Year and Related Data");
            }
        }
        fetchacademicSemAndData();
    }, []);

    const handlePopup = () => { setShowSclaPopup(true) }
    const closePopup  = () => { setShowSclaPopup(false) }

    const fetchCourseData = async (filters) => 
    {
        try 
        {
            const response = await axios.get(`${apiUrl}/api/coursemapping`, {
                params: filters,
            })

            const data = response.data || [];

            if (!filters.category) {
                const sortedCategories = [...new Set(data.map((item) => item.category))].sort();
                setCategories(sortedCategories);
            }
            if (!filters.dept_name) {
                const sortedDepartments = [...new Set(data.map((item) => item.dept_name))].sort();
                setDepartments(sortedDepartments);
            }
            if (!filters.dept_id) {
                const sortedClasses = [...new Set(data.map((item) => item.dept_id))].sort();
                setClasses(sortedClasses);
            }
            if (!filters.semester) {
                const sortedSemesters = [...new Set(data.map((item) => item.semester))].sort((a, b) => a - b); // Assuming semester is numeric
                setSemesters(sortedSemesters);
            }
            if (!filters.section) {
                const sortedSections = [...new Set(data.map((item) => item.section))].sort();
                setSections(sortedSections);
            }
        }
        catch (error) {
            console.error("Error Fetching Course Data:", error);
            alert("Failed to Fetch Course Data");
        }
    }

    const handleCategoryChange = (value) => 
    {
        setSelectedCategory(value);
        setSelectedDepartment("");
        setSelectedClass("");
        setSelectedSemester("");
        setSelectedSection("");
        fetchCourseData({ academic_sem: academicSem, category: value });
    }

    const handleDepartmentChange = (value) => 
    {
        setSelectedDepartment(value);
        setSelectedClass("");
        setSelectedSemester("");
        setSelectedSection("");
        fetchCourseData(
        {
            academic_sem: academicSem,
            category: selectedCategory,
            dept_name: value,
        })
    }

    const handleClassChange = (value) => 
    {
        setSelectedClass(value);
        setSelectedSemester("");
        setSelectedSection("");
        fetchCourseData({
            academic_sem: academicSem,
            category: selectedCategory,
            dept_name: selectedDepartment,
            dept_id: value,
        })
    }

    const handleSemesterChange = (value) => 
    {
        setSelectedSemester(value);
        setSelectedSection("");
        fetchCourseData(
        {
            academic_sem: academicSem, 
            category: selectedCategory,
            dept_name: selectedDepartment,
            dept_id: selectedClass,
            semester: value,
        })
    }

    const handleSectionChange = (value) => 
    {
        setSelectedSection(value);
        fetchCourseData(
        {
            academic_sem: academicSem,
            category: selectedCategory,
            dept_name: selectedDepartment,
            dept_id: selectedClass,
            semester: selectedSemester,
            section: value,
        })
    }

    const sendData = async () => 
    {
        const dropDownData = await axios.post(`${apiUrl}/api/adminstuoutcome`, { 
            academicSem, selectedCategory, selectedDepartment, selectedClass, selectedSection, selectedSemester 
        })
        setOutcomeData(dropDownData.data);
        setOutcomeTable(true);
    }

    return (
        <div className="aso-main">
            <div className="aso-dropdown-container">
                <div className="aso-search-cnt">
                    <span className="aso-label">Academic Year : </span>
                    <input
                        type="text"
                        className="aso-select"
                        value={academicSem}
                        readOnly
                        disabled
                    />
                </div>
                <div className="aso-search-cnt">
                    <span className="aso-label">Category : </span>
                    <select className="aso-select" value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
                        <option className="aso-option" value="">Select</option>
                        {categories.map((category, index) => (
                            <option className="aso-option" key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select> 
                </div>
                <div className="aso-search-cnt">
                    <span className="aso-label">Department : </span>
                    <select className="aso-select" value={selectedDepartment} onChange={(e) => handleDepartmentChange(e.target.value)}>
                        <option className="aso-option" value="">Select</option>
                        {departments.map((dept, index) => (
                            <option className="aso-option" key={index} value={dept}>
                                {dept}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="aso-search-cnt">
                    <span className="aso-label">Class : </span>
                    <select className="aso-select" value={selectedClass} onChange={(e) => handleClassChange(e.target.value)}>
                        <option className="aso-option" value="">Select</option>
                        {classes.map((className, index) => (
                            <option className="aso-option" key={index} value={className}>
                                {className}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="aso-search-cnt">
                    <span className="aso-label">Semester : </span>
                    <select className="aso-select" value={selectedSemester} onChange={(e) => handleSemesterChange(e.target.value)}>
                        <option className="aso-option" value="">Select</option>
                        {semesters.map((semester, index) => (
                            <option className="aso-option" key={index} value={semester}>
                                {semester}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="aso-search-cnt">
                    <span className="aso-label">Section : </span>
                    <select className="aso-select" value={selectedSection} onChange={(e) => handleSectionChange(e.target.value)}>
                        <option className="aso-option" value="">Select</option>
                        {sections.map((section, index) => (
                            <option className="aso-option" key={index} value={section}>
                                {section}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="aso-btn-content">
                <button className="aso-btn" onClick={sendData}>Fetch Outcome</button>
            </div>
            {outcomeTable && (
                <div className="aso-table-container" >
                    <div className="aso-header">
                        <div className="aso-header-title1">
                            <h1 className="">JAMAL MOHAMED COLLEGE (Autonomous)</h1>
                            <span>
                                Nationally Accredited with A++ Grade by NAAC (4th Cycle) with CGPA
                                3.69 out of 4.0
                            </span>
                            <span>Affiliated to Bharathidasan University</span>
                            <h3>TIRUCHIRAPPALLI - 620 020 .</h3>
                        </div>
                    </div>
                    <div className="aso-header-title2">
                        <h3>OUTCOME BASED EDUCATION - {academicSem}</h3>
                    </div>
                    <h2 className='aso-heading'  title='Click to View' onClick={handlePopup}>
                        SCLA - Student Cognitive Level Attainment
                    </h2>
                    {showSclaPopup && (
                        <div className="alert-overlay">
                            <div className="alert-box">
                                <p>
                                    The attainment level for each student in a course is calculated by analyzing their performance across three cognitive levels :
                                    Lower-Order Thinking (LOT), Medium-Order Thinking (MOT), and Higher-Order Thinking (HOT). Each cognitive level is assessed
                                    for Continuous Internal Assessment (CIA) and End-Semester Examination (ESE).
                                </p>
                                <button onClick={closePopup} className="alert-button">
                                    OK
                                </button>
                            </div>
                        </div>
                    )}
                    {outcomeData && outcomeData.length > 0 ? (
                        <table className="aso-table">
                            <thead>
                                <tr>
                                    <th className='aso-header' rowSpan={2}>Reg No</th>
                                    <th className='aso-header' rowSpan={2}>Course Code</th>
                                    <th className='aso-header' colSpan={3}>INTERNAL</th>
                                    <th className='aso-header' colSpan={3}>EXTERNAL</th>
                                    <th className='aso-header' colSpan={3}>TOTAL</th>
                                    <th className='aso-header'rowSpan={2}>GRADE</th>
                                </tr>
                                <tr>
                                    <th className='aso-header'>LOT</th>
                                    <th className='aso-header'>MOT</th>
                                    <th className='aso-header'>HOT</th>
                                    <th className='aso-header'>LOT</th>
                                    <th className='aso-header'>MOT</th>
                                    <th className='aso-header'>HOT</th>
                                    <th className='aso-header'>LOT</th>
                                    <th className='aso-header'>MOT</th>
                                    <th className='aso-header'>HOT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {outcomeData.map((item, index) => (
                                    <tr key={index}>
                                        <td className='aso-content'>{item.reg_no}</td>
                                        <td className='aso-content'>{item.course_code}</td>
                                        <td className='aso-content-cia'>{item.lot_attainment}</td>
                                        <td className='aso-content-cia'>{item.mot_attainment}</td>
                                        <td className='aso-content-cia'>{item.hot_attainment}</td>
                                        <td className='aso-content-ese'>{item.elot_attainment}</td>
                                        <td className='aso-content-ese'>{item.emot_attainment}</td>
                                        <td className='aso-content-ese'>{item.ehot_attainment}</td>
                                        <td className='aso-content-all'>{item.overAll_lot}</td>
                                        <td className='aso-content-all'>{item.overAll_mot}</td>
                                        <td className='aso-content-all'>{item.overAll_hot}</td>
                                        <td className='aso-content'>{item.final_grade}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="aso-no-content">No Data Available. Please refine your Search.</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default AdminStuOutcome;