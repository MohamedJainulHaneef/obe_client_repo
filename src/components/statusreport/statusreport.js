import React, { useEffect } from "react";

function StatusReport() 
{
    const [academicYear, setAcademicYear] = useState('');
    const [reportDeptName, setReportDeptName] = useState('');
    useEffect(() => 
    {
        const academicYearSet = async () => 
        {
            try {
                const response = await axios.post(`${apiUrl}/activesem`, {});
                setAcademicYear(response.data.academic_year);
                console.log(response.data.academic_year);
            } 
            catch (err) {
                console.log('Error fetching data:', err);

            }
        };
        academicYearSet();

        const fetchStatusReport = async () => 
        {
            if (academicYear) 
            {
                try {
                    const response = await axios.post(`${apiUrl}/coursemap`, {
                        staff_id: staffId,
                        academic_year: academicYear
                    });
                    setCourseData(response.data);
                } 
                catch (err) {
                    console.log('Error fetching data:', err);
                }
            }
        };
        fetchStatusReport();
        
    }, [staffId, academicYear]);

    return (
        <div>
           
        </div>
    )
}

export default StatusReport;