import React, { useState } from "react";
import './markmanage.css';
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

function MarkManage() {
    const [academicYear, setAcademicYear] = useState('');

    const academicYearSet = async () => {
        try {
            const response = await axios.post(`${apiUrl}/activesem`, {});
            setAcademicYear(response.data.academic_year);
        }
        catch (err) {
            console.log('Error fetching data:', err);
        }
    };
    academicYearSet();
    // Initialize state for each input field
    const [values, setValues] = useState({
        cia1: { lot: '', mot: '', hot: '' },
        cia2: { lot: '', mot: '', hot: '' },
        ass1: { lot: '', mot: '', hot: '' },
        ass2: { lot: '', mot: '', hot: '' },
        level0: { ug: '', pg: '' },
        level1: { ug: '', pg: '' },
        level2: { ug: '', pg: '' },
        level3: { ug: '', pg: '' },
        maxEse: { lot: '', mot: '', hot: '' }
    });

    // Calculate MAX CIA values by summing each field across sections
    const maxCia = {
        lot: (parseInt(values.cia1.lot || 0, 10) + parseInt(values.cia2.lot || 0, 10) +
            parseInt(values.ass1.lot || 0, 10) + parseInt(values.ass2.lot || 0, 10)) || '',
        mot: (parseInt(values.cia1.mot || 0, 10) + parseInt(values.cia2.mot || 0, 10) +
            parseInt(values.ass1.mot || 0, 10) + parseInt(values.ass2.mot || 0, 10)) || '',
        hot: (parseInt(values.cia1.hot || 0, 10) + parseInt(values.cia2.hot || 0, 10) +
            parseInt(values.ass1.hot || 0, 10) + parseInt(values.ass2.hot || 0, 10)) || '',
    };



    const handleChange = (event, section, type) => {
        const value = event.target.value.slice(0, 2); // Limit input to 2 characters
        if (/^\d*$/.test(value)) {
            setValues(prevValues => ({
                ...prevValues,
                [section]: {
                    ...prevValues[section],
                    [type]: value,
                },
            }));
        }
    };

    const handlesavecia = async () => {
        // Check if required fields are filled for CIA and MAX ESE sections
        const sections = ['cia1', 'cia2', 'ass1', 'ass2', 'maxEse'];
        const requiredFieldsFilled = sections.every(section =>
            Object.values(values[section]).every(value => value !== '')
        );

        if (!requiredFieldsFilled) {
            alert('Please fill in all required fields.');
            return;
        }

        // Create data object with only CIA and MAX ESE values

        const dataToSend = {
            cia1: values.cia1,
            cia2: values.cia2,
            ass1: values.ass1,
            ass2: values.ass2,
            maxEse: values.maxEse,
            maxCia,
            academicYear
        };
        console.log("data", dataToSend);
        try {
            const response = await axios.post(`${apiUrl}/api/calculation`, dataToSend);
            if (response.data) {
                alert('Data saved successfully!');

            }
        } catch (error) {
            console.error("Error saving data:", error);
            alert('Failed to save data. Please try again.');
        }
    };


    const handleSave = async () => {
        // Check if required fields are filled
        const sections = ['level0', 'level1', 'level2', 'level3'];
        const requiredFieldsFilled = sections.every(section =>
            Object.values(values[section]).every(value => value !== '')
        );

        if (!requiredFieldsFilled) {
            alert('Please fill in all required fields.');
            return;
        }

        try {
            const dataToSend = {
                level0: values.level0,
                level1: values.level1,
                level2: values.level2,
                level3: values.level3,
                academicYear
            };
            console.log(academicYear);
            await axios.post(`${apiUrl}/api/calculationlevel`, dataToSend);
            alert('Data saved successfully!');
        } catch (error) {
            console.error("Error saving data:", error);
            alert('Failed to save data. Please try again.');
        }
    };


    return (
        <div className="mark-mng-main">
            <span>THRESHOLD VALUES FOR OUTCOMES</span>
            <div>
                <table className="mark-mng-table">
                    <thead>
                        <tr>
                            <th className='mark-mng-th'></th>
                            <th className='mark-mng-th'>LOT</th>
                            <th className='mark-mng-th'>MOT</th>
                            <th className='mark-mng-th'>HOT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Individual input boxes for CIA 1 */}
                        <tr>
                            <td className='mark-mng-td'>CIA 1</td>
                            <td className='mark-mng-td'>
                                <input
                                    className='mark-mng-input'
                                    type="number"
                                    value={values.cia1.lot}
                                    onChange={e => handleChange(e, 'cia1', 'lot')}
                                />
                            </td>
                            <td className='mark-mng-td'>
                                <input
                                    className='mark-mng-input'
                                    type="number"
                                    value={values.cia1.mot}
                                    onChange={e => handleChange(e, 'cia1', 'mot')}
                                />
                            </td>
                            <td className='mark-mng-td'>
                                <input
                                    className='mark-mng-input'
                                    type="number"
                                    value={values.cia1.hot}
                                    onChange={e => handleChange(e, 'cia1', 'hot')}
                                />
                            </td>
                        </tr>
                        {/* Individual input boxes for CIA 2 */}
                        <tr>
                            <td className='mark-mng-td'>CIA 2</td>
                            <td className='mark-mng-td'>
                                <input
                                    className='mark-mng-input'
                                    type="number"
                                    value={values.cia2.lot}
                                    onChange={e => handleChange(e, 'cia2', 'lot')}
                                />
                            </td>
                            <td className='mark-mng-td'>
                                <input
                                    className='mark-mng-input'
                                    type="number"
                                    value={values.cia2.mot}
                                    onChange={e => handleChange(e, 'cia2', 'mot')}
                                />
                            </td>
                            <td className='mark-mng-td'>
                                <input
                                    className='mark-mng-input'
                                    type="number"
                                    value={values.cia2.hot}
                                    onChange={e => handleChange(e, 'cia2', 'hot')}
                                />
                            </td>
                        </tr>
                        {/* Individual input boxes for ASS 1 */}
                        <tr>
                            <td className='mark-mng-td'>ASS 1</td>
                            <td className='mark-mng-td'>
                                <input
                                    className='mark-mng-input'
                                    type="number"
                                    value={values.ass1.lot}
                                    onChange={e => handleChange(e, 'ass1', 'lot')}
                                />
                            </td>
                            <td className='mark-mng-td'>
                                <input
                                    className='mark-mng-input'
                                    type="number"
                                    value={values.ass1.mot}
                                    onChange={e => handleChange(e, 'ass1', 'mot')}
                                />
                            </td>
                            <td className='mark-mng-td'>
                                <input
                                    className='mark-mng-input'
                                    type="number"
                                    value={values.ass1.hot}
                                    onChange={e => handleChange(e, 'ass1', 'hot')}
                                />
                            </td>
                        </tr>
                        {/* Individual input boxes for ASS 2 */}
                        <tr>
                            <td className='mark-mng-td'>ASS 2</td>
                            <td className='mark-mng-td'>
                                <input
                                    className='mark-mng-input'
                                    type="number"
                                    value={values.ass2.lot}
                                    onChange={e => handleChange(e, 'ass2', 'lot')}
                                />
                            </td>
                            <td className='mark-mng-td'>
                                <input
                                    className='mark-mng-input'
                                    type="number"
                                    value={values.ass2.mot}
                                    onChange={e => handleChange(e, 'ass2', 'mot')}
                                />
                            </td>
                            <td className='mark-mng-td'>
                                <input
                                    className='mark-mng-input'
                                    type="number"
                                    value={values.ass2.hot}
                                    onChange={e => handleChange(e, 'ass2', 'hot')}
                                />
                            </td>
                        </tr>
                        {/* Display MAX CIA */}
                        <tr>
                            <td className='mark-mng-td'>MAX CIA</td>
                            <td className='mark-mng-td'>
                                <input className='mark-mng-input' type="number" value={maxCia.lot} readOnly />
                            </td>
                            <td className='mark-mng-td'>
                                <input className='mark-mng-input' type="number" value={maxCia.mot} readOnly />
                            </td>
                            <td className='mark-mng-td'>
                                <input className='mark-mng-input' type="number" value={maxCia.hot} readOnly />
                            </td>
                        </tr>
                        {/* Display MAX ESE */}
                        <tr>
                            <td className='mark-mng-td'>MAX ESE</td>
                            <td className='mark-mng-td'>
                                <input
                                    className='mark-mng-input'
                                    type="number"
                                    value={values.maxEse.lot}
                                    onChange={e => handleChange(e, 'maxEse', 'lot')}
                                />
                            </td>
                            <td className='mark-mng-td'>
                                <input
                                    className='mark-mng-input'
                                    type="number"
                                    value={values.maxEse.mot}
                                    onChange={e => handleChange(e, 'maxEse', 'mot')}
                                />
                            </td>
                            <td className='mark-mng-td'>
                                <input
                                    className='mark-mng-input'
                                    type="number"
                                    value={values.maxEse.hot}
                                    onChange={e => handleChange(e, 'maxEse', 'hot')}
                                />
                            </td>
                        </tr>
                        
                        {/* Individual input boxes for CIA weightage */}
                        
                    </tbody>
                </table>
                <button className="mark-mng-button" onClick={handlesavecia}>Save</button>
                <div>
                
                        <td className='mark-mng-td'>WEIGHTAGE</td>
                        <td className='mark-mng-td'>
                                <input
                                    className='mark-mng-input'
                                    type="number"
                                    value={values.cia1.weightage}
                                    onChange={e => handleChange(e, 'cia1', 'weightage')}
                                />
                        </td>
                        <td className='mark-mng-td'>
                                <input
                                    className='mark-mng-input'
                                    type="number"
                                    value={values.maxEse.weightage}
                                    onChange={e => handleChange(e, 'maxEse', 'weightage')}
                                />
                        </td>
                        </div>

                {/* Individual input boxes for levels */}
                <table className="mark-mng-table">
                    <thead>
                        <tr>
                            <th className="mark-mng-th"></th>
                            <th className="mark-mng-th">UG</th>
                            <th className="mark-mng-th">PG</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Level 0 inputs */}
                        <tr>
                            <td className="mark-mng-td">Level 0</td>
                            <td className="mark-mng-td">
                                <input
                                    className="mark-mng-input"
                                    type="number"
                                    value={values.level0.ug}
                                    onChange={e => handleChange(e, 'level0', 'ug')}
                                />
                            </td>
                            <td className="mark-mng-td">
                                <input
                                    className="mark-mng-input"
                                    type="number"
                                    value={values.level0.pg}
                                    onChange={e => handleChange(e, 'level0', 'pg')}
                                />
                            </td>
                        </tr>
                        {/* Level 1 inputs */}
                        <tr>
                            <td className="mark-mng-td">Level 1</td>
                            <td className="mark-mng-td">
                                <input
                                    className="mark-mng-input"
                                    type="number"
                                    value={values.level1.ug}
                                    onChange={e => handleChange(e, 'level1', 'ug')}
                                />
                            </td>
                            <td className="mark-mng-td">
                                <input
                                    className="mark-mng-input"
                                    type="number"
                                    value={values.level1.pg}
                                    onChange={e => handleChange(e, 'level1', 'pg')}
                                />
                            </td>
                        </tr>
                        {/* Level 2 inputs */}
                        <tr>
                            <td className="mark-mng-td">Level 2</td>
                            <td className="mark-mng-td">
                                <input
                                    className="mark-mng-input"
                                    type="number"
                                    value={values.level2.ug}
                                    onChange={e => handleChange(e, 'level2', 'ug')}
                                />
                            </td>
                            <td className="mark-mng-td">
                                <input
                                    className="mark-mng-input"
                                    type="number"
                                    value={values.level2.pg}
                                    onChange={e => handleChange(e, 'level2', 'pg')}
                                />
                            </td>
                        </tr>
                        {/* Level 3 inputs */}
                        <tr>
                            <td className="mark-mng-td">Level 3</td>
                            <td className="mark-mng-td">
                                <input
                                    className="mark-mng-input"
                                    type="number"
                                    value={values.level3.ug}
                                    onChange={e => handleChange(e, 'level3', 'ug')}
                                />
                            </td>
                            <td className="mark-mng-td">
                                <input
                                    className="mark-mng-input"
                                    type="number"
                                    value={values.level3.pg}
                                    onChange={e => handleChange(e, 'level3', 'pg')}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <button className="mark-mng-button" onClick={handleSave}>Save</button>
            </div>
        </div>
    );
}

export default MarkManage;
