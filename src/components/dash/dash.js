import React, { useEffect, useState } from 'react';
import './dash.css';
import Piechart from './Piechart';
import { PiStudentFill } from "react-icons/pi";
import { IoPersonSharp } from "react-icons/io5";
import { FaBook } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";

function Dash() {
    // Separate state variables for each count
    const [studentCount, setStudentCount] = useState(0);
    const [staffCount, setStaffCount] = useState(0);
    const [courseCount, setCourseCount] = useState(0);
    const [programCount, setProgramCount] = useState(0);

    useEffect(() => {
        // Animate the student count
        let studentCurrentCount = 0;
        const studentTarget = 15786; // Student target count
        const interval = 10; // The delay in ms for each increment
        const studentIncrement = Math.ceil(studentTarget / 100); // Increment step for students

        const studentTimer = setInterval(() => {
            studentCurrentCount += studentIncrement;
            if (studentCurrentCount > studentTarget) {
                studentCurrentCount = studentTarget;
            }
            setStudentCount(studentCurrentCount);

            if (studentCurrentCount === studentTarget) {
                clearInterval(studentTimer); // Stop when reaching the target number
            }
        }, interval);

        // Animate the staff count
        let staffCurrentCount = 0;
        const staffTarget = 348; // Staff target count
        const staffIncrement = Math.ceil(staffTarget / 100); // Increment step for staff

        const staffTimer = setInterval(() => {
            staffCurrentCount += staffIncrement;
            if (staffCurrentCount > staffTarget) {
                staffCurrentCount = staffTarget;
            }
            setStaffCount(staffCurrentCount);

            if (staffCurrentCount === staffTarget) {
                clearInterval(staffTimer);
            }
        }, interval);

        // Animate the course count
        let courseCurrentCount = 58;
        const courseTarget = 58; // Course target count
        const courseIncrement = Math.ceil(courseTarget / 100); // Increment step for courses

        const courseTimer = setInterval(() => {
            courseCurrentCount += courseIncrement;
            if (courseCurrentCount > courseTarget) {
                courseCurrentCount = courseTarget;
            }
            setCourseCount(courseCurrentCount);

            if (courseCurrentCount === courseTarget) {
                clearInterval(courseTimer);
            }
        }, interval);

        // Animate the program count
        let programCurrentCount = 12;
        const programTarget = 35; // Program target count
        const programIncrement = Math.ceil(programTarget / 100); // Increment step for programs

        const programTimer = setInterval(() => {
            programCurrentCount += programIncrement;
            if (programCurrentCount > programTarget) {
                programCurrentCount = programTarget;
            }
            setProgramCount(programCurrentCount);

            if (programCurrentCount === programTarget) {
                clearInterval(programTimer);
            }
        }, interval);

        // Clean up intervals on unmount
        return () => {
            clearInterval(studentTimer);
            clearInterval(staffTimer);
            clearInterval(courseTimer);
            clearInterval(programTimer);
        };
    }, []);

    return (
        <div className='obe-dashboard-main'>
            <div className='obe-dashboard-header'>
                <div className='dashboard-header-student'>
                    <PiStudentFill className='student-icon' />
                    <h2>Total Students</h2>
                    <h1>{studentCount}</h1>
                </div>
                <div className='dashboard-header-staff'>
                    <IoPersonSharp className='staff-icon' />
                    <h2>Total Staff</h2>
                    <h1>{staffCount}</h1>
                </div>
                <div className='dashboard-header-course'>
                    <FaBook className='course-icon' />
                    <h2>Total Courses</h2>
                    <h1>{courseCount}</h1>
                </div>
                <div className='dashboard-header-program'>
                    <SiBookstack className='programme-icon' />
                    <h2>Total Programme</h2>
                    <h1>{programCount}</h1>
                </div>
            </div>
            <div className='dashboard-piechart'>
            <span className='piechart-heading'>
            <h2>Programme Outcome</h2></span>
            
            <Piechart />

            </div>
        </div>
    );
}

export default Dash;
