import React, { useState, useEffect } from "react";
import axios from "axios";
import './markrelease.css';
import Loading from '../../../assets/load.svg'

function MarkRelease() {
    const [originalData, setOriginalData] = useState();
    const [filteredData, setFilteredData] = useState(); const [l_cia1, setL_cia1] = useState();
    const [l_cia2, setL_cia2] = useState();
    const [l_a1, setL_a1] = useState();
    const [l_a2, setL_a2] = useState();
    const [l_ese, setL_ese] = useState();

    // const [checkboxState, setCheckboxState] = useState({});
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/reportdata`);
                const data = response.data;
                console.log(data)

                if (response.data.length > 0) {
                    setL_cia1(response.data[0].l_c1);
                    setL_cia2(response.data[0].l_c2);
                    setL_a1(response.data[0].l_a1);
                    setL_a2(response.data[0].l_a2);
                    setL_ese(response.data[0].l_ese);
                }
                setFilteredData(data);
                setOriginalData(data); // Store original data


            } catch (err) {
                console.log('Error fetching data:', err);
            }
        };
        fetchReportData();
    }, [apiUrl]);

    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();
        const filteredList = originalData.filter(item =>
            item.staff_id.toLowerCase().includes(searchText) ||
            item.staff_name.toLowerCase().includes(searchText) ||
            item.course_code.toLowerCase().includes(searchText)
        );
        setFilteredData(filteredList);
    };

    const handleCheckbox = (index, field, value) => {
        const checkData = [...filteredData];
        checkData[index][field] = value ? 2 : 1;
        setFilteredData(checkData);

    }

    const handleLockChange = (e) => {
        const { name, checked } = e.target;
        if (name === 'l_cia1') setL_cia1(checked ? 2 : 1);
        if (name === 'l_cia2') setL_cia2(checked ? 2 : 1);
        if (name === 'l_a1') setL_a1(checked ? 2 : 1);
        if (name === 'l_a2') setL_a2(checked ? 2 : 1);
        if (name === 'l_ese') setL_ese(checked ? 2 : 1);
    };

    const handleUpdate = async (index) => {
        const data = filteredData[index];
        console.log(data)
        try {
            const res = await axios.put(`${apiUrl}/api/reportrelease`, data);
            if (res) {
                alert('Release Update Successfully....')
            }

        }
        catch (error) {
            console.log('Error for the server', error)
        }
    }
    const handleOverAll = async () => {
        try {
            await axios.put(`${apiUrl}/api/overallrelease`, { l_cia1, l_cia2 });
            alert('Release Update Successfully....')
        }
        catch (error) {
            console.log('Error for the server', error)
        }
    }
    // Handle checkbox change
    // const handleCheckboxChange = (staff_id, field, checked) => {
    //     setCheckboxState(prevState => ({
    //         ...prevState,
    //         [staff_id]: {
    //             ...prevState[staff_id],
    //             [field]: checked
    //         }
    //     }));
    // };


    // const handleSave = async () => {
    //     const updates = {};


    //     Object.keys(checkboxState).forEach(staff_id => {
    //         const state = checkboxState[staff_id];
    //         updates[staff_id] = {
    //             cia_1: state.cia_1 ? 1 : 0,
    //             cia_2: state.cia_2 ? 1 : 0,
    //             ass_1: state.ass_1 ? 1 : 0,
    //             ass_2: state.ass_2 ? 1 : 0,
    //             ese: state.ese ? 1 : 0
    //         };
    //     });

    //     try {

    //         await axios.put(`${apiUrl}/updatemarkrelease`, { updates });
    //         alert("Report data saved successfully!");
    //     } catch (error) {
    //         alert("Failed to save data. " + (error.response?.data.message || error.message));
    //     }
    // };

    if (!filteredData) return <div><center><img src={Loading} alt="" className="img" /></center></div>;
    // console.log(Loading)
    return (
        <div className="release-main">
            <div className="release-top-heading">REPORT DATA</div>
            <div className="release-input-btn">
                <input className="release-search"
                    type="text"
                    placeholder="Search....."
                    onChange={handleSearch}
                />
                {/* <button onClick={handleSave} className="release-save-btn">SAVE</button> Global save button */}
            </div>
            <div className="release-table-wrapper">
                <table className="release-table">
                    <thead className="release-table-head">
                        {/* <tr className="release-row">
<th className="release-table-header"></th>
<th className="release-table-header"></th>
<th className="release-table-header"></th>
<th className="release-table-header"></th>
<th className="release-table-header"></th>
<th className="release-table-header"></th>
<th className="release-table-header">
<input
type="checkbox"
name="l_cia1"
checked={l_cia1 === 2}
onChange={handleLockChange}
/>
</th>
<th className="release-table-header">
<input
type="checkbox"
name="l_cia2"
checked={l_cia2 === 2}
onChange={handleLockChange}
/>
</th>
<th className="release-table-header">
<input
type="checkbox"
name="l_a1"
checked={l_a1 === 2}
onChange={handleLockChange}
/>
</th>
<th className="release-table-header">
<input
type="checkbox"
name="l_a2"
checked={l_a2 === 2}
onChange={handleLockChange}
/>
</th>
<th className="release-table-header">
<input
type="checkbox"
name="l_ese"
checked={l_ese === 2}
onChange={handleLockChange}
/>
</th>
<th className="release-table-header"> <button
onClick={handleOverAll}
className="row-save-btn">
SAVE
</button></th>
</tr> */}
                        <tr>
                            <th className="release-table-header">S. No</th>
                            <th className="release-table-header">Staff ID</th>
                            <th className="release-table-header">Staff Name</th>
                            <th className="release-table-header">Dept ID</th>
                            <th className="release-table-header">Course Code</th>
                            <th className="release-table-header">Course Title</th>
                            <th className="release-table-header">Section</th>
                            <th className="release-table-header">CIA 1</th>
                            <th className="release-table-header">CIA 2</th>
                            <th className="release-table-header">Ass 1</th>
                            <th className="release-table-header">Ass 2</th>
                            <th className="release-table-header">ESE</th>
                            <th className="release-table-header">Action</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {filteredData.map((reportItem, index) => (
                            <tr key={reportItem.index} className="release-row">
                                <td className={index % 2 === 0 ? 'scope-dark' : 'scope-light'}>
                                    {index + 1}
                                </td>
                                <td className={index % 2 === 0 ? 'scope-dark' : 'scope-light'}>
                                    {reportItem.staff_id}
                                </td>
                                <td className={index % 2 === 0 ? 'scope-dark' : 'scope-light'}>
                                    {reportItem.staff_name}
                                </td>
                                <td className={index % 2 === 0 ? 'scope-dark' : 'scope-light'}>
                                    {reportItem.course_id}
                                </td>
                                <td className={index % 2 === 0 ? 'scope-dark' : 'scope-light'}>
                                    {reportItem.course_code}
                                </td>
                                <td className={index % 2 === 0 ? 'scope-dark' : 'scope-light'}>
                                    {reportItem.course_title}
                                </td>
                                <td className={index % 2 === 0 ? 'scope-dark' : 'scope-light'}>
                                    {reportItem.section}
                                </td>
                                <td className={index % 2 === 0 ? 'scope-dark' : 'scope-light'}>
                                    <input
                                        type="checkbox"
                                        checked={reportItem.cia_1 === 2}
                                        onChange={(e) => handleCheckbox(index, 'cia_1', e.target.checked)}
                                    />
                                </td>
                                <td className={index % 2 === 0 ? 'scope-dark' : 'scope-light'}>
                                    <input
                                        type="checkbox"
                                        checked={reportItem.cia_2 === 2}
                                        onChange={(e) => handleCheckbox(index, 'cia_2', e.target.checked)}
                                    />
                                </td>
                                <td className={index % 2 === 0 ? 'scope-dark' : 'scope-light'}>
                                    <input
                                        type="checkbox"
                                        checked={reportItem.ass_1 === 2}
                                        onChange={(e) => handleCheckbox(index, 'ass_1', e.target.checked)}
                                    />
                                </td>
                                <td className={index % 2 === 0 ? 'scope-dark' : 'scope-light'}>
                                    <input
                                        type="checkbox"
                                        checked={reportItem.ass_2 === 2}
                                        onChange={(e) => handleCheckbox(index, 'ass_2', e.target.checked)}
                                    />
                                </td>
                                <td className={index % 2 === 0 ? 'scope-dark' : 'scope-light'}>
                                    <input
                                        type="checkbox"
                                        checked={reportItem.ese === 2}
                                        onChange={(e) => handleCheckbox(index, 'ese', e.target.checked)}
                                    />
                                </td>
                                <td className={index % 2 === 0 ? 'scope-dark' : 'scope-light'}>
                                    <button
                                        onClick={() => handleUpdate(index)}
                                        className="row-save-btn">
                                        SAVE
                                    </button> {/* SAVE button in each row */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MarkRelease;
