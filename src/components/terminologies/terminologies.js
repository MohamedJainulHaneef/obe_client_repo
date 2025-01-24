import React from 'react';
import './terminologies.css';

function Terminologies() 
{
    return (
        <div className='termi-main'>
            <p className='termi-top-heading'>OBE TERMS</p>
            <div className='termi-a4'>
                <p className='termi-term'>01. Attainment Level Criteria</p>
                <ul className='termi-list'>
                    <li><span>Level 0 :</span> Score &lt; 40% for UG and &lt; 50% for PG.</li>
                    <li><span>Level 1 :</span> 40% &le; Score &lt; 60%.</li>
                    <li><span>Level 2 :</span> 60% &le; Score &lt; 75%.</li>
                    <li><span>Level 3 :</span> Score &ge; 75%.</li>
                </ul>
                <p className='termi-term2'>02. Attainment Grade Criteria</p>
                <ul className='termi-list'>
                    <li><span>Low :</span> Mean overall score correlation &lt; 1.5</li>
                    <li><span>Medium :</span> 1.5 &le; Mean overall score correlation &lt; 2.5</li>
                    <li><span>High :</span> Mean overall score correlation &ge; 2.5</li>
                </ul>
                <p className='termi-term2'>03. Student Cognitive Level Attainment (SCLA)</p>
                <p className='termi-para'>
                    The attainment level for each student in a course is calculated by analyzing their performance across three cognitive levels:
                    Lower-Order Thinking (LOT), Medium-Order Thinking (MOT), and Higher-Order Thinking (HOT). Each cognitive level is assessed
                    for Continuous Internal Assessment (CIA) and End-Semester Examination (ESE).
                </p>
                <p className='termi-term2'>04. Course Outcome  (CO)</p>
                <p className='termi-para'>
                    Course outcomes define what students should know, understand, or be able to do after completing the course.
                    They are generally measurable and focused on skills, knowledge, or competencies.
                    For example, in a Computer Science course, a CO might be “Students will be able to write efficient algorithms to solve complex problems.
                    Goals for student learning within a course, defined in terms of measurable skills or competencies.
                </p>
                <p className='termi-term2'>06. AttainmentS of Course Outcome</p>
                <ul className='termi-list'>
                    <li><span>Course Cognitive Level Attainment (CCLA) : </span>
                        The CCLA measures how well students achieve cognitive-level outcomes (LOT, MOT, HOT) in the specified course.
                        To calculate CCLA the input is the various assessment scores scored by the students in the specified course.
                    </li><br />
                    <li ><span>Course Attainment by Programme Specific Outcome (CAPSO) : </span>
                        The CAPSO is a systematic process for evaluating the impact of a course on achieving the program-specific outcome (PSO). 
                        To calculate CAPSO the values of the Relationship Matrix and the values of the three cognitive levels calculated in CCLA 
                        for a specified course are given as input.
                    </li>
                </ul>
                <p className='termi-term2'>06. Programme Specific Outcome (PSO)</p>
                <p className='termi-para'>
                    Programme Specific Outcomes define the objectives and expected achievements of students after completing a specific academic program (e.g., MSc Physics or MCA). These outcomes
                    are broader than course outcomes and articulate the unique skills, knowledge, and competencies that a graduate of the program should possess.
                    For example, In an MCA (Master of Computer Applications) program, a PSO might be :<br /><br /><i>
                    "Graduates will be equipped to design, develop, and deploy software systems, leveraging contemporary programming languages and frameworks."</i><br /><br />
                    <span className='termi-span'>Note : </span>Both CO and PSO are well defined in our syllabus
                </p>
            </div>
        </div>
    )
}

export default Terminologies;
