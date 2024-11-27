import React, { useState, useEffect } from "react";
import axios from "axios";
import "./stumark.css";
import { useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function Stumark() 
{
    const apiUrl = process.env.REACT_APP_API_URL;
    const location = useLocation();
    const [active, setActive] = useState();
    const [stuData, setStuData] = useState([]);
    const [isSaveLoading, setIsSaveLoading] = useState(false);
    const [isSaveConfirmLoading, setIsSaveConfirmLoading] = useState(false);
    const [activeSection, setActiveSection] = useState('1');
    const [academicYear, setAcademicYear] = useState('');
    const [maxMark, setMaxMark] = useState('');
    const { deptName, section, semester, classDetails, courseCode, courseTitle, courseId, category } = location.state || {};

    useEffect(() => 
    {
        const academicYearSet = async () => 
        {
            try {
                const response = await axios.post(`${apiUrl}/activesem`, {});
                setAcademicYear(response.data.academic_year);
            } 
            catch (err) {
                console.log('Error fetching academic year:', err);
            }
        };
        academicYearSet();

        const maxMarkSet = async () =>
        {
            try {
                const response = await axios.post(`${apiUrl}/api/maxmark`, {});
                setMaxMark(response.data);
            } 
            catch (err) {
                console.log('Error Fetching Max Mark :', err);
            }
        }
        maxMarkSet();

    }, [apiUrl]);

    useEffect(() => 
    {
        const storedSection = localStorage.getItem("activeSection");
        if (storedSection) {
            setActiveSection(storedSection);
            localStorage.removeItem("activeSection");
        }
    }, []);

    useEffect(() => 
    {
        if (academicYear) 
        {  
            const stuDetails = async () => 
            {
                try 
                {
                    const StuResponse = await axios.post(`${apiUrl}/api/studentdetails`, {
                        course_id: courseId,
                        stu_section: section,
                        stu_category: category,
                        stu_course_code: courseCode,
                        activeSection,
                        academic_year: academicYear
                    });

                    setStuData(StuResponse.data);
    
                    const disable = await axios.get(`${apiUrl}/api/getreport`, {
                        params: { activeSection, courseCode, deptName, section, category, academicYear }
                    });
    
                    if (disable.data) {
                        setActive(disable.data);
                    } 
                    else {
                        console.warn('Received Null or Undefined Data from /getreport');
                        setActive({});
                    }
                } 
                catch (err) {
                    console.log('Error Fetching Student Details :', err);
                }
            };
            stuDetails();
        }
    }, [academicYear, courseId, section, category, courseCode, deptName, activeSection, apiUrl]);


    const handleSectionChange = (event) => 
    {
        setActiveSection(event.target.value);
        setStuData(stuData.map(user => ({
            ...user,
            lot: '',
            mot: '',
            hot: '',
            total: ''
        })))
    }

    const handleInputChange = (registerNo, type, value) => 
    {
        let validatedValue = value;
    
        if (type === 'lot') 
        {
            if (activeSection === '1') 
            {
                if (value > maxMark?.c1_lot) {
                    alert("Value for LOT cannot exceed " + maxMark?.c1_lot);                    
                    validatedValue = '';
                }
            }
            else if (activeSection === '2') 
            {
                if (value > maxMark?.c2_lot) {
                    alert("Value for LOT cannot exceed " + maxMark?.c2_lot);                    
                    validatedValue = '';
                }
            }
            else if (activeSection === '3') 
            {
                if (value > maxMark?.a1_lot) {
                    alert("Value for LOT cannot exceed " + maxMark?.a1_lot);                    
                    validatedValue = '';
                }
            }
            else if (activeSection === '4') 
            {
                if (value > maxMark?.a2_lot) {
                    alert("Value for LOT cannot exceed " + maxMark?.a2_lot);                    
                    validatedValue = '';
                }
            }
            else
            {
                if (value > maxMark?.e_lot) {
                    alert("Value for LOT cannot exceed " + maxMark?.e_lot);                    
                    validatedValue = '';
                }
            }
        }
        else if (type === 'mot') 
        {
            if (activeSection === '1') 
            {
                if (value > maxMark?.c1_mot) {
                    alert("Value for LOT cannot exceed " + maxMark?.c1_mot);                    
                    validatedValue = '';
                }
            }
            else if (activeSection === '2') 
            {
                if (value > maxMark?.c2_mot) {
                    alert("Value for LOT cannot exceed " + maxMark?.c2_mot);                    
                    validatedValue = '';
                }
            }
            else if (activeSection === '5')            
            {
                if (value > maxMark?.e_mot) {
                    alert("Value for LOT cannot exceed " + maxMark?.e_mot);                    
                    validatedValue = '';
                }
            }
        }
        else if (type === 'hot') 
        {
            if (activeSection === '1') 
            {
                if (value > maxMark?.c1_hot) {
                    alert("Value for LOT cannot exceed " + maxMark?.c1_hot);                    
                    validatedValue = '';
                }
            }
            else if (activeSection === '2') 
            {
                if (value > maxMark?.c2_hot) {
                    alert("Value for LOT cannot exceed " + maxMark?.c2_hot);                    
                    validatedValue = '';
                }
            }
            else if (activeSection === '5') 
            {
                if (value > maxMark?.e_hot) {
                    alert("Value for LOT cannot exceed " + maxMark?.e_hot);                    
                    validatedValue = '';
                }
            }        
        }
    
        const updatedStuData = stuData.map(user => 
        {
            if (user.reg_no === registerNo) 
            {
                const newLot = type === 'lot' ? validatedValue : user.lot;
                const newMot = type === 'mot' ? validatedValue : user.mot;
                const newHot = type === 'hot' ? validatedValue : user.hot;
                const newTotal = parseFloat (newLot || 0) + parseFloat (newMot || 0) + parseFloat (newHot || 0);
                return { ...user, [type]: validatedValue, total: newTotal };
            }
            return user;
        })
    
        setStuData(updatedStuData);
    }
        
    const handleDisable = () => 
    {
        if (activeSection === '1') 
        {
            return active?.cia_1 === 2;
        }
        else if (activeSection === '2')
        {
            return active?.cia_2 === 2;
        }
        else if (activeSection === '3')
        {
            return active?.ass_1 === 2;
        }
        else if (activeSection === '4') 
        {
            return active?.ass_2 === 2;
        }
        else if (activeSection === '5') 
        {
            return active?.ese === 0;
        }
        return false;
    }

    const handleUpdateMark = async (e, isConfirm) => 
    {
        const button_value = isConfirm;
        e.preventDefault();
        localStorage.setItem("activeSection", activeSection);
        if (isConfirm === "1") 
        {
            setIsSaveConfirmLoading(true);
        } 
        else 
        {
            setIsSaveLoading(true);
        }
        const updates = {};
        stuData.forEach(user => 
        {
            updates[user.reg_no] = {
                lot: user.lot,
                mot: user.mot,
                hot: user.hot,
                total: user.total
            };
        });
    
        if( button_value === "1" )
        {
            const confirmAction = window.confirm("You can't able to Edit it Later. Are you sure you want to proceed ?");
            if (confirmAction) 
            {
                try {
                    const response = await axios.put(`${apiUrl}/api/updateMark`, {
                        updates, activeSection, courseCode, academicYear
                    });
                    if(response.data.success) 
                    {
                        setIsSaveConfirmLoading(false);
                        setTimeout(() => 
                        {
                            alert("Marks Submited Successfully");                   
                        }, 0);
                        window.location.reload();
                        try {
                            const reportResponse = await axios.put(`${apiUrl}/api/report`, {
                                activeSection, courseCode, deptName, section, category, button_value, academicYear
                            });
                        } 
                        catch (err) {
                            console.log("Error in Submitting Report");
                        } 
                    }
                }
                catch (err)
                {
                    alert("Error in Mark Submitting");
                }
                finally 
                {
                    setIsSaveConfirmLoading(false);
                }
            }
            else 
            {
                setIsSaveConfirmLoading(false);
            }
        }
        else 
        {
            try 
            {
                const response = await axios.put(`${apiUrl}/api/updateMark`, {
                    updates, activeSection, courseCode, academicYear
                })
                if(response.data.success)
                {
                    setIsSaveLoading(false);
                    setTimeout(() => {
                        alert("Marks Saved Successfully");
                    }, 0);
                    try 
                    {
                        const reportResponse = await axios.put(`${apiUrl}/api/report`, {
                            activeSection, courseCode, deptName, section, category, button_value, academicYear
                        });
                    } 
                    catch (err) 
                    {
                        console.log("Error in Submitting Report");
                    }
                    finally 
                    {
                        setIsSaveLoading(false);
                    }
                }
                else 
                {
                    setIsSaveLoading(false);
                    return;
                }
            }
            catch (err) {
                setIsSaveLoading(false);
                alert("Error in Mark Saving");
            }
        }
    }

    const LoadingModal = ({ isSaveLoading, isSaveConfirmLoading }) => 
    {
        if (!isSaveLoading && !isSaveConfirmLoading) return null;
        return (
            <div className="mark-loading-modal">
                <div className="mark-loading-content">
                    <h3>{isSaveLoading ? "Saving ..." : "Submitting ..."}</h3>
                    <div className="mark-loader"></div>
                </div>
            </div>
        )
    }

    const handleKeyDown = (event) => 
    {
        if (['e', 'E', '-', '+', '.'].includes(event.key)) 
        {
            event.preventDefault();
        }
    }

    const handleDownload = () => 
    {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const fileName = `Report_Section_${activeSection}`;
        let headers = [];
        let dataWithHeaders = [];

        if (activeSection === '1' || activeSection === '2' || activeSection === '5') 
        {
            headers = ['Register No', 'LOT', 'MOT', 'HOT', 'TOTAL'];
            dataWithHeaders = [headers, ...stuData.map(user => 
            [
                user.reg_no,
                user.lot,
                user.mot,
                user.hot,
                user.total
            ])];
        } 
        else
        {
            headers = ['Register No', 'LOT'];
            dataWithHeaders = [headers, ...stuData.map(user => 
            [
                user.reg_no,
                user.lot
            ])];
        }

        const ws = XLSX.utils.aoa_to_sheet(dataWithHeaders);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        saveAs(data, fileName + fileExtension);
    }

    return (
        <div className="mark-main">
            <LoadingModal isSaveLoading={isSaveLoading} isSaveConfirmLoading={isSaveConfirmLoading} />
            <div className="mark-body">
                <div className="mark-header">
                    <div className="mark-header-title1">
                        <h1 className="mark-title">JAMAL MOHAMED COLLEGE (Autonomous)</h1>
                        <span>
                            Nationally Accredited with A++ Grade by NAAC (4th Cycle) with CGPA
                            3.69 out of 4.0
                        </span>
                        <span>Affiliated to Bharathidasan University</span>
                        <h3>TIRUCHIRAPPALLI - 620 020 .</h3>
                    </div>
                </div>
                <div className="mark-header-title2">
                    <h3>OUTCOME BASED EDUCATION - {academicYear}</h3>
                    <h3>{deptName}</h3>
                </div>
                <div className="mark-title-content">
                    <div className="mark-course-details">
                        <span className="mark-course-header">Class</span>
                        :
                        <span className="mark-course-footer">{classDetails} - {section}</span>
                    </div>
                    <div className="mark-course-details">
                        <span className="mark-course-header">Semester</span>
                        :
                        <span className="mark-course-footer">{semester}</span>
                    </div>
                    <div className="mark-course-details">
                        <span className="mark-course-header">Course Code</span>
                        :
                        <span className="mark-course-footer">{courseCode}</span>
                    </div>
                    <div className="mark-course-details">
                        <span className="mark-course-header">Course Title</span>
                        :
                        <span className="mark-course-footer">{courseTitle}</span>
                    </div>
                </div>
                <div className="mark-dropdown-group">
                    <select
                        value={activeSection || ''}
                        onChange={handleSectionChange}
                        className="mark-dropdown"
                    >
                        <option value="1">CIA - 1</option>
                        <option value="2">CIA - 2</option>
                        <option value="3">ASS - 1</option>
                        <option value="4">ASS - 2</option>
                        <option value="5">ESE</option>
                    </select>
                </div>
                <div> 
                    {activeSection && active && (
                        <div>
                            <table className="mark-table">
                                <thead>
                                    <tr>
                                        <th className="mark-th-sno">S. No.</th>
                                        <th className="mark-th-reg">Reg. No.</th>
                                        <th className="mark-th-name">Name</th>
                                        <th className="mark-th-obe">LOT</th>
                                        {(activeSection === "1" || activeSection === "2" || activeSection === "5") && (
                                            <>
                                                <th className="mark-th-obe">MOT</th>
                                                <th className="mark-th-obe">HOT</th>
                                                <th className="mark-th-obe">Total</th>
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {stuData.map((user, index) => (
                                        <tr key={index}>
                                            <td className="mark-td-sno">{index + 1}</td>
                                            <td className="mark-td-reg">{user.reg_no}</td>
                                            <td className="mark-td-name">{user.stu_name}</td>
                                            <td className="mark-td-obe">
                                                <input
                                                    type="number"
                                                    className="mark-input"
                                                    value={user.lot}
                                                    name="lot"
                                                    min={0}
                                                    max={25}
                                                    onWheel={(e) => e.target.blur()}
                                                    onKeyDown={handleKeyDown}
                                                    disabled={handleDisable()}
                                                    onChange={(e) => handleInputChange(user.reg_no, 'lot', e.target.value)}
                                                />
                                            </td>
                                            {(activeSection === "1" || activeSection === "2" || activeSection === "5") && (
                                                <>
                                                    <td className="mark-td-obe">
                                                        <input
                                                            type="number"
                                                            className="mark-input"
                                                            name="mot"
                                                            min={0}
                                                            max={40}
                                                            onWheel={(e) => e.target.blur()}
                                                            onKeyDown={handleKeyDown}
                                                            value={user.mot}
                                                            disabled={handleDisable()}
                                                            onChange={(e) => handleInputChange(user.reg_no, 'mot', e.target.value)}
                                                        />
                                                    </td>
                                                    <td className="mark-td-obe">
                                                        <input
                                                            type="number"
                                                            className="mark-input"
                                                            name="hot"
                                                            min={0}
                                                            max={10}
                                                            onWheel={(e) => e.target.blur()}
                                                            onKeyDown={handleKeyDown}
                                                            value={user.hot}
                                                            disabled={handleDisable()}
                                                            onChange={(e) => handleInputChange(user.reg_no, 'hot', e.target.value)}
                                                        />
                                                    </td>
                                                    <td className="mark-td-obe">
                                                        <input
                                                            type="number"
                                                            className="mark-input"
                                                            name="total"
                                                            value={user.total}
                                                            readOnly
                                                            disabled
                                                        />
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="mark-button-head">
                                {!handleDisable() && (
                                    <>
                                        <button
                                            type="submit"
                                            className="mark-button-save"
                                            onClick={(e) => handleUpdateMark(e, "0")} 
                                            disabled={isSaveLoading}
                                            >
                                                {isSaveLoading ? "Saving..." : "SAVE"}
                                        </button>
                                        <button
                                            type="submit"
                                            className="mark-button-saveconfirm"
                                            onClick={(e) => handleUpdateMark(e, "1")}
                                            disabled={isSaveConfirmLoading}
                                            >
                                                {isSaveConfirmLoading ? "Confirming..." : "SAVE AND CONFIRM"}
                                        </button>
                                    </>
                                )}
                                {handleDisable() && (
                                    <button
                                        type="button"
                                        className="mark-download"
                                        onClick={handleDownload}
                                    >
                                        Download Excel
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Stumark;