import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './hodstuoutcome.css'

function HodStuOutcome() 
{
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

	useEffect(() => 
	{
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

	useEffect(() => 
	{
		const fetchHodData = async () => {
			try {
				const response = await axios.get(`${apiUrl}/api/hoddata`, { params: { staffId } });
				if (response.data) {
					setCategories(response.data.category || "");
					setDepartments(response.data.dept_name || "");
				}
			}
			catch (err) {
				console.error("Error fetching HOD data:", err);
			}
		}
		fetchHodData();
	}, [apiUrl, staffId]);

	useEffect(() => 
	{
		const fetchClasses = async () => 
		{
			try 
			{
				const response = await axios.get(`${apiUrl}/api/courseid`, {
					params: { academicYear, categories, departments },
				})
				if (response.data) {
					setClasses([...new Set(response.data.map((item) => item.course_id))].sort());
				} 
				else {
					setClasses([]);
				}
			}
			catch (err) {
				console.error("Error fetching classes:", err);
			}
		}
		if (academicYear && categories && departments) {
			fetchClasses();
		}
	}, [academicYear, categories, departments, apiUrl]);

	const fetchCourseData = async (filters) => 
	{
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

	const sendData = async () => 
	{
		if (!selectedClass || !selectedSemester || !selectedSection) {
			alert("Please select Class, Semester, and Section before submitting.");
			return;
		}
		try 
		{
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
		} 
		catch (err) {
			console.error("Error sending data:", err);
			alert("Failed to send data");
		}
	}

	return (
		<div className="hso-main">
			<div className="hso-dropdown-container">
				<div className="hso-search-cnt">
					<span className="hso-label">Academic Year :</span>
					<input type="text" className="hso-select" value={academicYear} readOnly disabled />
				</div>
				<div className="hso-search-cnt">
					<span className="hso-label">Category : </span>
					<input type="text" className="hso-select" value={categories} readOnly disabled />
				</div>
				<div className="hso-search-cnt">
					<span className="hso-label">Department : </span>
					<input type="text" className="hso-select" value={departments} readOnly disabled />
				</div>
				<div className="hso-search-cnt">
					<span className="hso-label">Class :</span>
					<select className="hso-select" value={selectedClass} onChange={(e) => handleClassChange(e.target.value)}>
						<option className="hso-option" value="">Select</option>
						{classes.map((cls, index) => (
							<option className="hso-option" key={index} value={cls}>
								{cls}
							</option>
						))}
					</select>
				</div>
				<div className="hso-search-cnt">
					<span className="hso-label">Semester :</span>
					<select className="hso-select" value={selectedSemester} onChange={(e) => handleSemesterChange(e.target.value)}>
						<option className="hso-option" value="">Select</option>
						{semesters.map((sem, index) => (
							<option className="hso-option" key={index} value={sem}>
								{sem}
							</option>
						))}
					</select>
				</div>
				<div className="hso-search-cnt">
					<span className="hso-label">Section :</span>
					<select className="hso-select" value={selectedSection} onChange={(e) => handleSectionChange(e.target.value)}>
						<option className="hso-option" value="">Select</option>
						{sections.map((sec, index) => (
							<option className="hso-option" key={index} value={sec}>
								{sec}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className="hso-btn-content">
				<button className="hso-btn" onClick={sendData}>Get</button>
			</div>
			{outcomeTable && (
				<div className="hso-table-container" >
					<div className="hso-header">
						<div className="hso-header-title1">
							<h1 className="">JAMAL MOHAMED COLLEGE (Autonomous)</h1>
							<span>
								Nationally Accredited with A++ Grade by NAAC (4th Cycle) with CGPA
								3.69 out of 4.0
							</span>
							<span>Affiliated to Bharathidasan University</span>
							<h3>TIRUCHIRAPPALLI - 620 020 .</h3>
						</div>
					</div>
					<div className="hso-header-title2">
						<h3>OUTCOME BASED EDUCATION - {academicYear}</h3>
					</div>
					<h2 className='hso-heading'>SCLA - Student Cognitive Level Attainment</h2>
					{outcomeData && outcomeData.length > 0 ? (
						<table className="hso-table">
							<thead>
								<tr>
									<th className='hso-header' rowSpan={2}>Reg No</th>
									<th className='hso-header' rowSpan={2}>Course Code</th>
									<th className='hso-header' colSpan={3}>INTERNAL</th>
									<th className='hso-header' colSpan={3}>EXTERNAL</th>
									<th className='hso-header' colSpan={3}>TOTAL</th>
									<th className='hso-header' rowSpan={2}>GRADE</th>
								</tr>
								<tr>
									<th className='hso-header'>LOT</th>
									<th className='hso-header'>MOT</th>
									<th className='hso-header'>HOT</th>
									<th className='hso-header'>LOT</th>
									<th className='hso-header'>MOT</th>
									<th className='hso-header'>HOT</th>
									<th className='hso-header'>LOT</th>
									<th className='hso-header'>MOT</th>
									<th className='hso-header'>HOT</th>
								</tr>
							</thead>
							<tbody>
								{outcomeData.map((item, index) => (
									<tr key={index}>
										<td className='hso-content'>{item.reg_no}</td>
										<td className='hso-content'>{item.course_code}</td>
										<td className='hso-content-clr'>{item.lot_attainment}</td>
										<td className='hso-content-clr'>{item.mot_attainment}</td>
										<td className='hso-content-clr'>{item.hot_attainment}</td>
										<td className='hso-content'>{item.elot_attainment}</td>
										<td className='hso-content'>{item.emot_attainment}</td>
										<td className='hso-content'>{item.ehot_attainment}</td>
										<td className='hso-content-clr'>{item.overAll_lot}</td>
										<td className='hso-content-clr'>{item.overAll_mot}</td>
										<td className='hso-content-clr'>{item.overAll_hot}</td>
										<td className='hso-content'>{item.final_grade}</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<p className="hso-no-content">No data available. Please refine your Search.</p>
					)}
				</div>
			)}
		</div>
	);
}

export default HodStuOutcome;
