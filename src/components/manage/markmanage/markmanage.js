import React, { useState } from "react";
import './markmanage.css';

function MarkManage() {
    const [values, setValues] = useState({
        cia1: { lot: '', mot: '', hot: '' },
        cia2: { lot: '', mot: '', hot: '' },
        ass1: { lot: '', mot: '', hot: '' },
        ass2: { lot: '', mot: '', hot: '' },
    });

    // Calculate MAX CIA values for lot, mot, and hot
    const maxCia = {
        lot: (parseInt(values.cia1.lot || 0, 10) + parseInt(values.cia2.lot || 0, 10) +
              parseInt(values.ass1.lot || 0, 10) + parseInt(values.ass2.lot || 0, 10)) || '',
        mot: (parseInt(values.cia1.mot || 0, 10) + parseInt(values.cia2.mot || 0, 10) +
              parseInt(values.ass1.mot || 0, 10) + parseInt(values.ass2.mot || 0, 10)) || '',
        hot: (parseInt(values.cia1.hot || 0, 10) + parseInt(values.cia2.hot || 0, 10) +
              parseInt(values.ass1.hot || 0, 10) + parseInt(values.ass2.hot || 0, 10)) || '',
    };

    // Update state based on field inputs, allowing only two digits
    const handleChange = (event, section, type) => {
        const value = event.target.value;
        if (value.length <= 2 && /^\d*$/.test(value)) { // Checks if the input is numeric and 2 digits max
            setValues(prevValues => ({
                ...prevValues,
                [section]: {
                    ...prevValues[section],
                    [type]: value,
                },
            }));
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
                        {['cia1', 'cia2', 'ass1', 'ass2'].map(section => (
                            <tr key={section}>
                                <td className='mark-mng-td'>{section.toUpperCase()}</td>
                                {['lot', 'mot', 'hot'].map(type => (
                                    <td className='mark-mng-td' key={type}>
                                        <input
                                            className='mark-mng-input'
                                            type="number"
                                            value={values[section][type]}
                                            onChange={e => handleChange(e, section, type)}
                                            maxLength="2"
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
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
                                <input className='mark-mng-input' type="number" />
                            </td>
                            <td className='mark-mng-td'>
                                <input className='mark-mng-input' type="number" />
                            </td>
                            <td className='mark-mng-td'>
                                <input className='mark-mng-input' type="number" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <btn>save</btn>
            </div>
        </div>
    );
}

export default MarkManage;