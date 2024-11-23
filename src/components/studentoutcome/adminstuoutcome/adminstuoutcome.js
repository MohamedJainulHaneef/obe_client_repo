import React, { useState, useEffect } from "react";
import axios from "axios";
import './adminstuoutcome.css';

function AdminStuOutcome() 
{
    const apiUrl = process.env.REACT_APP_API_URL;

    const [academicYears, setAcademicYears] = useState([]);
    const [categories, setCategories] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [semesters, setSemesters] = useState([]);

    const [selectedAcademicYear, setSelectedAcademicYear] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");
    const [outcomeData, setOutcomeData] = useState("");
    const [academicYear, setAcademicYear] = useState('');

    useEffect(() => 
    {
        const fetchAcademicYears = async () => 
        {
            try {
                const response = await axios.get(`${apiUrl}/api/academic`);
                setAcademicYears(response.data.academic_data || []);
            } 
            catch (error) {
                console.error("Error fetching academic years:", error);
                alert("Failed to fetch academic years");
            }
        }
        fetchAcademicYears();

        const academicYearSet = async () => 
        {
            try {
                const response = await axios.post(`${apiUrl}/activesem`, {});
                setAcademicYear(response.data.academic_year);
            } 
            catch (err) {
                console.log('Error fetching academic year:', err);
            }
        }
        academicYearSet();

    }, []);

    const fetchCourseData = async (filters) => 
    {
        try 
        {
            const response = await axios.get(`${apiUrl}/api/coursemapping`, {
                params: filters,
            })

            const data = response.data || [];

            if (!filters.category) setCategories([...new Set(data.map((item) => item.category))]);
            if (!filters.dept_name) setDepartments([...new Set(data.map((item) => item.dept_name))]);
            if (!filters.course_id) setClasses([...new Set(data.map((item) => item.course_id))]);
            if (!filters.section) setSections([...new Set(data.map((item) => item.section))]);
            if (!filters.semester) setSemesters([...new Set(data.map((item) => item.semester))]);
        } 
        catch (error) {
            console.error("Error Fetching Course Data:", error);
            alert("Failed to Fetch Course Data");
        }
    }

    const handleAcademicYearChange = (value) => 
    {
        setSelectedAcademicYear(value);
        setSelectedCategory("");
        setSelectedDepartment("");
        setSelectedClass("");
        setSelectedSection("");
        setSelectedSemester("");
        fetchCourseData({ academic_year: value });
    }

    const handleCategoryChange = (value) =>
    {
        setSelectedCategory(value);
        setSelectedDepartment("");
        setSelectedClass("");
        setSelectedSection("");
        setSelectedSemester("");
        fetchCourseData({ academic_year: selectedAcademicYear, category: value });
    }

    const handleDepartmentChange = (value) => 
    {
        setSelectedDepartment(value);
        setSelectedClass("");
        setSelectedSection("");
        setSelectedSemester("");
        fetchCourseData(
        {
            academic_year: selectedAcademicYear,
            category: selectedCategory,
            dept_name: value,
        })
    }

    const handleClassChange = (value) => 
    {
        setSelectedClass(value);
        setSelectedSection("");
        setSelectedSemester("");
        fetchCourseData({
            academic_year: selectedAcademicYear,
            category: selectedCategory,
            dept_name: selectedDepartment,
            course_id: value,
        })
    }

    const handleSectionChange = (value) =>
    {
        setSelectedSection(value);
        setSelectedSemester("");
        fetchCourseData(
        {
            academic_year: selectedAcademicYear,
            category: selectedCategory,
            dept_name: selectedDepartment,
            course_id: selectedClass,
            section: value,
        })
    }

    const handleSemesterChange = (value) => 
    {
        setSelectedSemester(value);
        fetchCourseData(
        {
            academic_year: selectedAcademicYear,
            category: selectedCategory,
            dept_name: selectedDepartment,
            course_id: selectedClass,
            section: selectedSection,
            semester: value,
        })
    }

    const sendData = async () => 
    {
        const dropDownData = await axios.post(`${apiUrl}/api/adminstuoutcome`,
            { selectedAcademicYear, selectedCategory, selectedDepartment, selectedClass, selectedSection, selectedSemester });
        if (dropDownData.data) {
            console.log(dropDownData.data)
            setOutcomeData(dropDownData.data);
        }
    }

    return (
        <div className="aso-main">
            <div className="aso-dropdown-container">
                <div className="aso-search-cnt">
                    <span className="aso-label">Academic Year : </span>
                    <select className="aso-select" value={selectedAcademicYear} onChange={(e) => handleAcademicYearChange(e.target.value)}>
                        <option className="aso-option" value="">Select</option>
                        {academicYears.map((year, index) => (
                            <option className="aso-option" key={index} value={year.academic_year}>
                                {year.academic_year}
                            </option>
                        ))}
                    </select>
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
                <button className="aso-btn" onClick={sendData}>Search</button>
            </div>
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
                    <h3>OUTCOME BASED EDUCATION - {academicYear}</h3>
                </div>
                <h2 className='aso-heading'>Student Attainment Level</h2>
                {outcomeData && outcomeData.length > 0 ? (
                    <table className="aso-table">
                        <thead>
                            <tr>
                                <th className='aso--header'>Reg No</th>
                                <th className='aso--header'>Course Code</th>
                                <th className='aso--header'>CIA LOT</th>
                                <th className='aso--header'>CIA MOT</th>
                                <th className='aso--header'>CIA HOT</th>
                                <th className='aso--header'>ESE LOT</th>
                                <th className='aso--header'>ESE MOT</th>
                                <th className='aso--header'>ESE HOT</th>
                                <th className='aso--header'>OA LOT</th>
                                <th className='aso--header'>OA MOT</th>
                                <th className='aso--header'>OA HOT</th>
                                <th className='aso--header'>GRADE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {outcomeData.map((item, index) => (
                                <tr key={index}>
                                    <td className='aso--content'>{item.reg_no}</td>
                                    <td className='aso--content'>{item.course_code}</td>
                                    <td className='aso--content'>{item.lot_attainment}</td>
                                    <td className='aso--content'>{item.mot_attainment}</td>
                                    <td className='aso--content'>{item.hot_attainment}</td>
                                    <td className='aso--content'>{item.elot_attainment}</td>
                                    <td className='aso--content'>{item.emot_attainment}</td>
                                    <td className='aso--content'>{item.ehot_attainment}</td>
                                    <td className='aso--content'>{item.overAll_lot}</td>
                                    <td className='aso--content'>{item.overAll_mot}</td>
                                    <td className='aso--content'>{item.overAll_hot}</td>
                                    <td className='aso--content'>{item.final_grade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                <p className="aso-no-content">No data available. Please refine your Search.</p>
            )}
        </div>
        </div>
    ) 
}

export default AdminStuOutcome;