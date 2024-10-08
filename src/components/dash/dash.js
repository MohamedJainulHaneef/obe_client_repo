import React, { useEffect, useState } from 'react';
import './dash.css';
import Barchart from '../dash/Barchart/barchart';
import Piechart1 from '../dash/Piechart/Piechart1';
import Piechart2 from '../dash/Piechart/Piechart2';
import Piechart3 from '../dash/Piechart/Piechart3';
import { PiStudentFill } from "react-icons/pi";
import { IoPersonSharp } from "react-icons/io5";
import { FaBook } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";
import axios from 'axios';

function Dash() {
    const [studentCount, setStudentCount] = useState(0);
    const [staffCount, setStaffCount] = useState(0);
    const [courseCount, setCourseCount] = useState(0); // Unique course count
    const [programCount, setProgramCount] = useState(0); // Unique program count

    // Fetch counts from the backend
    const fetchCounts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/counts`);
            const { studentCount, staffCount, courseCount, programCount } = response.data;

            // Animate the counts after fetching
            animateCount(setStudentCount, studentCount);
            animateCount(setStaffCount, staffCount);
            animateCount(setCourseCount, courseCount); // Total unique courses
            animateCount(setProgramCount, programCount); // Total unique programs
        } catch (error) {
            console.error('Error fetching counts:', error);
        }
    };

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
        fetchCounts(); // Fetch counts on component mount
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
                    <span className='dash-count-number'>{courseCount}</span> {/* Unique course count */}
                </div>
                <div className='dash-header-content'>
                    <SiBookstack className='dash-programme-icon' />
                    <span className='dash-count-content'>Total Programs</span>
                    <span className='dash-count-number'>{programCount}</span> {/* Unique program count */}
                </div>
            </div>
            <div className='dash-linechart'>
                <Barchart />
            </div>
            <div className='dash-piechart-main'>
                <Piechart1 />
                <Piechart2 />
                <Piechart3 />
            </div>
        </div>
    );
}

export default Dash;
