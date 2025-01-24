import React, { useState, useEffect } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash,faPlus } from '@fortawesome/free-solid-svg-icons';
import './staffmaster.css';

function StaffMasterManage() 
{
	const [staffData, setStaffData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;
    const [popup, setPopup] = useState(false);
    const [staffId, setStaffId] = useState("");
    const [staffName, setStaffName] = useState("");
    const [staffDept, setStaffDept] = useState("");
    const [staffCategory, setStaffCategory] = useState("");
    const [deptCategory, setDeptCategory] = useState("");
    const [staffpassword, setStaffpassword] = useState("");
    const [edit, setEdit] = useState(false);
    const [newstaffname, setNewstaffname] = useState("");
    const [oldpassword, setOldpassword] = useState("");
    const [newdept, setNewdept] = useState("");
    const [newStaffCategory, setNewStaffCategory] = useState("");
    const [newDeptCategory, setNewDeptCategory] = useState("");
    const [newstaffid, setNewstaffid] = useState("");
    const [newpassword, setNewpassword] = useState("");
    const [deletestaff, setDeletestaff]= useState(false);
    const [deletestaffid, setDeletestaffid]=useState("");
    const [deletestaffname, setDeletestaffname]=useState("")

    useEffect(() => 
    {
        const staffDetails = async () => 
        {
            try 
            {
                const StaffResponse = await axios.get(`${apiUrl}/api/staffdetails`);
                if (StaffResponse.data) {
                    setStaffData(StaffResponse.data);
                    setFilteredData(StaffResponse.data);
                }
            }
            catch (err) {
                console.log('Error Fetching Data:', err);
            }
        }
        staffDetails();
    }, [apiUrl, staffData]);

    const [checkboxValues, setCheckboxValues] = useState(
    {
        dashboard: true,
        course: true,
        co: false,
        so: false,
        po: false,
        pso: false,
        wpr: false,
        obereport: false,
        input: false,
        manage: false,
        rsm: true,
        setting: true
    })

    const showPopup = () => {
        setPopup(true);
        document.body.classList.add('blur');
    }

    const hidepopup = () => {
        setPopup(false);
        document.body.classList.remove('blur');
    }

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setCheckboxValues(prevValues => ({
            ...prevValues,
            [name]: checked
        }))
    }

    const savenewstaff = async (e) => 
    {
        e.preventDefault();
        if (!staffId || !staffName || !staffDept || !staffCategory || !staffpassword) 
        {
            window.alert("All Fields are Required");
            return;
        }
        const newStaffData = 
        {
            staff_id: staffId,
            staff_name: staffName,
            staff_dept: staffDept,
            staff_category: staffCategory,
            dept_category: deptCategory,
            password: staffpassword,
            permissions: checkboxValues
        }

        try 
        {
            const newStaffResponce = await axios.post(`${apiUrl}/api/newstaff`, newStaffData);
            if (newStaffResponce.data) 
            {
                setStaffData([...staffData, newStaffResponce.data]);
                setFilteredData([...staffData, newStaffResponce.data]);
                window.alert("New Staff has been Added Successfully");
                // window.location.reload();
            }
            setPopup(false);
        }
        catch (err) {
            console.log("Fetching Error", err);
        }
        setStaffId("");
        setStaffName("");
        setStaffDept("");
        setPopup(false);
    }

    const handleSearch = (e) => 
    {
        const searchText = e.target.value.toLowerCase();
        const filterList = staffData.filter((staff) =>
            staff.staff_id.toLowerCase().includes(searchText) ||
            staff.staff_dept.toLowerCase().includes(searchText) ||
            staff.staff_name.toLowerCase().includes(searchText)
        )
        setFilteredData(filterList);
    }

    const handleEdit = (id, name, pass, dept, staff_category, dept_category) => 
    {
        setNewstaffid(id);
        setNewstaffname(name);
        setOldpassword(pass);
        setNewdept(dept);
        setNewStaffCategory(staff_category);
        setNewDeptCategory(dept_category)
        setNewpassword("")
        setEdit(true);
    }

    const staffEditClose = () => 
    {
        setEdit(false);
    }

    const updatestaff = async () => 
    {
        try 
        {
            const updateresponse = await axios.put(`${apiUrl}/api/staffupdate`, { 
                newstaffid, newstaffname, newpassword, newdept, newStaffCategory, newDeptCategory, oldpassword
            });
            if (updateresponse.data) {
                window.alert("Staff Data Modified")
            }
            setEdit(false);
        }
        catch (err) {
            console.log("Err Update Staff", err)
        }
    }

    const handleDelete = (dstaffid,dstaffname) => 
    {
        setDeletestaffid(dstaffid);
        setDeletestaffname(dstaffname);
        setDeletestaff(true);
    }

    const staffDeleteClose = () =>
    {
        setDeletestaff(false);
    }

    const Confirmdelete = async () =>
    {
        try 
        {
            const DeleteResponse = await axios.post(`${apiUrl}/api/staffdelete`,{deletestaffid});
            if(DeleteResponse.data) 
                {
                window.alert("Staff Deleted");
                window.location.reload();
                setDeletestaff(false);
            }
        }
        catch(err){
            window.alert("Error delete")
        }
    }

    return (
        <div className="smsm-manage">
            <span className="smsm-top-heading">STAFF DATA</span>
            <div className="smsm-input-btn">
                <input className="smsm-search"
                    type="text"
                    placeholder="Search ..."
                    onChange={handleSearch}
                />
                <div>
                    <button className="smsm-save-btn" onClick={showPopup}><span>ADD</span><FontAwesomeIcon icon={faPlus} className="smsm-icon-add" /></button>
                </div>
                {popup && (
                    <>
                        <div className="smsm-overlay" />
                        <div className="smsm-addstaff">
                            <div className="smsm-close-class">
                                <button onClick={hidepopup} className="smsm-close">✖</button>
                            </div>
                            <div className="smsm-addpopup">
                                <input
                                    type="text"
                                    value={staffId}
                                    onChange={(e) => setStaffId(e.target.value)}
                                    className="smsm-inputs"
                                    placeholder="STAFF ID"
                                    required
                                />
                                <input
                                    type="text"
                                    value={staffName}
                                    onChange={(e) => setStaffName(e.target.value)}
                                    className="smsm-inputs"
                                    placeholder="STAFF NAME"
                                    required
                                />
                                <div className="smsm-edit-psw">
                                    <input
                                        type="text"
                                        value={staffCategory}
                                        onChange={(e) => setStaffCategory(e.target.value)}
                                        className="smsm-inputs"
                                        placeholder="STAFF CATEGORY"
                                    />
                                    <input
                                        type="text"
                                        value={deptCategory}
                                        onChange={(e) => setDeptCategory(e.target.value)}
                                        className="smsm-inputs"
                                        placeholder="DEPT CATEGORY"
                                    />
						        </div>
                                <div className="smsm-edit-psw">
                                    <input
                                        type="text"
                                        value={staffDept}
                                        onChange={(e) => setStaffDept(e.target.value)}
                                        className="smsm-inputs"
                                        placeholder="STAFF DEPARTMENT"
                                    />
                                    <input
                                        type="text"
                                        value={staffpassword}
                                        onChange={(e) => setStaffpassword(e.target.value)}
                                        className="smsm-inputs"
                                        placeholder="PASSWORD"
                                    />
						        </div>
                            </div>
                            <div className="smsm-check-boxes">
                                <div className="smsm-individual-check">
                                    <input
                                        type="checkbox"
                                        name="dashboard"
                                        checked={checkboxValues.dashboard}
                                        onChange={handleCheckboxChange}
                                    />
                                    Dashboard
                                </div>
                                <div className="smsm-individual-check">
                                    <input
                                        type="checkbox"
                                        name="course"
                                        checked={checkboxValues.course}
                                        onChange={handleCheckboxChange}
                                    />
                                    Course
                                </div>
                                <div className="smsm-individual-check">
                                    <input
                                        type="checkbox"
                                        name="rsm"
                                        checked={checkboxValues.rsm}
                                        onChange={handleCheckboxChange}
                                    />
                                    RSM
                                </div>
                                <div className="smsm-individual-check">
                                    <input
                                        type="checkbox"
                                        name="setting"
                                        checked={checkboxValues.setting}
                                        onChange={handleCheckboxChange}
                                    />
                                    Settings
                                </div>
                            </div>
                            <div className="smsm-check-boxes">
                                <div className="smsm-individual-check">
                                    <input
                                        type="checkbox"
                                        name="po"
                                        checked={checkboxValues.po}
                                        onChange={handleCheckboxChange}
                                    />
                                    PO
                                </div>
                                <div className="smsm-individual-check">
                                    <input
                                        type="checkbox"
                                        name="co"
                                        checked={checkboxValues.co}
                                        onChange={handleCheckboxChange}
                                    />
                                    CO
                                </div>
                                <div className="smsm-individual-check">
                                    <input
                                        type="checkbox"
                                        name="so"
                                        checked={checkboxValues.so}
                                        onChange={handleCheckboxChange}
                                    />
                                    SO
                                </div>
                                <div className="smsm-individual-check">
                                    <input
                                        type="checkbox"
                                        name="pso"
                                        checked={checkboxValues.pso}
                                        onChange={handleCheckboxChange}
                                    />
                                    PSO
                                </div>
                            </div>
                            <div className="smsm-check-boxes">
                                <div className="smsm-individual-check">
                                    <input
                                        type="checkbox"
                                        name="wpr"
                                        checked={checkboxValues.wpr}
                                        onChange={handleCheckboxChange}
                                    />
                                    Report
                                </div>
                                {/* <div className="smsm-individual-check">
                                    <input
                                        type="checkbox"
                                        name="obereport"
                                        checked={checkboxValues.obereport}
                                        onChange={handleCheckboxChange}
                                    />
                                    Obe Report
                                </div> */}
                                <div className="smsm-individual-check">
                                    <input
                                        type="checkbox"
                                        name="input"
                                        checked={checkboxValues.input}
                                        onChange={handleCheckboxChange}
                                    />
                                    Input
                                </div>
                            </div>
                            <div className="smsm-check-boxes">
                                <div className="smsm-individual-check">
                                    <input
                                        type="checkbox"
                                        name="manage"
                                        checked={checkboxValues.manage}
                                        onChange={handleCheckboxChange}
                                    />
                                    Manage
                                </div>
                            </div>
                            <div className="smsh-delete-btn-container">
                                <button onClick={savenewstaff} className="smsm-add-save-btn">SAVE</button>
                                <button onClick={hidepopup} className="smsm-save-edit-btn">CANCEL</button> 
                            </div>
                        </div>
                    </>
                )}
                {edit && (
                    <div className="smsm-overlay">
                        <div className="smsm-edit">
                            <div className="smsm-close-class">
                                <span onClick={staffEditClose} className="smsm-close">✖</span>
                            </div>
                            <input
                                type="text"
                                value={newstaffid}
                                onChange={(e) => setNewstaffid(e.target.value)}
                                className="smsm-edit-inputbox"
                                placeholder={""}
                                disabled
                            />
                            <input
                                type="text"
                                value={newstaffname}
                                onChange={(e) => setNewstaffname(e.target.value)}
                                className="smsm-edit-inputbox"
                                placeholder={""}
                            />
                            <input
                                type="text"
                                value={newdept}
                                onChange={(e) => setNewdept(e.target.value)}
                                className="smsm-edit-inputbox"
                                placeholder={""}
                            />
                            <input
                                type="text"
                                value={newStaffCategory}
                                onChange={(e) => setNewStaffCategory(e.target.value)}
                                className="smsm-edit-inputbox"
                                placeholder={""}
                            />
                            <input
                                type="text"
                                value={newDeptCategory}
                                onChange={(e) => setNewDeptCategory(e.target.value)}
                                className="smsm-edit-inputbox"
                                placeholder={""}
                            />
                            <div className="smsm-edit-psw">
                                <label className="smsm-edit-password">
                                    <span className="smsm-edit-span"> Old Password :</span>
                                    <input
                                        type="text"
                                        value={oldpassword}
                                        onChange={(e) => setOldpassword(e.target.value)}
                                        className="smsm-edit-inputbox-psw"
                                        placeholder={""}
                                        disabled
                                    />
                                </label>
                                <label className="smsm-edit-password">
                                    <span className="smsm-edit-span">New Password :</span>
                                    <input
                                        type="text"
                                        value={newpassword}
                                        onChange={(e) => setNewpassword(e.target.value)}
                                        className="smsm-edit-inputbox-psw"
                                        defaultValue={""}
                                        placeholder={"New Password"}
                                    />
                                </label>
                            </div>
                            <div className="smsh-delete-btn-container">
                                <button onClick={updatestaff} className="smsm-add-save-btn">SAVE</button>
                                <button onClick={staffEditClose} className="smsm-save-edit-btn">CANCEL</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {deletestaff && (
                <div className="smsm-overlay">
                    <div className="smsm-delete">
                        <div className="smsm-close-class">
                            <span onClick={staffDeleteClose} className="smsm-close">✖</span>
                        </div>
                        <h4>STAFF ID : {deletestaffid}</h4>
                        <h4>STAFF NAME : {deletestaffname}</h4>
                        <div className="smsm-delete-btn-container">
                            <button onClick={Confirmdelete}className="smsm-confirm-btn">CONFIRM</button>
                            <button onClick={staffDeleteClose}className="smsm-cancel-btn">CANCEL</button>
                        </div>
                    </div>
                </div>
            )}
            <div>
                <table className="smsm-header">
                    <thead>
                        <tr>
                            <th className="smsm-th-sno">S. No.</th>
                            <th className="smsm-th-id">Staff Id</th>
                            <th className="smsm-th-name">Staff Name</th>
                            <th className="smsm-th-name">Dept Name</th>
                            <th className="smsm-th-edit">Edit</th>
                            <th className="smsm-th-delete">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((staff, index) => (
                                <tr key={index}className={index % 2 === 0 ? 'staff-repo-light' : 'staff-repo-dark'}>
                                    <td className="smsm-td-sno">{index + 1}</td>
                                    <td className="smsm-td-id">{staff.staff_id}</td>
                                    <td className="smsm-td-name">{staff.staff_name}</td>
                                    <td className="smsm-td-name">{staff.staff_dept}</td>
                                    <td className="smsm-td-edit">
                                        <button onClick={() => handleEdit(staff.staff_id, staff.staff_name, staff.staff_pass, staff.staff_dept, staff.staff_category, staff.dept_category)} className="smsm-edit-btn">
                                            <span className="smsm-edit-btn">Edit &nbsp; <FontAwesomeIcon icon={faEdit} className="smsm-icon" /></span>
                                        </button>
                                    </td>
                                    <td className="smsm-td-delete">
                                        <button onClick={() => handleDelete(staff.staff_id,staff.staff_name)} className="smsm-del-btn">
                                        <span className="smsm-delete-btn">Delete &nbsp;<FontAwesomeIcon icon={faTrash} className="smsm-icon" /></span>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="hod-repo-td">
                                    No Data Available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StaffMasterManage;