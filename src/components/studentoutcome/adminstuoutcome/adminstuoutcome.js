import React, { useState, useEffect } from "react";
import axios from "axios";
import './adminstuoutcome.css';

function AdminStuOutcome() 
{
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

    useEffect(() => 
    {
        const fetchAcademicYears = async () => 
        {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/academic`);
                setAcademicYears(response.data.academic_data || []);
            } 
            catch (error) {
                console.error("Error fetching academic years:", error);
                alert("Failed to fetch academic years");
            }
        }
        fetchAcademicYears();
    }, []);

    const fetchCourseData = async (filters) => 
    {
        try 
        {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/coursemapping`, {
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
        const dropDownData = await axios.post(`${process.env.REACT_APP_API_URL}/searchdata`,
            { selectedAcademicYear, selectedCategory, selectedDepartment, selectedClass, selectedSection, selectedSemester });
        if (dropDownData.data) {
            console.log(dropDownData.data)
        }
    }

    return (
        <div className="aso-main">
            <div className="aso-dropdown-container">
                <div className="aso-search-cnt">
                    <label className="aso-label">Academic Year : </label>
                    <select value={selectedAcademicYear} onChange={(e) => handleAcademicYearChange(e.target.value)}>
                        <option value="">Select</option>
                        {academicYears.map((year, index) => (
                            <option key={index} value={year.academic_year}>
                                {year.academic_year}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="aso-search-cnt">
                    <label className="aso-label">Category : </label>
                    <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
                        <option value="">Select</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="aso-search-cnt">
                    <label className="aso-label">Department : </label>
                    <select value={selectedDepartment} onChange={(e) => handleDepartmentChange(e.target.value)}>
                        <option value="">Select</option>
                        {departments.map((dept, index) => (
                            <option key={index} value={dept}>
                                {dept}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="aso-search-cnt">
                <label className="aso-label">Class : </label>
                    <select value={selectedClass} onChange={(e) => handleClassChange(e.target.value)}>
                        <option value="">Select</option>
                        {classes.map((className, index) => (
                            <option key={index} value={className}>
                                {className}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="aso-search-cnt">
                    <label className="aso-label">Semester : </label>
                    <select value={selectedSemester} onChange={(e) => handleSemesterChange(e.target.value)}>
                        <option value="">Select</option>
                        {semesters.map((semester, index) => (
                            <option key={index} value={semester}>
                                {semester}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="aso-search-cnt">
                <label className="aso-label">Section : </label>
                    <select value={selectedSection} onChange={(e) => handleSectionChange(e.target.value)}>
                        <option value="">Select</option>
                        {sections.map((section, index) => (
                            <option key={index} value={section}>
                                {section}
                            </option>
                        ))}
                    </select>
                </div>   
            </div>
            <button onClick={sendData}>Search</button>
        </div>
    )
}

export default AdminStuOutcome;