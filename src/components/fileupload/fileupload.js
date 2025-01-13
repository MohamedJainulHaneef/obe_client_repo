import React, { useState } from 'react';
import axios from 'axios';
import './fileupload.css';

function FileUpload() 
{
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
    const [file10, setFile10] = useState(null);
    const [file11, setFile11] = useState(null);
    const [file12, setFile12] = useState(null);

    const handleFileChange = (e) => 
    {
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
        else if (name === 'file10') {
            setFile10(files[0]);
        }
        else if (name === 'file11') {
            setFile11(files[0]);
        }
        else if (name === 'file12') {
            setFile12(files[0]);
        }
    }

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
        )
    }

    const handleDownload = async (e, fileType) => 
    {
        e.preventDefault();
        try 
        {
            let response;
            let fileName;
            switch (fileType) 
            {
                case 'coursemap':
                    response = await axios.get(`${apiUrl}/api/download/coursemap`, {
                        responseType: 'blob',
                    });
                    fileName = 'Course Mapping Data.xlsx';
                    break;

                case 'coursemapmodel':
                    response = await axios.get(`${apiUrl}/api/download/coursemapmodel`, {
                        responseType: 'blob',
                    });
                    fileName = 'Course Mapping Model.xlsx';
                    break;

                case 'staff':
                    response = await axios.get(`${apiUrl}/api/download/staff`, {
                        responseType: 'blob',
                    });
                    fileName = 'Staff Master Data.xlsx';
                    break;

                case 'staffmodel':
                    response = await axios.get(`${apiUrl}/api/download/staffmodel`, {
                        responseType: 'blob',
                    });
                    fileName = 'Staff Master Model.xlsx';
                    break;


                case 'studentmaster':
                    response = await axios.get(`${apiUrl}/api/download/studentmaster`, {
                        responseType: 'blob',
                    });
                    fileName = 'Student Master Data.xlsx';
                    break;

                case 'studentmastermodel':
                    response = await axios.get(`${apiUrl}/api/download/studentmastermodel`, {
                        responseType: 'blob',
                    });
                    fileName = 'Student Master Model.xlsx';
                    break;

                case 'scope':
                    response = await axios.get(`${apiUrl}/api/download/scope`, {
                        responseType: 'blob',
                    });
                    fileName = 'Scope Data.xlsx';
                    break;

                case 'scopemodel':
                    response = await axios.get(`${apiUrl}/api/download/scopemodel`, {
                        responseType: 'blob',
                    });
                    fileName = 'Scope Data Model.xlsx';
                    break;

                case 'mark':
                    response = await axios.get(`${apiUrl}/api/download/mark`, {
                        responseType: 'blob',
                    });
                    fileName = 'Mark Entry Data.xlsx';
                    break;

                case 'markmodel':
                    response = await axios.get(`${apiUrl}/api/download/markmodel`, {
                        responseType: 'blob',
                    });
                    fileName = 'Mark Entry Data Model.xlsx';
                    break;

                case 'ese':
                    response = await axios.get(`${apiUrl}/api/download/ese`, {
                        responseType: 'blob',
                    });
                    fileName = 'ESE Mark Entry Data.xlsx';
                    break;

                case 'esemodel':
                    response = await axios.get(`${apiUrl}/api/download/esemodel`, {
                        responseType: 'blob',
                    });
                    fileName = 'ESE Mark Entry Model.xlsx';
                    break;

                case 'report':
                    response = await axios.get(`${apiUrl}/api/download/report`, {
                        responseType: 'blob',
                    });
                    fileName = 'Status Report.xlsx';
                    break;

                case 'reportmodel':
                    response = await axios.get(`${apiUrl}/api/download/reportmodel`, {
                        responseType: 'blob',
                    });
                    fileName = 'Status Report Model.xlsx';
                    break;

                case 'mentor':
                    response = await axios.get(`${apiUrl}/api/download/mentor`, {
                        responseType: 'blob',
                    });
                    fileName = 'Mentor Report.xlsx';
                    break;

                case 'mentormodel':
                    response = await axios.get(`${apiUrl}/api/download/mentormodel`, {
                        responseType: 'blob',
                    });
                    fileName = 'Mentor Report Model.xlsx';
                    break;

                case 'hod':
                    response = await axios.get(`${apiUrl}/api/download/hod`, {
                        responseType: 'blob',
                    });
                    fileName = 'Hod Report.xlsx';
                    break;

                case 'hodmodel':
                    response = await axios.get(`${apiUrl}/api/download/hodmodel`, {
                        responseType: 'blob',
                    });
                    fileName = 'Hod Report Model.xlsx';
                    break;

                case 'calculation':
                    response = await axios.get(`${apiUrl}/api/download/calculation`, {
                        responseType: 'blob',
                    });
                    fileName = 'Calculation Report.xlsx';
                    break;

                case 'calculationmodel':
                    response = await axios.get(`${apiUrl}/api/download/calculationmodel`, {
                        responseType: 'blob',
                    });
                    fileName = 'Calculation Report Model.xlsx';
                    break;

                case 'rsmatrix':
                    response = await axios.get(`${apiUrl}/api/download/rsmatrix`, {
                        responseType: 'blob',
                    });
                    fileName = 'Rsmatrix Report.xlsx';
                    break;

                case 'rsmatrixmodel':
                    response = await axios.get(`${apiUrl}/api/download/rsmatrixmodel`, {
                        responseType: 'blob',
                    });
                    fileName = 'Rsmatrix Report Model.xlsx';
                    break;

                case 'academic':
                    response = await axios.get(`${apiUrl}/api/download/academic`, {
                        responseType: 'blob',
                    });
                    fileName = 'Academic Report.xlsx';
                    break;

                case 'academicmodel':
                    response = await axios.get(`${apiUrl}/api/download/academicmodel`, {
                        responseType: 'blob',
                    });
                    fileName = 'Academic Report Model.xlsx';
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
    }

    return (
        <div className='file-wrapper'>
            <h2>FILE UPLOADS</h2>
            <div className='file-content'>
                <LoadingModal loading={loading} />
                <div className='file-header'>
                    <p className='file-para'></p>
                    <p className='file-para'>UPLOAD</p>
                    <p className='file-para'>DOWNLOAD</p>
                    <p className='file-para'>SAMPLE</p>
                </div>
                <div className='file-container'>
                    <input type='file' name='file2' onChange={handleFileChange} />
                    <button className='file-upload-btn' onClick={(e) => handleUpload(e, file2, 'staffmaster')}>Staff Master</button>
                    <button className='file-download-btn' onClick={(e) => handleDownload(e, 'staff')}>Staff Master</button>
                    <button className='file-model-btn' onClick={(e) => handleDownload(e, 'staffmodel')}>Staff Master</button>
                </div>
                <div className='file-container'>
                    <input type='file' name='file1' onChange={handleFileChange} />
                    <button className='file-upload-btn' onClick={(e) => handleUpload(e, file1, 'coursemapping')}>Staff Course Mapping</button>
                    <button className='file-download-btn' onClick={(e) => handleDownload(e, 'coursemap')}>Staff Course Mapping</button>
                    <button className='file-model-btn' onClick={(e) => handleDownload(e, 'coursemapmodel')}>Staff Course Mapping</button>
                </div>
                <div className='file-container'>
                    <input type='file' name='file3' onChange={handleFileChange} />
                    <button className='file-upload-btn' onClick={(e) => handleUpload(e, file3, 'studentmaster')}>Student Master</button>
                    <button className='file-download-btn' onClick={(e) => handleDownload(e, 'studentmaster')}>Student Master</button>
                    <button className='file-model-btn' onClick={(e) => handleDownload(e, 'studentmastermodel')}>Student Master</button>
                </div>
                <div className='file-container'>
                    <input type='file' name='file5' onChange={handleFileChange} />
                    <button className='file-upload-btn' onClick={(e) => handleUpload(e, file5, 'markentry')}>Student Course Mapping</button>
                    <button className='file-download-btn' onClick={(e) => handleDownload(e, 'mark')}>Student Course Mapping</button>
                    <button className='file-model-btn' onClick={(e) => handleDownload(e, 'markmodel')}>Student Course Mapping</button>
                </div>
                <div className='file-container'>
                    <input type='file' name='file9' onChange={handleFileChange} />
                    <button className='file-upload-btn' onClick={(e) => handleUpload(e, file9, 'hod')}>HOD</button>
                    <button className='file-download-btn' onClick={(e) => handleDownload(e, 'hod')}>HOD</button>
                    <button className='file-model-btn' onClick={(e) => handleDownload(e, 'hodmodel')}>HOD</button>
                </div>
                <div className='file-container'>
                    <input type='file' name='file8' onChange={handleFileChange} />
                    <button className='file-upload-btn' onClick={(e) => handleUpload(e, file8, 'mentor')}>Mentor</button>
                    <button className='file-download-btn' onClick={(e) => handleDownload(e, 'mentor')}>Mentor</button>
                    <button className='file-model-btn' onClick={(e) => handleDownload(e, 'mentormodel')}>Mentor</button>
                </div>
                <div className='file-container'>
                    <input type='file' name='file6' onChange={handleFileChange} />
                    <button className='file-upload-btn' onClick={(e) => handleUpload(e, file6, 'ese')}>ESE Mark</button>
                    <button className='file-download-btn' onClick={(e) => handleDownload(e, 'ese')}>ESE Mark</button>
                    <button className='file-model-btn' onClick={(e) => handleDownload(e, 'esemodel')}>ESE Mark</button>
                </div>
                {/* <div className='file-container'>
                    <input type='file' name='file4' onChange={handleFileChange} />
                    <button className='file-upload-btn' onClick={(e) => handleUpload(e, file4, 'scope')}>Scope</button>
                    <button className='file-download-btn' onClick={(e) => handleDownload(e, 'scope')}>Scope</button>
                    <button className='file-model-btn' onClick={(e) => handleDownload(e, 'scopemodel')}>Scope</button>
                </div> */}
                {/* <div className='file-container'>
                    <input type='file' name='file7' onChange={handleFileChange} />
                    <button className='file-upload-btn' onClick={(e) => handleUpload(e, file7, 'report')}>Report</button>
                    <button className='file-download-btn' onClick={(e) => handleDownload(e, 'report')}>Report</button>
                    <button className='file-model-btn' onClick={(e) => handleDownload(e, 'reportmodel')}>Report</button>
                </div> */}
                {/* <div className='file-container'>
                    <input type='file' name='file10' onChange={handleFileChange} />
                    <button className='file-upload-btn' onClick={(e) => handleUpload(e, file10, 'calculation')}>Calculation</button>
                    <button className='file-download-btn' onClick={(e) => handleDownload(e, 'calculation')}>Calculation</button>
                    <button className='file-model-btn' onClick={(e) => handleDownload(e, 'calculationmodel')}>Calculation</button>
                </div> */}
                <div className='file-container'>
                    <input type='file' name='file11' onChange={handleFileChange} />
                    <button className='file-upload-btn' onClick={(e) => handleUpload(e, file11, 'rsmatrix')}>RS Matrix</button>
                    <button className='file-download-btn' onClick={(e) => handleDownload(e, 'rsmatrix')}>RS Matrix</button>
                    <button className='file-model-btn' onClick={(e) => handleDownload(e, 'rsmatrixmodel')}>RS Matrix</button>
                </div>
                {/* <div className='file-container'>
                    <input type='file' name='file12' onChange={handleFileChange} />
                    <button className='file-upload-btn' onClick={(e) => handleUpload(e, file12, 'academic')}>Academic</button>
                    <button className='file-download-btn' onClick={(e) => handleDownload(e, 'academic')}>Academic</button>
                    <button className='file-model-btn' onClick={(e) => handleDownload(e, 'academicmodel')}>Academic</button>
                </div> */} 
            </div>
        </div>
    )
}

export default FileUpload;