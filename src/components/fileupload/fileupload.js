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




    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'file1') {
            setFile1(files[0]);
        } else if (name === 'file2') {
            setFile2(files[0]);
        } else if (name === 'file3') {
            setFile3(files[0]);
        } else if (name === 'file4') {
            setFile4(files[0]);
        } else if (name === 'file5') {
            setFile5(files[0]);
        } else if (name === 'file6') {
            setFile6(files[0]);
        } else if (name === 'file7') {
            setFile7(files[0]);
        }

    };

    const handleUpload = async (e, file, endpoint) => {
        e.preventDefault();
        if (!file) {
            alert('Please Select a File');
            return;
        }

        setLoading(true); // Start loading
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post(`${apiUrl}/${endpoint}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(res.data);
        } catch (error) {
            console.log(error);
            alert('FILE UPLOAD FAILED');
        }finally {
            setLoading(false); // Stop loading
        }
    };

    const LoadingModal = ({ loading }) => {
        if (!loading) return null;
    
        return (
            <div className="loading-modal">
                <div className="loading-content">
                    <h2>Loading...</h2>
                    <div className="loader"></div> {/* Loader div */}
                </div>
            </div>
        );
    };




    //Download Excel Format 

    const handleDownload = async (e, fileType) => {
        e.preventDefault(); // Prevent default button behavior

        try {
            let response;
            let fileName;

            switch (fileType) {
                case 'staff':
                    response = await axios.get(`${apiUrl}/download/staff`, {
                        responseType: 'blob', // Important for downloading files
                    });
                    fileName = 'staff_data.xlsx';
                    break;

                case 'mark':
                    response = await axios.get(`${apiUrl}/download/mark`, {
                        responseType: 'blob',
                    });
                    fileName = 'mark_data.xlsx';
                    break;

                case 'report':
                    response = await axios.get(`${apiUrl}/download/report`, {
                        responseType: 'blob',
                    });
                    fileName = 'report_data.xlsx';
                    break;

                default:
                    throw new Error('Invalid file type');
            }

            // Create a URL for the blob
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Create a download link
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName); // Name for the downloaded file
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Download failed:', error);
            alert('Failed to download the file.');
        }
    };




    return (
        <div className='main-excelfile-container'>
            <div><h1>FILE UPLOADES</h1></div>

            <div className='parent-excelfile-container'>
            <LoadingModal loading={loading} />

                <div className='excelfile-container'>

                    <div className='file-container'>
                        <input type='file' name='file1' onChange={handleFileChange} />
                        <button className='upload' onClick={(e) => handleUpload(e, file1, 'upload1')}>Upload to Course Mapping</button>
                    </div>


                    <div className='file-container'>
                        <input type='file' name='file2' onChange={handleFileChange} />
                        <button className='upload' onClick={(e) => handleUpload(e, file2, 'upload2')}>Upload to Staff Master</button>
                        <button className='download' onClick={(e) => handleDownload(e, 'staff')}>Download Staff Data</button> {/* New Download Button */}
                    </div>



                    <input type='file' name='file3' onChange={handleFileChange} />
                    <button className='upload' onClick={(e) => handleUpload(e, file3, 'upload3')}>Upload to Student Master</button>

                    <input type='file' name='file4' onChange={handleFileChange} />
                    <button className='upload' onClick={(e) => handleUpload(e, file4, 'upload4')}>Upload to Scope</button>


                    <div className='file-container'>
                        <input type='file' name='file5' onChange={handleFileChange} />
                        <button className='upload' onClick={(e) => handleUpload(e, file5, 'upload5')}>Upload to Student Mark Entry</button>
                        <button className='download' onClick={(e) => handleDownload(e, 'mark')}>Download Mark Data</button> {/* New Download Button */}
                    </div>


                    <input type='file' name='file6' onChange={handleFileChange} />
                    <button className='upload' onClick={(e) => handleUpload(e, file6, 'upload6')}>Dept Mark Entry</button>

                    <div className='file-container'>
                        <input type='file' name='file7' onChange={handleFileChange} />
                        <button className='upload' onClick={(e) => handleUpload(e, file7, 'upload7')}>Upload Report</button>
                        <button className='download' onClick={(e) => handleDownload(e, 'report')}>Download Report Data</button> {/* New Download Button */}
                    </div>
                </div>



            </div>
        </div>

    );
}

export default FileUpload;


