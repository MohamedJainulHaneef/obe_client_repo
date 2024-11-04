import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
// import './courseoutcome.css';
const apiUrl = process.env.REACT_APP_API_URL;

function TutorCouOutcome() 
{
const { staffId } = useParams();



useEffect(() => {
    const checkStaffId = async () => {
        
            try {
                const response = await axios.post(`${apiUrl}/api/checkTutorCOC`, {
                    staff_id: staffId
                })
                
                console.log(response.data)
               
            }
            catch (err) {
                console.log('Error fetching data:', err);
            }

    }
    checkStaffId();
}, [staffId]);


    return (
        <div>
            HElo

        </div>
    )
}

export default TutorCouOutcome;