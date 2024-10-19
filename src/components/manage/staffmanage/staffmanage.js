import React, { useEffect, useState } from "react";
import './staffmanage.css';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function StaffManage() {
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

    const [checkboxValues, setCheckboxValues] = useState({
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

    const savenewstaff = async (e) => {

        e.preventDefault();
        if (!staffId || !staffName || !staffDept || !staffcategory || !staffpassword) {
            window.alert("All fields are Required");
            return;
        }
        window.alert("New staff Added");
        const newStaffData = {
            staff_id: staffId,
            staff_name: staffName,
            staff_dept: staffDept,
            category: staffcategory,
            password: staffpassword,
            permissions: checkboxValues
        }

        try {
            const newStaffResponce = await axios.post(`${apiUrl}/newstaff`, newStaffData);
            if (newStaffResponce.data) {
                console.log(newStaffResponce.data);
                setStaffData([...staffData, newStaffResponce.data]);
                setFilteredData([...staffData, newStaffResponce.data]);
                console.log(newStaffData);
            }
            setPopup(false);
        }
        catch (err) {
            console.log("Fetching error", err);
        }
        setStaffId("");
        setStaffName("");
        setStaffDept("");
        setPopup(false);
    }

    useEffect(() => {
        const staffDetails = async () => {
            try {
                const StaffResponse = await axios.get(`${apiUrl}/staffdetails`);
                if (StaffResponse.data) {
                    console.log(StaffResponse.data);
                    setStaffData(StaffResponse.data);
                    setFilteredData(StaffResponse.data);
                }
            }
            catch (err) {
                console.log('Error fetching data:', err);
            }
        }
        staffDetails();
    }, [apiUrl]);

    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();
        const filterList = staffData.filter((staff) =>
            staff.staff_id.toLowerCase().includes(searchText) ||
            staff.staff_name.toLowerCase().includes(searchText)
        )
        setFilteredData(filterList);
    }


    const handleEdit = (id, name, pass, dept, category) => {
        console.log("Edit staff with ID:", staffId);
        setNewstaffid(id);
        setNewstaffname(name);
        setOldpassword(pass);
        setNewdept(dept);
        setNewcategory(category);
        setNewpassword("")
        setEdit(true);
    }
    const editclose = () => {
        setEdit(false);
    }

    const updatestaff = async () => {

        try {
            const updateresponse = await axios.put(`${apiUrl}/staffupdate`, { newstaffid, newstaffname, newpassword, newdept, newcategory });
            if (updateresponse.data) {
                window.alert("Staff Data modified")
            }
            setEdit(false);
        }
        catch (err) {
            console.log("ERRO UPDATE STAFF", err)
        }
    }
    const handleDelete = (dstaffid,dstaffname) => {
        setDeletestaffid(dstaffid);
        setDeletestaffname(dstaffname);
        setDeletestaff(true);
    }
    const staffDeleteClose =()=>{
        setDeletestaff(false);
    }
    const Confirmdelete = async ()=>{
        try {
            const DeleteResponse = await axios.post(`${apiUrl}/staffdelete`,{deletestaffid});
            if(DeleteResponse.data){
                window.alert("Staff Delete")
                setDeletestaff(false);
            }
        }
        catch(err){
            window.alert("Error delete")
        }
    }

    return (
        <div className="staff-manage">
            <span className="staff-top-heading">STAFF DATA</span>
            <div className="staff-input-btn">
                <input className="staff-search"
                    type="text"
                    placeholder="Search by ID or NAME ..."
                    onChange={handleSearch}
                />
                <div>
                    <button className="staff-save-btn" onClick={showPopup}>ADD</button>
                    <button className="staff-save-btn">SAVE</button>
                </div>
                {popup && (
                    <>
                        <div className="staff-overlay" />
                        <div className="staff-addstaff">
                            <div className="staff-close-class">
                                <span className="staff-close-header">ADD STAFF</span>
                                <button onClick={hidepopup} className="staff-close">✖</button>
                            </div>
                            <div className="staff-addpopup">
                                <input
                                    type="text"
                                    value={staffId}
                                    onChange={(e) => setStaffId(e.target.value)}
                                    className="staff-inputs"
                                    placeholder="STAFF ID"
                                    required
                                />
                                <input
                                    type="text"
                                    value={staffName}
                                    onChange={(e) => setStaffName(e.target.value)}
                                    className="staff-inputs"
                                    placeholder="STAFF NAME"
                                    required
                                />
                                <input
                                    type="text"
                                    value={staffDept}
                                    onChange={(e) => setStaffDept(e.target.value)}
                                    className="staff-inputs"
                                    placeholder="STAFF DEPARTMENT"
                                />
                                <input
                                    type="text"
                                    value={staffcategory}
                                    onChange={(e) => setStaffcategory(e.target.value)}
                                    className="staff-inputs"
                                    placeholder="CATEGORY"
                                />
                                <input
                                    type="text"
                                    value={staffpassword}
                                    onChange={(e) => setStaffpassword(e.target.value)}
                                    className="staff-inputs"
                                    placeholder="PASSWORD"
                                />
                            </div>
                            <div className="staff-check-boxes">
                                <div className="staff-individual-check">
                                    <input
                                        type="checkbox"
                                        name="dashboard"
                                        checked={checkboxValues.dashboard}
                                        onChange={handleCheckboxChange}
                                    />
                                    Dashboard
                                </div>
                                <div className="staff-individual-check">
                                    <input
                                        type="checkbox"
                                        name="course"
                                        checked={checkboxValues.course}
                                        onChange={handleCheckboxChange}
                                    />
                                    Course
                                </div>
                                <div className="staff-individual-check">
                                    <input
                                        type="checkbox"
                                        name="rsm"
                                        checked={checkboxValues.rsm}
                                        onChange={handleCheckboxChange}
                                    />
                                    RSM
                                </div>
                                <div className="staff-individual-check">
                                    <input
                                        type="checkbox"
                                        name="setting"
                                        checked={checkboxValues.setting}
                                        onChange={handleCheckboxChange}
                                    />
                                    Settings
                                </div>

                            </div>
                            <div className="staff-check-boxes">
                            <div className="staff-individual-check">
                                    <input
                                        type="checkbox"
                                        name="po"
                                        checked={checkboxValues.po}
                                        onChange={handleCheckboxChange}
                                    />
                                    PO
                                </div>
                                <div className="staff-individual-check">
                                    <input
                                        type="checkbox"
                                        name="co"
                                        checked={checkboxValues.co}
                                        onChange={handleCheckboxChange}
                                    />
                                    CO
                                </div>
                                <div className="staff-individual-check">
                                    <input
                                        type="checkbox"
                                        name="so"
                                        checked={checkboxValues.so}
                                        onChange={handleCheckboxChange}
                                    />
                                    SO
                                </div>
                                <div className="staff-individual-check">
                                    <input
                                        type="checkbox"
                                        name="pso"
                                        checked={checkboxValues.pso}
                                        onChange={handleCheckboxChange}
                                    />
                                    PSO
                                </div>
                            </div>
                            <div className="staff-check-boxes">
                            <div className="staff-individual-check">
                                    <input
                                        type="checkbox"
                                        name="tutor"
                                        checked={checkboxValues.tutor}
                                        onChange={handleCheckboxChange}
                                    />
                                    Tutor
                                </div>
                                <div className="staff-individual-check">
                                    <input
                                        type="checkbox"
                                        name="hod"
                                        checked={checkboxValues.hod}
                                        onChange={handleCheckboxChange}
                                    />
                                    HOD
                                </div>
                                <div className="staff-individual-check">
                                    <input
                                        type="checkbox"
                                        name="report"
                                        checked={checkboxValues.report}
                                        onChange={handleCheckboxChange}
                                    />
                                    Report
                                </div>
                                <div className="staff-individual-check">
                                    <input
                                        type="checkbox"
                                        name="input"
                                        checked={checkboxValues.input}
                                        onChange={handleCheckboxChange}
                                    />
                                    Input
                                </div>
                            </div>
                            <div className="staff-check-boxes">
                                <div className="staff-individual-check">
                                    <input
                                        type="checkbox"
                                        name="manage"
                                        checked={checkboxValues.manage}
                                        onChange={handleCheckboxChange}
                                    />
                                    Manage
                                </div>
                            </div>
                            <button onClick={savenewstaff} className="staff-add-save-btn">SAVE</button>
                        </div>
                    </>
                )}
                {edit && (

                    <div className="staff-edit">
                        <span onClick={editclose} className="edit_close">✖</span>
                        <input
                            type="text"
                            value={newstaffid}
                            onChange={(e) => setNewstaffid(e.target.value)}
                            className=""
                            placeholder={""}
                            disabled
                        />  <br />
                        <input
                            type="text"
                            value={newstaffname}
                            onChange={(e) => setNewstaffname(e.target.value)}
                            className=""
                            placeholder={""}
                        />  <br />

                        <input
                            type="text"
                            value={newdept}
                            onChange={(e) => setNewdept(e.target.value)}
                            className=""
                            placeholder={""}
                        />  <br />
                        <input
                            type="text"
                            value={newcategory}
                            onChange={(e) => setNewcategory(e.target.value)}
                            className=""
                            placeholder={""}
                        />  <br />
                        <label>Old Password</label>

                        <input
                            type="text"
                            value={oldpassword}
                            onChange={(e) => setOldpassword(e.target.value)}
                            className=""
                            placeholder={""}
                            disabled
                        />  <br />
                        <label>New Password</label>
                        <input
                            type="text"
                            value={newpassword}
                            onChange={(e) => setNewpassword(e.target.value)}
                            className=""
                            defaultValue={""}
                            placeholder={"New"}
                        /><br />
                        <button onClick={updatestaff}>Save</button>
                    </div>
                )}
            </div>
            { deletestaff && (
                <div className="staff-edit">
                    <span onClick={staffDeleteClose} className="edit_close">✖</span>
                    <h4>STAFF ID : {deletestaffid}</h4>
                    <h4>STAFF NAME : {deletestaffname}</h4>
                    <button onClick={staffDeleteClose}>Cancel</button>
                    <button onClick={Confirmdelete}>Confirm</button>
                </div>
            )}
            <div>
                <table className="staff-header">
                    <thead>
                        <tr>
                            <th className="staff-th-sno">S. No.</th>
                            <th className="staff-th-id">Staff Id</th>
                            <th className="staff-th-name">Staff Name</th>
                            <th className="staff-th-edit">Edit</th>
                            <th className="staff-th-delete">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((staff, index) => (
                            <tr key={index} className="staff-map-row">
                                <td className="staff-td-sno">{index + 1}</td>
                                <td className="staff-td-id">{staff.staff_id}</td>
                                <td className="staff-td-name">{staff.staff_name}</td>
                                <td className="staff-td-edit">
                                    <button onClick={() => handleEdit(staff.staff_id, staff.staff_name, staff.staff_pass, staff.staff_dept, staff.category)} className="staff-btns">
                                        <FontAwesomeIcon icon={faEdit} className="staff-icon" />
                                        <span className="staff-span">Edit</span>
                                    </button>
                                </td>
                                <td className="staff-td-delete">
                                    <button onClick={() => handleDelete(staff.staff_id,staff.staff_name)} className="staff-btns">
                                        <FontAwesomeIcon icon={faTrash} className="staff-icon" />
                                        <span className="staff-span">Delete</span>
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

export default StaffManage;
