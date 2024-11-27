import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


function HandleStuOutcome() {
     const apiUrl = process.env.REACT_APP_API_URL;
     const { staffId } = useParams();


     const [academicYears, setAcademicYears] = useState([]);
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
     const [academicYear, setAcademicYear] = useState('');
     const [outcomeTable, setOutcomeTable] = useState('');
     useEffect(() => {
          // Fetch active academic year
          const fetchAcademicYear = async () => {
               try {
                    const response = await axios.post(`${apiUrl}/activesem`);
                    setAcademicYear(response.data.academic_year || "");
               } catch (err) {
                    console.error("Error fetching academic year:", err);
               }
          };

          fetchAcademicYear();
     }, [apiUrl]);

     // fetch category 
     useEffect(() => {
          const fetchcategory = async () => {
               try {
                    const responce = await axios.get(`${apiUrl}/api/category`, {
                         params: { staffId }
                    })
                    if (responce.data) {
                         setCategories([...new Set(responce.data.map((item) => item.category))].sort());
                    }
               } catch (err) {
                    window.alert("category fetching error ");
               }
          }
          fetchcategory();
     });

     const fetchCourseData = async (filters) => {
          try {
               const response = await axios.get(`${apiUrl}/api/stucoursemapping`, {
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
               if (!filters.course_id) {
                    const sortedClasses = [...new Set(data.map((item) => item.course_id))].sort();
                    setClasses(sortedClasses);
               }
               if (!filters.semester) {
                    const sortedSemesters = [...new Set(data.map((item) => item.semester))].sort((a, b) => a - b);
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



     const handleCategoryChange = (value) => {
          setSelectedCategory(value);
          setSelectedDepartment("");
          setSelectedClass("");
          setSelectedSection("");
          setSelectedSemester("");
          fetchCourseData({ academic_year: academicYear, category: value, staff_id: staffId });
     }

     const handleDepartmentChange = (value) => {
          setSelectedDepartment(value);
          setSelectedClass("");
          setSelectedSection("");
          setSelectedSemester("");
          fetchCourseData(
               {
                    academic_year: academicYear,
                    category: selectedCategory,
                    dept_name: value,
                    staff_id: staffId
               })
     }
     const handleClassChange = (value) => {
          setSelectedClass(value);
          setSelectedSection("");
          setSelectedSemester("");
          fetchCourseData({
               academic_year: academicYear,
               category: categories,
               dept_name: departments,
               course_id: value,
               staff_id: staffId
          })
     }

     const handleSemesterChange = (value) => {
          setSelectedSemester(value);
          setSelectedSection("");
          fetchCourseData(
               {
                    academic_year: academicYear,
                    category: categories,
                    dept_name: departments,
                    course_id: selectedClass,
                    semester: value,
                    staff_id: staffId
               })
     }

     const handleSectionChange = (value) => {
          setSelectedSection(value);
          fetchCourseData(
               {
                    academic_year: academicYear,
                    category: categories,
                    dept_name: departments,
                    course_id: selectedClass,
                    semester: selectedSemester,
                    section: value,
                    staff_id: staffId
               });

     }
     const sendData = async () => {
          try {
               const dropDownData = await axios.post(`${apiUrl}/api/staffstuoutcome`, {
                    academicYear, selectedCategory, selectedDepartment, selectedClass, selectedSection, selectedSemester, staffId
               });
               if (dropDownData.data) {
                    window.alert("data posted");
                    console.log(dropDownData.data);
                    setOutcomeData(dropDownData.data);
        setOutcomeTable(true);
               }
          } catch (err) {
               console.log("Error", err);
          }

          // setOutcomeData(dropDownData.data);
          // setOutcomeTable(true);
     }
     return (
          <div className="aso-main">
               <div className="aso-dropdown-container">
                    <div className="aso-search-cnt">
                         <span className="aso-label">Academic Year : </span>
                         <input
                              type="text"
                              className="aso-select"
                              value={academicYear}
                              readOnly
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
                    <button className="aso-btn" onClick={sendData}>Get</button>
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
                        <h3>OUTCOME BASED EDUCATION - {academicYear}</h3>
                    </div>
                    <h2 className='aso-heading'>SCLA - Student Cognitive Level Attainment</h2>
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
            )}
          </div>
     )
}

export default HandleStuOutcome