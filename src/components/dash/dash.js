import React, { useEffect, useState } from 'react';
import './dash.css';
// import Piechart from './Piechart';
import Barchart from './Barchart';
import { PiStudentFill } from "react-icons/pi";
import { IoPersonSharp } from "react-icons/io5";
import { FaBook } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";

function Dash() {
    const [studentCount, setStudentCount] = useState(0);
    const [staffCount, setStaffCount] = useState(0);
    const [courseCount, setCourseCount] = useState(0);
    const [programCount, setProgramCount] = useState(0);

    // A reusable function to animate any count
    const animateCount = (setCount, targetCount, initialCount = 0, duration = 1000) => {
        let currentCount = initialCount;
        const increment = Math.ceil(targetCount / 100); // 100 steps
        const intervalTime = duration / 100; // Duration divided by 100 steps

        const timer = setInterval(() => {
            currentCount += increment;
            if (currentCount > targetCount) {
                currentCount = targetCount;
            }
            setCount(currentCount);

            if (currentCount === targetCount) {
                clearInterval(timer); // Stop the timer when the target is reached
            }
        }, intervalTime);

        return () => clearInterval(timer); // Cleanup function
    };

    useEffect(() => {
        // Animate all counts
        const cleanupStudent = animateCount(setStudentCount, 15790);
        const cleanupStaff = animateCount(setStaffCount, 348);
        const cleanupCourse = animateCount(setCourseCount, 58, 12); // Starts and ends at 58
        const cleanupProgram = animateCount(setProgramCount, 35, 1); // Starts at 1, ends at 35

        // Cleanup intervals on component unmount
        return () => {
            cleanupStudent();
            cleanupStaff();
            cleanupCourse();
            cleanupProgram();
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
            <div className='dashboard-barchart'>
                <span className='barchart-heading'><h2>Programme Outcome</h2></span>
                <span className='barchart-subheading'><h4>UG - PG Arts and Science for attainment lever on a 3-point scale</h4></span>
                <Barchart />
            </div>
        </div>
    );
}

export default Dash;
