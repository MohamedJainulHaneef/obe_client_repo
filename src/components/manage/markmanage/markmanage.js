import React, { useState } from "react";
import './markmanage.css';
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

function MarkManage() 
{
    const [academicYear, setAcademicYear] = useState('');
    const [inputValue, setInputValue] = useState('');

    const academicYearSet = async () => 
    {
        try {
            const response = await axios.post(`${apiUrl}/activesem`, {});
            setAcademicYear(response.data.academic_year);
        }
        catch (err) {
            console.log('Error fetching data:', err);
        }
    }
    academicYearSet();

    const [values, setValues] = useState(
    {
        cia1: { lot: '', mot: '', hot: '' },
        cia2: { lot: '', mot: '', hot: '' },
        ass1: { lot: '', mot: '', hot: '' },
        ass2: { lot: '', mot: '', hot: '' },
        level0: { ug: '', pg: '' },
        level1: { ug: '', pg: '' },
        level2: { ug: '', pg: '' },
        level3: { ug: '', pg: '' },
        maxEse: { lot: '', mot: '', hot: '' }
    })

    const maxCia = 
    {
        lot: (parseInt(values.cia1.lot || 0, 10) + parseInt(values.cia2.lot || 0, 10) +
            parseInt(values.ass1.lot || 0, 10) + parseInt(values.ass2.lot || 0, 10)) || '',
        mot: (parseInt(values.cia1.mot || 0, 10) + parseInt(values.cia2.mot || 0, 10) +
            parseInt(values.ass1.mot || 0, 10) + parseInt(values.ass2.mot || 0, 10)) || '',
        hot: (parseInt(values.cia1.hot || 0, 10) + parseInt(values.cia2.hot || 0, 10) +
            parseInt(values.ass1.hot || 0, 10) + parseInt(values.ass2.hot || 0, 10)) || '',
    }

    const handleChange = (event, section, type) => 
    {
        const value = event.target.value.slice(0, 2); 
        if (/^\d*$/.test(value)) 
        {
            setValues(prevValues => (
            {
                ...prevValues,
                [section]: {
                    ...prevValues[section],
                    [type]: value,
                },
            }))
        }
    }

    const handlesavecia = async () => 
    {
        const sections = ['cia1', 'cia2', 'ass1', 'ass2', 'maxEse'];
        const requiredFieldsFilled = sections.every(section =>
            Object.values(values[section]).every(value => value !== '')
        )

        if (!requiredFieldsFilled) {
            alert('All Fields are Required');
            return;
        }

        const dataToSend = 
        {
            cia1: values.cia1,
            cia2: values.cia2,
            ass1: values.ass1,
            ass2: values.ass2,
            maxEse: values.maxEse,
            maxCia,
            academicYear,
            inputValue
        }

        try 
        {
            const response = await axios.post(`${apiUrl}/api/calculation`, dataToSend);
            if (response.data) {
                alert('Data Saved Successfully!');

            }
        } 
        catch (error) {
            console.error("Error Saving Data :", error);
            alert('Failed to Save Data. Please Try Again.');
        }
    }

    const handleSave = async () => 
    {
        const sections = ['level0', 'level1', 'level2', 'level3'];
        const requiredFieldsFilled = sections.every(section =>
            Object.values(values[section]).every(value => value !== '')
        )

        if (!requiredFieldsFilled) {
            alert('All Fields are Required');
            return;
        }

        try 
        {
            const dataToSend = 
            {
                level0: values.level0,
                level1: values.level1,
                level2: values.level2,
                level3: values.level3,
                academicYear
            }
            await axios.post(`${apiUrl}/api/calculationlevel`, dataToSend);
            alert('Data Saved Successfully!');
        } 
        catch (error) {
            console.error("Error Saving Data :", error);
            alert('Failed to Save Data. Please Try Again.');
        }
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    return (
        <div className="mark-mng-main">
            <span className="mark-mng-header">INPUT VALUES FOR CALCULATION</span>
            <div className="mark-mng-top-container">
                <table className="mark-mng-mark-table">
                    <thead>
                        <tr>
                            <th className='mark-mng-th'></th>
                            <th className='mark-mng-th'>LOT</th>
                            <th className='mark-mng-th'>MOT</th>
                            <th className='mark-mng-th'>HOT</th>
                        </tr>
                    </thead>
                    <tbody>
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
                    </tbody>
                </table>
                <div className="mark-mng-left-wrapper">
                    <table className="mark-mng-mark-wtable" >
                        <thead>
                            <tr>
                                <th className='mark-mng-th'></th>
                                <th className='mark-mng-th'>CIA</th>
                                <th className='mark-mng-th'>ESE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
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
                            </tr>
                            <tr>
                                <td className='mark-mng-td'>THRESHOLD FOR CO</td>
                                <td className='mark-mng-td' colSpan={2}>
                                    <input
                                        className='mark-mng-input'
                                        type="number"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="mark-mng-button" onClick={handlesavecia}>SAVE</button>
                </div>
            </div>
            <div>
                <table className="mark-mng-ltable">
                    <thead>
                        <tr>
                            <th className="mark-mng-th"></th>
                            <th className="mark-mng-th" colSpan={2}>UG</th>
                            <th className="mark-mng-th" colSpan={2}>PG</th>
                        </tr>
                        <tr>
                            <th className="mark-mng-th"></th>
                            <th className="mark-mng-th">START RANGE</th>
                            <th className="mark-mng-th">END RANGE</th>
                            <th className="mark-mng-th">START RANGE</th>
                            <th className="mark-mng-th">END RANGE</th>
                        </tr>
                    </thead>
                    <tbody>
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
                            <td className="mark-mng-td">
                                <input
                                    className="mark-mng-input"
                                    type="number"
                                />
                            </td>
                        </tr>
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
                            <td className="mark-mng-td">
                                <input
                                    className="mark-mng-input"
                                    type="number"
                                />
                            </td>
                        </tr>
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
                            <td className="mark-mng-td">
                                <input
                                    className="mark-mng-input"
                                    type="number"
                                />
                            </td>
                        </tr>
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
                            <td className="mark-mng-td">
                                <input
                                    className="mark-mng-input"
                                    type="number"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="mark-mng-level-save-btn">
                    <button className="mark-mng-button" onClick={handleSave}>SAVE</button>
                </div>
                
            </div>
        </div>
    )
}

export default MarkManage;