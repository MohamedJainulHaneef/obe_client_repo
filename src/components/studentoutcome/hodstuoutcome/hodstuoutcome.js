import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../adminstuoutcome/adminstuoutcome.css'

function HodStuOutcome() {
     const { staffId } = useParams();
     const apiUrl = process.env.REACT_APP_API_URL;

     const [academicYear, setAcademicYear] = useState("");
     const [categories, setCategories] = useState("");
     const [departments, setDepartments] = useState("");
     const [classes, setClasses] = useState([]);
     const [semesters, setSemesters] = useState([]);
     const [sections, setSections] = useState([]);

     const [selectedClass, setSelectedClass] = useState("");
     const [selectedSemester, setSelectedSemester] = useState("");
     const [selectedSection, setSelectedSection] = useState("");

     const [outcomeData, setOutcomeData] = useState("");
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

     useEffect(() => {
          // Fetch HOD data
          const fetchHodData = async () => {
               try {
                    const response = await axios.get(`${apiUrl}/api/hoddata`, { params: { staffId } });
                    if (response.data) {
                         setCategories(response.data.category || "");
                         setDepartments(response.data.dept_name || "");
                    }
               } catch (err) {
                    console.error("Error fetching HOD data:", err);
               }
          };

          fetchHodData();
     }, [apiUrl, staffId]);

     useEffect(() => {
          // Fetch classes based on academic year, category, and department
          const fetchClasses = async () => {
               try {
                    const response = await axios.get(`${apiUrl}/api/courseid`, {
                         params: {
                              academicYear,
                              categories,
                              departments,
                         },
                    });
                    if (response.data) {
                         // console.log(response.data.degree);
                         setClasses([...new Set(response.data.map((item) => item.course_id))].sort());
                    } else {
                         setClasses([]);
                    }
               } catch (err) {
                    console.error("Error fetching classes:", err);
               }
          };

          if (academicYear && categories && departments) {
               fetchClasses();
          }
     }, [academicYear, categories, departments, apiUrl]);

     //fetch coursedata
     const fetchCourseData = async (filters) => {
          try {
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

     const handleClassChange = (value) => {
          setSelectedClass(value);
          setSelectedSection("");
          setSelectedSemester("");
          fetchCourseData({
               academic_year: academicYear,
               category: categories,
               dept_name: departments,
               staff_id: staffId,
               course_id: value,
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
               })
     }

     const sendData = async () => {
          if (!selectedClass || !selectedSemester || !selectedSection) {
               alert("Please select Class, Semester, and Section before submitting.");
               return;
          }

          try {
               const payload = {
                    category: categories,
                    department: departments,
                    deptId: selectedClass,
                    semester: selectedSemester,
                    section: selectedSection,
                    academicYear: academicYear,
               };

               const dropDownData = await axios.post(`${apiUrl}/api/hoduoutcome`, payload);

               if (dropDownData.data) {
                    setOutcomeData(dropDownData.data);
                    setOutcomeTable(true);
               }
          } catch (err) {
               console.error("Error sending data:", err);
               alert("Failed to send data");
          }
     };

     return (
          <div className="aso-main">
               <div className="aso-dropdown-container">
                    <div className="aso-search-cnt">
                         <span className="aso-label">Academic Year :</span>
                         <input type="text" className="aso-select" value={academicYear} readOnly />
                    </div>
                    <div className="aso-search-cnt">
                         <span className="aso-label">Category : </span>
                         <input type="text" className="aso-select" value={categories} readOnly />
                    </div>
                    <div className="aso-search-cnt">
                         <span className="aso-label">Department : </span>
                         <input type="text" className="aso-select" value={departments} readOnly />
                    </div>
                    <div className="aso-search-cnt">
                         <span className="aso-label">Class :</span>
                         <select className="aso-select" value={selectedClass} onChange={(e) => handleClassChange(e.target.value)}>
                              <option className="aso-option" value="">Select</option>
                              {classes.map((cls, index) => (
                                   <option className="aso-option" key={index} value={cls}>
                                        {cls}
                                   </option>
                              ))}
                         </select>
                    </div>
                    <div className="aso-search-cnt">
                         {/* <label>Semester: </label> */}
                         <span className="aso-label">Semester :</span>
                         <select className="aso-select" value={selectedSemester} onChange={(e) => handleSemesterChange(e.target.value)}>
                              <option className="aso-option" value="">Select</option>
                              {semesters.map((sem, index) => (
                                   <option className="aso-option" key={index} value={sem}>
                                        {sem}
                                   </option>
                              ))}
                         </select>
                    </div>
                    <div className="aso-search-cnt">
                         <span className="aso-label">Section :</span>
                         <select className="aso-select" value={selectedSection} onChange={(e) => handleSectionChange(e.target.value)}>
                              <option className="aso-option" value="">Select</option>
                              {sections.map((sec, index) => (
                                   <option className="aso-option" key={index} value={sec}>
                                        {sec}
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
     );
}

export default HodStuOutcome;
