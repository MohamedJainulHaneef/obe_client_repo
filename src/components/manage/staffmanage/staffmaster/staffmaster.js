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
    const [staffcategory, setStaffcategory] = useState("");
    const [staffpassword, setStaffpassword] = useState("");
    const [edit, setEdit] = useState(false);
    const [newstaffname, setNewstaffname] = useState("");
    const [oldpassword, setOldpassword] = useState("");
    const [newdept, setNewdept] = useState("");
    const [newcategory, setNewcategory] = useState("");
    const [newstaffid, setNewstaffid] = useState("");
    const [newpassword, setNewpassword] = useState("");
    const [deletestaff, setDeletestaff]= useState(false);
    const [deletestaffid, setDeletestaffid]=useState("");
    const [deletestaffname, setDeletestaffname]=useState("")

    const [checkboxValues, setCheckboxValues] = useState(
    {
        dashboard: true,
        course: true,
        co: false,
        so: false,
        po: false,
        pso: false,
        tutor: false,
        hod: false,
        report: false,
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
        if (!staffId || !staffName || !staffDept || !staffcategory || !staffpassword) 
        {
            window.alert("All Fields are Required");
            return;
        }
        const newStaffData = 
        {
            staff_id: staffId,
            staff_name: staffName,
            staff_dept: staffDept,
            category: staffcategory,
            password: staffpassword,
            permissions: checkboxValues
        }

        try 
        {
            const newStaffResponce = await axios.post(`${apiUrl}/ap/newstaff`, newStaffData);
            if (newStaffResponce.data) 
            {
                console.log(newStaffResponce.data);
                setStaffData([...staffData, newStaffResponce.data]);
                setFilteredData([...staffData, newStaffResponce.data]);
                window.alert("New Staff Added");
                window.location.reload();
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

    useEffect(() => 
   {
        const staffDetails = async () => 
        {
            try 
            {
                const StaffResponse = await axios.get(`${apiUrl}/api/staffdetails`);
                if (StaffResponse.data) {
                    console.log(StaffResponse.data);
                    setStaffData(StaffResponse.data);
                    setFilteredData(StaffResponse.data);
                }
            }
            catch (err) {
                console.log('Error Fetching Data:', err);
            }
        }
        staffDetails();
    }, [apiUrl]);

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

    const handleEdit = (id, name, pass, dept, category) => 
    {
        console.log("Edit staff with ID:", staffId);
        setNewstaffid(id);
        setNewstaffname(name);
        setOldpassword(pass);
        setNewdept(dept);
        setNewcategory(category);
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
            const updateresponse = await axios.put(`${apiUrl}/api/staffupdate`, { newstaffid, newstaffname, newpassword, newdept, newcategory });
            if (updateresponse.data) {
                window.alert("Staff Data Modified")
            }
            setEdit(false);
        }
        catch (err) {
            console.log("ERR UPDATE STAFF", err)
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
        <div className="sm-manage">
            <span className="sm-top-heading">STAFF DATA</span>
            <div className="sm-input-btn">
                <input className="sm-search"
                    type="text"
                    placeholder="Search by Id or Name ..."
                    onChange={handleSearch}
                />
                <div>
                    <button className="sm-save-btn" onClick={showPopup}><span>ADD</span><FontAwesomeIcon icon={faPlus} className="smst-icon-add" /></button>
                </div>
                {popup && (
                    <>
                        <div className="sm-overlay" />
                        <div className="sm-addstaff">
                            <div className="sm-close-class">
                                <span className="sm-close-header">ADD STAFF</span>
                                <button onClick={hidepopup} className="sm-close">✖</button>
                            </div>
                            <div className="sm-addpopup">
                                <input
                                    type="text"
                                    value={staffId}
                                    onChange={(e) => setStaffId(e.target.value)}
                                    className="sm-inputs"
                                    placeholder="STAFF ID"
                                    required
                                />
                                <input
                                    type="text"
                                    value={staffName}
                                    onChange={(e) => setStaffName(e.target.value)}
                                    className="sm-inputs"
                                    placeholder="STAFF NAME"
                                    required
                                />
                                <input
                                    type="text"
                                    value={staffDept}
                                    onChange={(e) => setStaffDept(e.target.value)}
                                    className="sm-inputs"
                                    placeholder="STAFF DEPARTMENT"
                                />
                                <input
                                    type="text"
                                    value={staffcategory}
                                    onChange={(e) => setStaffcategory(e.target.value)}
                                    className="sm-inputs"
                                    placeholder="CATEGORY"
                                />
                                <input
                                    type="text"
                                    value={staffpassword}
                                    onChange={(e) => setStaffpassword(e.target.value)}
                                    className="sm-inputs"
                                    placeholder="PASSWORD"
                                />
                            </div>
                            <div className="sm-check-boxes">
                                <div className="sm-individual-check">
                                    <input
                                        type="checkbox"
                                        name="dashboard"
                                        checked={checkboxValues.dashboard}
                                        onChange={handleCheckboxChange}
                                    />
                                    Dashboard
                                </div>
                                <div className="sm-individual-check">
                                    <input
                                        type="checkbox"
                                        name="course"
                                        checked={checkboxValues.course}
                                        onChange={handleCheckboxChange}
                                    />
                                    Course
                                </div>
                                <div className="sm-individual-check">
                                    <input
                                        type="checkbox"
                                        name="rsm"
                                        checked={checkboxValues.rsm}
                                        onChange={handleCheckboxChange}
                                    />
                                    RSM
                                </div>
                                <div className="sm-individual-check">
                                    <input
                                        type="checkbox"
                                        name="setting"
                                        checked={checkboxValues.setting}
                                        onChange={handleCheckboxChange}
                                    />
                                    Settings
                                </div>
                            </div>
                            <div className="sm-check-boxes">
                                <div className="sm-individual-check">
                                    <input
                                        type="checkbox"
                                        name="po"
                                        checked={checkboxValues.po}
                                        onChange={handleCheckboxChange}
                                    />
                                    PO
                                </div>
                                <div className="sm-individual-check">
                                    <input
                                        type="checkbox"
                                        name="co"
                                        checked={checkboxValues.co}
                                        onChange={handleCheckboxChange}
                                    />
                                    CO
                                </div>
                                <div className="sm-individual-check">
                                    <input
                                        type="checkbox"
                                        name="so"
                                        checked={checkboxValues.so}
                                        onChange={handleCheckboxChange}
                                    />
                                    SO
                                </div>
                                <div className="sm-individual-check">
                                    <input
                                        type="checkbox"
                                        name="pso"
                                        checked={checkboxValues.pso}
                                        onChange={handleCheckboxChange}
                                    />
                                    PSO
                                </div>
                            </div>
                            <div className="sm-check-boxes">
                                <div className="sm-individual-check">
                                    <input
                                        type="checkbox"
                                        name="tutor"
                                        checked={checkboxValues.tutor}
                                        onChange={handleCheckboxChange}
                                    />
                                    Tutor
                                </div>
                                <div className="sm-individual-check">
                                    <input
                                        type="checkbox"
                                        name="hod"
                                        checked={checkboxValues.hod}
                                        onChange={handleCheckboxChange}
                                    />
                                    HOD
                                </div>
                                <div className="sm-individual-check">
                                    <input
                                        type="checkbox"
                                        name="report"
                                        checked={checkboxValues.report}
                                        onChange={handleCheckboxChange}
                                    />
                                    Report
                                </div>
                                <div className="sm-individual-check">
                                    <input
                                        type="checkbox"
                                        name="input"
                                        checked={checkboxValues.input}
                                        onChange={handleCheckboxChange}
                                    />
                                    Input
                                </div>
                            </div>
                            <div className="sm-check-boxes">
                                <div className="sm-individual-check">
                                    <input
                                        type="checkbox"
                                        name="manage"
                                        checked={checkboxValues.manage}
                                        onChange={handleCheckboxChange}
                                    />
                                    Manage
                                </div>
                            </div>
                            <button onClick={savenewstaff} className="sm-add-save-btn">SAVE</button>
                        </div>
                    </>
                )}
                {edit && (
                    <div className="sm-overlay">
                        <div className="sm-edit">
                            <div className="sm-close-class">
                                <span onClick={staffEditClose} className="sm-close">✖</span>
                            </div>
                            <input
                                type="text"
                                value={newstaffid}
                                onChange={(e) => setNewstaffid(e.target.value)}
                                className="sm-edit-inputbox"
                                placeholder={""}
                                disabled
                            />
                            <input
                                type="text"
                                value={newstaffname}
                                onChange={(e) => setNewstaffname(e.target.value)}
                                className="sm-edit-inputbox"
                                placeholder={""}
                            />
                            <input
                                type="text"
                                value={newdept}
                                onChange={(e) => setNewdept(e.target.value)}
                                className="sm-edit-inputbox"
                                placeholder={""}
                            />
                            <input
                                type="text"
                                value={newcategory}
                                onChange={(e) => setNewcategory(e.target.value)}
                                className="sm-edit-inputbox"
                                placeholder={""}
                            />
                            <div className="sm-edit-psw">
                                <label className="sm-edit-password">
                                    <span className="sm-edit-span"> Old Password :</span>
                                    <input
                                        type="text"
                                        value={oldpassword}
                                        onChange={(e) => setOldpassword(e.target.value)}
                                        className="sm-edit-inputbox-psw"
                                        placeholder={""}
                                        disabled
                                    />
                                </label>
                                <label className="sm-edit-password">
                                    <span className="sm-edit-span">New Password :</span>
                                    <input
                                        type="text"
                                        value={newpassword}
                                        onChange={(e) => setNewpassword(e.target.value)}
                                        className="sm-edit-inputbox-psw"
                                        defaultValue={""}
                                        placeholder={"New Password"}
                                    />
                                </label>
                            </div>
                            <button onClick={updatestaff} className="sm-save-edit-btn">SAVE</button>
                        </div>
                    </div>
                )}
            </div>
            {deletestaff && (
                <div className="sm-overlay">
                    <div className="sm-delete">
                        <div className="sm-close-class">
                            <span onClick={staffDeleteClose} className="sm-close">✖</span>
                        </div>
                        <h4>STAFF ID : {deletestaffid}</h4>
                        <h4>STAFF NAME : {deletestaffname}</h4>
                        <div className="sm-delete-btn-container">
                            <button onClick={staffDeleteClose}className="sm-save-btn">Cancel</button>
                            <button onClick={Confirmdelete}className="sm-save-btn">Confirm</button>
                        </div>
                    </div>
                </div>
            )}
            <div>
                <table className="sm-header">
                    <thead>
                        <tr>
                            <th className="sm-th-sno">S. No.</th>
                            <th className="sm-th-id">Staff Id</th>
                            <th className="sm-th-name">Staff Name</th>
                            <th className="sm-th-name">Dept Name</th>
                            <th className="sm-th-edit">Edit</th>
                            <th className="sm-th-delete">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((staff, index) => (
                            <tr key={index}className={index % 2 === 0 ? 'staff-repo-light' : 'staff-repo-dark'}>
                                <td className="sm-td-sno">{index + 1}</td>
                                <td className="sm-td-id">{staff.staff_id}</td>
                                <td className="sm-td-name">{staff.staff_name}</td>
                                <td className="sm-td-name">{staff.staff_dept}</td>
                                <td className="sm-td-edit">
                                    <button onClick={() => handleEdit(staff.staff_id, staff.staff_name, staff.staff_pass, staff.staff_dept, staff.category)} className="sm-edit-btn">
                                        <span className="sm-edit-btn">Edit &nbsp; <FontAwesomeIcon icon={faEdit} className="sm-icon" /></span>
                                    </button>
                                </td>
                                <td className="sm-td-delete">
                                    <button onClick={() => handleDelete(staff.staff_id,staff.staff_name)} className="sm-del-btn">
                                       <span className="sm-delete-btn">Delete &nbsp;<FontAwesomeIcon icon={faTrash} className="sm-icon" /></span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StaffMasterManage;