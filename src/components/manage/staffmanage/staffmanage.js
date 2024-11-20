import React from "react";
import './staffmanage.css';
import { useParams, useNavigate } from 'react-router-dom';

function StaffManage() 
{
    const { staffId } = useParams();
    const navigate = useNavigate();

    const handleStaffMaster = () => {
        navigate(`/staff/${staffId}/staffmastermanage`);
    }

    const handleHodManage = () => {
        navigate(`/staff/${staffId}/hodmanage`);
    }

    const handleTutorManage = () => {
        navigate(`/staff/${staffId}/tutormanage`);
    }
    
    return (
        <div className='staff-main'>
            <div className="staff-content-box">
                <div className='staff-entire-box'>
                    <button className="staff-box" onClick={handleStaffMaster}>
                        Staff Master Manage
                    </button>
                    <button className="staff-box" onClick={handleHodManage}>
                        HOD Manage
                    </button>
                    <button className="staff-box" onClick={handleTutorManage}>
                        Tutor Manage
                    </button>
                </div>
            </div>
        </div>
    )
}

export default StaffManage;