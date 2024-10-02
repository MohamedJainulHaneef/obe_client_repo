import React, { useEffect, useState } from 'react';
import './dash.css';
import Barchart from '../dash/Barchart/barchart';
import Piechart from '../dash/Piechart/piechart';
// import Graphchart from './chart/graph';
// import Linechart from './chart/linechart'
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
        <div className='dash-main'>
            <div className='dash-header'>
                <div className='dash-header-content'>
                    <PiStudentFill className='dash-student-icon' />
                    <span className='dash-count-content'>Total Students</span>
                    <span className='dash-count-number'>{studentCount}</span>
                </div>
                <div className='dash-header-content'>
                    <IoPersonSharp className='dash-staff-icon' />
                    <span className='dash-count-content'>Total Staff</span>
                    <span className='dash-count-number'>{staffCount}</span>
                </div>
                <div className='dash-header-content'>
                    <FaBook className='dash-course-icon' />
                    <span className='dash-count-content'>Total Courses</span>
                    <span className='dash-count-number'>{courseCount}</span>
                </div>
                <div className='dash-header-content'>
                    <SiBookstack className='dash-programme-icon' />
                    <span className='dash-count-content'>Total Programme</span>
                    <span className='dash-count-number'>{programCount}</span>
                </div>
            </div>
            <div className='dash-linechart'>
                <Barchart />
            </div>
            <div className='dash-piechart-main'>
                <Piechart />
            </div>


        </div>
    )
}

export default Dash;