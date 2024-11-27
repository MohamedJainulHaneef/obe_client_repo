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
        level0: { ugStartRange: "0", ugEndRange: "", pgStartRange: "1", pgEndRange: "" },
        level1: { ugStartRange: "", ugEndRange: "", pgStartRange: "", pgEndRange: "" },
        level2: { ugStartRange: "", ugEndRange: "", pgStartRange: "", pgEndRange: "" },
        level3: { ugStartRange: "", ugEndRange: "", pgStartRange: "", pgEndRange: "" },
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

    const handleChange = (event, section, type) => {
        const value = event.target.value.slice(0, 3); // Allow up to 3 digits
        if (/^\d*$/.test(value)) { // Ensure value is numeric
            setValues((prevValues) => {
                const newValues = {
                    ...prevValues,
                    [section]: {
                        ...prevValues[section],
                        [type]: value,
                    },
                };

                // Automatically update the next level's start range
                if (type === "ugEndRange" && section.startsWith("level")) {
                    const currentLevel = parseInt(section.replace("level", ""), 10);
                    const nextLevel = `level${currentLevel + 1}`;
                    if (newValues[nextLevel]) {
                        newValues[nextLevel] = {
                            ...newValues[nextLevel],
                            ugStartRange: parseInt(value, 10) + 1 || "", // Increment end range
                        };
                    }
                }

                if (type === "pgEndRange" && section.startsWith("level")) {
                    const currentLevel = parseInt(section.replace("level", ""), 10);
                    const nextLevel = `level${currentLevel + 1}`;
                    if (newValues[nextLevel]) {
                        newValues[nextLevel] = {
                            ...newValues[nextLevel],
                            pgStartRange: parseInt(value, 10) + 1 || "", // Increment end range
                        };
                    }
                }

                return newValues;
            });
        }
    };
    
    const handleSave = async () => {
        // Define sections for validation
        const ciaSections = ['cia1', 'cia2', 'ass1', 'ass2', 'maxEse'];
        const levelSections = ['level0', 'level1', 'level2', 'level3'];
    
        // Validate all required fields for both sets of sections
        const areCiaFieldsFilled = ciaSections.every(section =>
            Object.values(values[section]).every(value => value !== '')
        );
        const areLevelFieldsFilled = levelSections.every(section =>
            Object.values(values[section]).every(value => value !== '')
        );
    
        if (!areCiaFieldsFilled || !areLevelFieldsFilled) {
            alert('All Fields are Required');
            return;
        }
    
        try {
            // Prepare data for both APIs
            const ciaData = {
                cia1: values.cia1,
                cia2: values.cia2,
                ass1: values.ass1,
                ass2: values.ass2,
                maxEse: values.maxEse,
                maxCia,
                academicYear,
                inputValue
            };
    
            const levelData = {
                level0: values.level0,
                level1: values.level1,
                level2: values.level2,
                level3: values.level3,
                academicYear
            };
    
            // Make API calls
            const [ciaResponse, levelResponse] = await Promise.all([
                axios.post(`${apiUrl}/api/calculation`, ciaData),
                axios.post(`${apiUrl}/api/calculationlevel`, levelData)
            ]);
    
            // Check responses
            if (ciaResponse.data && levelResponse.data) {
                alert('Data Saved Successfully!');
            }
        } catch (error) {
            console.error('Error Saving Data:', error);
            alert('Failed to Save Data. Please Try Again.');
        }
    };
    

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
  {["level0", "level1", "level2", "level3"].map((level, index) => (
    <tr key={level}>
      {/* Level Label */}
      <td className="mark-mng-td">{`Level ${index}`}</td>

      {/* UG Start Range (Read-Only) */}
      <td className="mark-mng-td">
        <input
          className="mark-mng-input"
          type="number"
          value={values[level].ugStartRange}
          readOnly
          disabled // Prevent user from editing Start Range directly
        />
      </td>

      {/* UG End Range */}
      <td className="mark-mng-td">
        <input
          className="mark-mng-input"
          type="number"
          value={values[level].ugEndRange}
          onChange={(e) => handleChange(e, level, "ugEndRange")} // Trigger handleChange for UG End Range
        />
      </td>

      {/* PG Start Range (Read-Only) */}
      <td className="mark-mng-td">
        <input
          className="mark-mng-input"
          type="number"
          value={values[level].pgStartRange}
          readOnly
          disabled // Prevent user from editing Start Range directly
        />
      </td>

      {/* PG End Range */}
      <td className="mark-mng-td">
        <input
          className="mark-mng-input"
          type="number"
          value={values[level].pgEndRange}
          onChange={(e) => handleChange(e, level, "pgEndRange")} // Trigger handleChange for PG End Range
        />
      </td>
    </tr>
  ))}
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