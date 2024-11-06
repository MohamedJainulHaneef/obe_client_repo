import React, { useState } from 'react';
import axios from 'axios';
import './fileupload.css';

function FileUpload() {
    const apiUrl = process.env.REACT_APP_API_URL;

    const [loading, setLoading] = useState(false);
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);
    const [file4, setFile4] = useState(null);
    const [file5, setFile5] = useState(null);
    const [file6, setFile6] = useState(null);
    const [file7, setFile7] = useState(null);
    const [file8, setFile8] = useState(null);
    const [file9, setFile9] = useState(null);

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'file1') {
            setFile1(files[0]);
        }
        else if (name === 'file2') {
            setFile2(files[0]);
        }
        else if (name === 'file3') {
            setFile3(files[0]);
        }
        else if (name === 'file4') {
            setFile4(files[0]);
        }
        else if (name === 'file5') {
            setFile5(files[0]);
        }
        else if (name === 'file6') {
            setFile6(files[0]);
        }
        else if (name === 'file7') {
            setFile7(files[0]);
        }
        else if (name === 'file8') {
            setFile8(files[0]);
        }
        else if (name === 'file9') {
            setFile9(files[0]);
        }
    };

    const handleUpload = async (e, file, endpoint) => 
    {
        e.preventDefault();
        if (!file) {
            alert('Please Select a File');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post(`${apiUrl}/api/${endpoint}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(res.data);
        }
        catch (error) {
            console.log(error);
            alert('File Upload Failed');
        }
        finally {
            setLoading(false);
        }
    }

    const LoadingModal = ({ loading }) => {
        if (!loading) return null;
        return (
            <div className="file-loading-modal">
                <div className="file-loading-content">
                    <h2>Loading ...</h2>
                    <div className="file-loader"></div>
                </div>
            </div>
        );
    };

    const handleDownload = async (e, fileType) => {
        e.preventDefault();
        try {
            let response;
            let fileName;
            switch (fileType) {
                case 'coursemap':
                    response = await axios.get(`${apiUrl}/api/download/coursemap`, {
                        responseType: 'blob',
                    });
                    fileName = 'Course Mapping Data.xlsx';
                    break;

                case 'staff':
                    response = await axios.get(`${apiUrl}/api/download/staff`, {
                        responseType: 'blob',
                    });
                    fileName = 'Staff Master Data.xlsx';
                    break;

                case 'studentmaster':
                    response = await axios.get(`${apiUrl}/api/download/studentmaster`, {
                        responseType: 'blob',
                    });
                    fileName = 'Student Master Data.xlsx';
                    break;

                case 'scope':
                    response = await axios.get(`${apiUrl}/api/download/scope`, {
                        responseType: 'blob',
                    });
                    fileName = 'Scope Data.xlsx';
                    break;

                case 'mark':
                    response = await axios.get(`${apiUrl}/api/download/mark`, {
                        responseType: 'blob',
                    });
                    fileName = 'Mark Entry Data.xlsx';
                    break;

                case 'deptmarkentry':
                    response = await axios.get(`${apiUrl}/api/download/deptmarkentry`, {
                        responseType: 'blob',
                    });
                    fileName = 'Dept Mark Entry Data.xlsx';
                    break;

                case 'report':
                    response = await axios.get(`${apiUrl}/api/download/report`, {
                        responseType: 'blob',
                    });
                    fileName = 'Status Report.xlsx';
                    break;

                case 'mentor':
                    response = await axios.get(`${apiUrl}/api/download/mentor`, {
                        responseType: 'blob',
                    });
                    fileName = 'Mentor Report.xlsx';
                    break;

                case 'hod':
                    response = await axios.get(`${apiUrl}/api/download/hod`, {
                        responseType: 'blob',
                    });
                    fileName = 'Hod Report.xlsx';
                    break;

                default:
                    throw new Error('Invalid file type');
            }

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
        catch (error) {
            console.error('Download Failed:', error);
            alert('Failed to Download the File.');
        }
    };

    return (
        <div className='file-wrapper'>
            <div>
                <h2>FILE UPLOADS</h2>
            </div>
            <div className='file-content'>
                <LoadingModal loading={loading} />
                <div className='file-div'>
                    <div className='file-container'>
                        <input type='file' name='file2' onChange={handleFileChange} />
                        <button className='file-upload-btn' onClick={(e) => handleUpload(e, file2, 'staffmaster')}>Upload to Staff Master</button>
                        <button className='file-download-btn' onClick={(e) => handleDownload(e, 'staff')}>Download Staff Master</button>
                    </div>
                    <div className='file-container'>
                        <input type='file' name='file3' onChange={handleFileChange} />
                        <button className='file-upload-btn' onClick={(e) => handleUpload(e, file3, 'studentmaster')}>Upload to Student Master</button>
                        <button className='file-download-btn' onClick={(e) => handleDownload(e, 'studentmaster')}>Download Student Master</button>
                    </div>
                    <div className='file-container'>
                        <input type='file' name='file1' onChange={handleFileChange} />
                        <button className='file-upload-btn' onClick={(e) => handleUpload(e, file1, 'coursemapping')}>Upload to Course Mapping</button>
                        <button className='file-download-btn' onClick={(e) => handleDownload(e, 'coursemap')}>Download Course Mapping</button>
                    </div>
                    <div className='file-container'>
                        <input type='file' name='file5' onChange={handleFileChange} />
                        <button className='file-upload-btn' onClick={(e) => handleUpload(e, file5, 'markentry')}>Upload to Mark Entry</button>
                        <button className='file-download-btn' onClick={(e) => handleDownload(e, 'mark')}>Download Mark Entry</button>
                    </div>
                    <div className='file-container'>
                        <input type='file' name='file4' onChange={handleFileChange} />
                        <button className='file-upload-btn' onClick={(e) => handleUpload(e, file4, 'scope')}>Upload to Scope</button>
                        <button className='file-download-btn' onClick={(e) => handleDownload(e, 'scope')}>Download Scope</button>
                    </div>
                    {/* <div className='file-container'>
                        <input type='file' name='file6' onChange={handleFileChange} />
                        <button className='file-upload-btn' onClick={(e) => handleUpload(e, file6, 'deptmarkentry')}>Upload to Dept Mark</button>
                        <button className='file-download-btn' onClick={(e) => handleDownload(e, 'deptmarkentry')}>Download Dept Mark </button>
                    </div> */}
                    <div className='file-container'>
                        <input type='file' name='file7' onChange={handleFileChange} />
                        <button className='file-upload-btn' onClick={(e) => handleUpload(e, file7, 'report')}>Upload to Report</button>
                        <button className='file-download-btn' onClick={(e) => handleDownload(e, 'report')}>Download Report</button>
                    </div>
                    <div className='file-container'>
                        <input type='file' name='file8' onChange={handleFileChange} />
                        <button className='file-upload-btn' onClick={(e) => handleUpload(e, file8, 'mentor')}>Upload to Mentor</button>
                        <button className='file-download-btn' onClick={(e) => handleDownload(e, 'mentor')}>Download Mentor</button>
                    </div>
                    <div className='file-container'>
                        <input type='file' name='file9' onChange={handleFileChange} />
                        <button className='file-upload-btn' onClick={(e) => handleUpload(e, file9, 'hod')}>Upload to Hod</button>
                        <button className='file-download-btn' onClick={(e) => handleDownload(e, 'hod')}>Download Hod</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FileUpload;