


import React, { useState } from "react";
import './markmanage.css';

function MarkManage() {
    const [values, setValues] = useState({
        cia1: { lot: '', mot: '', hot: '' },
        cia2: { lot: '', mot: '', hot: '' },
        ass1: { lot: '' },
        ass2: { lot: '' },
        ese: { lot: '', mot: '', hot: '' }
    });

    const handleCia1Change = (type, value) => {
        setValues((prevValues) => ({
            ...prevValues,
            cia1: { ...prevValues.cia1, [type]: value },
            cia2: { ...prevValues.cia2, [type]: value },
            ese: { ...prevValues.ese, [type]: value }
        }));
    };

    const handleAss1Change = (value) => {
        setValues((prevValues) => ({
            ...prevValues,
            ass1: { lot: value },
            ass2: { lot: value }
        }));
    };

    const calculateTotal = (field) => {
        return ['cia1', 'cia2', 'ass1', 'ass2'].reduce((total, item) => {
            const val = parseFloat(values[item][field] || 0);
            return total + (isNaN(val) ? 0 : val);
        }, 0);
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
                        <tr>
                            <td className='mark-mng-td'>CIA 1</td>
                            <td className='mark-mng-td'>
                                <input
                                    className='mark-mng-input'
                                    type="number"
                                    value={values.cia1.lot}
                                    onChange={(e) => handleCia1Change('lot', e.target.value)}
                                />
                            </td>
                            <td className='mark-mng-td'>
                                <input
                                    className='mark-mng-input'
                                    type="number"
                                    value={values.cia1.mot}
                                    onChange={(e) => handleCia1Change('mot', e.target.value)}
                                />
                            </td>
                            <td className='mark-mng-td'>
                                <input
                                    className='mark-mng-input'
                                    type="number"
                                    value={values.cia1.hot}
                                    onChange={(e) => handleCia1Change('hot', e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className='mark-mng-td'>CIA 2</td>
                            <td className='mark-mng-td'>
                                <input className='mark-mng-input' type="number" value={values.cia2.lot} readOnly />
                            </td>
                            <td className='mark-mng-td'>
                                <input className='mark-mng-input' type="number" value={values.cia2.mot} readOnly />
                            </td>
                            <td className='mark-mng-td'>
                                <input className='mark-mng-input' type="number" value={values.cia2.hot} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td className='mark-mng-td'>ASS 1</td>
                            <td className='mark-mng-td'>
                                <input
                                    className='mark-mng-input'
                                    type="number"
                                    value={values.ass1.lot}
                                    onChange={(e) => handleAss1Change(e.target.value)}
                                />
                            </td>
                            <td className='mark-mng-td'></td>
                            <td className='mark-mng-td'></td>
                        </tr>
                        <tr>
                            <td className='mark-mng-td'>ASS 2</td>
                            <td className='mark-mng-td'>
                                <input className='mark-mng-input' type="number" value={values.ass2.lot} readOnly />
                            </td>
                            <td className='mark-mng-td'></td>
                            <td className='mark-mng-td'></td>
                        </tr>
                        <tr>
                            <td className='mark-mng-td'>MAX CIA</td>
                            <td className='mark-mng-td'>
                                <input className='mark-mng-input' type="number" value={calculateTotal('lot')} readOnly />
                            </td>
                            <td className='mark-mng-td'>
                                <input className='mark-mng-input' type="number" value={calculateTotal('mot')} readOnly />
                            </td>
                            <td className='mark-mng-td'>
                                <input className='mark-mng-input' type="number" value={calculateTotal('hot')} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td className='mark-mng-td'>MAX ESE</td>
                            <td className='mark-mng-td'>
                                <input className='mark-mng-input' type="number" value={values.ese.lot} readOnly />
                            </td>
                            <td className='mark-mng-td'>
                                <input className='mark-mng-input' type="number" value={values.ese.mot} readOnly />
                            </td>
                            <td className='mark-mng-td'>
                                <input className='mark-mng-input' type="number" value={values.ese.hot} readOnly />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MarkManage;
