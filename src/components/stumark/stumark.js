import React, { useState, useEffect } from "react";
import axios from "axios";
import "./stumark.css";
import { useLocation } from 'react-router-dom';


// const Notification=({message})=>{
//     if(!message) return null;
//     return(
//         <div className="notify" >
//             {message}
//         </div>
//     );

// }
function Stumark() {
    const location = useLocation();
    const [active, setActive] = useState();
    const [stuData, setStuData] = useState([]);
    const [activeSection, setActiveSection] = useState('1');
    const { deptName, section, semester, classDetails, courseCode, courseTitle, courseId, category } = location.state || {};
    // const [ notification,setNotification]=useState({message :''})
  
    // const ShowNotification =(message)=> {
    //     setNotification({message});
    //     setTimeout(()=>{
    //         setNotification({message:''});
        
    //     },5000);
    // }

    useEffect(() => {
        const stuDetails = async () => {
            try {
                // Fetch student details
                const StuResponse = await axios.post('http://localhost:5000/studentdetails', {
                    course_id: courseId,
                    stu_section: section,
                    stu_semester: semester,
                    stu_category: category,
                    stu_course_code: courseCode,
                    activeSection
                });
                console.log(StuResponse.data);
                setStuData(StuResponse.data);

                // Fetch report data to determine active status
                const disable = await axios.get('http://localhost:5000/getreport', {
                    params: {
                        activeSection,
                        courseCode,
                        deptName,
                        semester,
                        section,
                        category
                    }
                });

                // Defensive check if disable.data is not null or undefined
                if (disable.data) {
                    setActive(disable.data);
                    console.log('Disable data:', disable.data);
                    console.log('CIA1:', disable.data.cia_1);  // This line caused the error when disable.data was null
                } else {
                    console.warn('Received null or undefined data from /getreport');
                    setActive({});  // Set to an empty object if no data is returned
                }
            } catch (err) {
                console.log('Error fetching data:', err);
            }
        };
        stuDetails();
    }, [courseId, section, semester, category, courseCode, deptName, activeSection]);


    const handleSectionChange = (event) => {
        setActiveSection(event.target.value);
        setStuData(stuData.map(user => ({
            ...user,
            lot: '',
            mot: '',
            hot: '',
            total: ''
        })))
    }

    const handleInputChange = (registerNo, type, value) => {
        let validatedValue = value;

        if (type === 'lot') {
            validatedValue = value > 25 ? 25 : value;
        }
        else if (type === 'mot') {
            validatedValue = value > 40 ? 40 : value;
        }
        else if (type === 'hot') {
            validatedValue = value > 10 ? 10 : value;
        }

        const updatedStuData = stuData.map(user => {
            if (user.reg_no === registerNo) {
                const newLot = type === 'lot' ? validatedValue : user.lot;
                const newMot = type === 'mot' ? validatedValue : user.mot;
                const newHot = type === 'hot' ? validatedValue : user.hot;
                const newTotal = parseFloat(newLot || 0) + parseFloat(newMot || 0) + parseFloat(newHot || 0);
                return { ...user, [type]: validatedValue, total: newTotal };
            }
            return user;
        });

        setStuData(updatedStuData);
    };


    const handleDisable = () => {
        if (activeSection === '1') {
            return active?.cia_1 === 2;
        } else if (activeSection === '2') {
            return active?.cia_2 === 2;
        } else if (activeSection === '3') {
            return active?.ass_1 === 2;
        } else if (activeSection === '4') {
            return active?.ass_2 === 2;
        } else if (activeSection === '5') {
            return active?.ese === 2;
        }
        return false;
    };
    

    const handleUpdateMark = async (e, isConfirm) => {
        const button_value = isConfirm;
        
        e.preventDefault();
        const updates = {};
        stuData.forEach(user => {
            updates[user.reg_no] = {
                lot: user.lot,
                mot: user.mot,
                hot: user.hot,
                total: user.total
            };
        });

        console.log('Sending Data:', { updates, activeSection, courseCode, button_value });

        try {
            const response = await axios.put('http://localhost:5000/updateMark', {
                updates, activeSection, courseCode
            });

            if (response.data.success) {

                if (button_value === "0") {
                    window.alert("mark submited");
                    // ShowNotification("mark submitted")
                    
                    try {
                        const response = await axios.put('http://localhost:5000/report', {
                            activeSection, courseCode, deptName, semester, section, category, button_value
                        });

                        console.log(response);

                    }
                    catch (err) {
                        window.alert("err")
                    }

                }
                else if (button_value === "1"){
                    const confirmAction = window.confirm("Are you sure you want to proceed?");
                    if (confirmAction) {
                        try {

                            const reportResponse = await axios.put('http://localhost:5000/report', {
                                activeSection, courseCode, deptName, semester, section, category, button_value
                            });
                            console.log("hello")
                            console.log(reportResponse);
                            // setIsConfirmed(true);  // Set the input fields to be disabled

                            // Add the section to the confirmed sections
                            // setConfirmedSections(prev => ({ ...prev, [activeSection]: true }));

                            // Fetch updated report status to disable inputs immediately
                            const disableResponse = await axios.get('http://localhost:5000/getreport', {
                                params: {
                                    activeSection, courseCode, deptName, semester, section, category
                                }
                            });

                            if (disableResponse?.data) {
                                // setActive(disableResponse.data);
                                console.log('Disable data:', disableResponse.data);
                            } else {
                                console.warn('Received null or undefined data from /getreport');
                                setActive({});
                            }


                        } catch (err) {
                            window.alert("Error submitting report");
                        }
                        window.location.reload();

                    }
                }
                else {
                    console.log("Not ")
                }
            }
            else {
                alert('Something went Wrong');
            }
        }
        catch (err) {
            console.error('Error ', err);
            window.alert("Something Went Wrong with the Server");
        }


    };


    // Prevent 'e', '-', '.' from being typed in the input fields
    const handleKeyDown = (event) => {
        if (['e', 'E', '-', '+', '.'].includes(event.key)) {
            event.preventDefault();
        }
    };

    // const handleDisable = (inputType) => {
    //     if (activeSection === '1') {
    //         return active.cia_1 === 2; // Disable if CIA1 equals 2
    //     }
    //     else if (activeSection === '2') {
    //         return active.cia_2 === 2;
    //     }
    //     else if (activeSection === '3') {
    //         return active.ass_1 === 2;
    //     }
    //     else if (activeSection === '4') {
    //         return active.ass_2 === 2;
    //     }
    //     else if (activeSection === '5') {
    //         return active.ese === 2;
    //     }
    //     return false;
    // };


    return (
        <div className="mark-main">
            <div className="mark-body">
                {/* <Notification message={notification.message} />  */}
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
                    <h3>OUTCOME BASED EDUCATION - NOVEMBER 2024</h3>
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
                            <table>
                                <thead>
                                    <tr>
                                        <th className="mark-sno">S. No.</th>
                                        <th className="mark-reg">Reg. No.</th>
                                        <th className="mark-name">Name</th>
                                        <th className="mark-obe">LOT</th>
                                        {(activeSection === "1" || activeSection === "2" || activeSection === "5") && (
                                            <>
                                                <th className="mark-obe">MOT</th>
                                                <th className="mark-obe">HOT</th>
                                                <th className="mark-obe">Total</th>
                                            </>
                                        )}
                                    </tr>
                                </thead>

                                <tbody>
                                    {stuData.map((user, index) => (
                                        <tr key={index}>
                                            <td className="mark-sno">{index + 1}</td>
                                            <td className="mark-reg">{user.reg_no}</td>
                                            <td>{user.stu_name}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={user.lot}
                                                    name="lot"
                                                    min={0}
                                                    max={25}
                                                    onKeyDown={handleKeyDown}
                                                    disabled={handleDisable()}
                                                    // disabled={active.cia_1 === 1 || active.cia_2 || active.ass_1 === 2 || active.ass_2 === 2 || active.ese === 2}
                                                    onChange={(e) => handleInputChange(user.reg_no, 'lot', e.target.value)}
                                                />
                                            </td>
                                            {(activeSection === "1" || activeSection === "2" || activeSection === "5") && (
                                                <>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            name="mot"
                                                            min={0}
                                                            max={40}
                                                            onKeyDown={handleKeyDown}
                                                            value={user.mot}
                                                            disabled={handleDisable()}
                                                            // disabled={active.cia_1 === 1 || active.cia_2 || active.ass_1 === 2 || active.ass_2 === 2 || active.ese === 2}
                                                            onChange={(e) => handleInputChange(user.reg_no, 'mot', e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            name="hot"
                                                            min={0}
                                                            max={10}
                                                            onKeyDown={handleKeyDown}
                                                            value={user.hot}
                                                            disabled={handleDisable()}
                                                            // disabled={active.cia_1 === 1 || active.cia_2 || active.ass_1 === 2 || active.ass_2 === 2 || active.ese === 2}
                                                            onChange={(e) => handleInputChange(user.reg_no, 'hot', e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            name="total"
                                                            value={user.total}
                                                            readOnly
                                                            tabIndex={-1}
                                                        />
                                                    </td>

                                                </>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="mark-button-head">
                                <button type="submit" className="mark-button-save"
                                    disabled={handleDisable()}
                                    // disabled={active.cia_1 === 2 || active.cia_2===2 || active.ass_1 === 2 || active.ass_2 === 2 || active.ese === 2}
                                    onClick={(e) => handleUpdateMark(e, "0")}>
                                    SAVE
                                </button>
                                <button type="submit" className="mark-button-saveconfirm"
                                    disabled={handleDisable()}
                                    // disabled={active.cia_1 === 2 || active.cia_2 || active.ass_1 === 2 || active.ass_2 === 2 || active.ese === 2}
                                    onClick={(e) => handleUpdateMark(e, "1")}>
                                    SAVE & CONFIRM
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Stumark;
