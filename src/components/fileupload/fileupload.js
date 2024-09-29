import React, { useState } from 'react';
import axios from 'axios';
import './fileupload.css';


function FileUpload() {
    const apiUrl = process.env.REACT_APP_API_URL;

    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);
    const [file4, setFile4] = useState(null);
    const [file5, setFile5] = useState(null);
    const [file6, setFile6] = useState(null);


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
        }

    };

    const handleUpload = async (e, file, endpoint) => {
        e.preventDefault();
        if (!file) {
            alert('PLEASE SELECT A FILE');
            return;
        }

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
        }
    };



    //Download Excel Format 

    const handleDownload = async () => {
        try {
            // Fetch staff data
            const staffResponse = await axios.get(`${apiUrl}/download/staff`, {
                responseType: 'blob', // Important for downloading files
            });

            // Fetch mark data
            const markResponse = await axios.get(`${apiUrl}/download/mark`, {
                responseType: 'blob', // Important for downloading files
            });

            // Create URLs for the blobs
            const staffUrl = window.URL.createObjectURL(new Blob([staffResponse.data]));
            const markUrl = window.URL.createObjectURL(new Blob([markResponse.data]));

            // Create download links for both files
            const staffLink = document.createElement('a');
            staffLink.href = staffUrl;
            staffLink.setAttribute('download', 'staff_data.xlsx'); // Name for the downloaded file
            document.body.appendChild(staffLink);
            staffLink.click();
            staffLink.remove();

            const markLink = document.createElement('a');
            markLink.href = markUrl;
            markLink.setAttribute('download', 'mark_data.xlsx'); // Name for the downloaded file
            document.body.appendChild(markLink);
            markLink.click();
            markLink.remove();
        } catch (error) {
            console.error('Download failed:', error);
            alert('Failed to download the files.');
        }
    };




    return (
        <div className='main-excelfile-container'>
            <div><h1>FILE UPLOADES</h1></div>

            <div className='parent-excelfile-container'>
                <div className='excelfile-container'>

                    <div className='file-container'>
                        <input type='file' name='file1' onChange={handleFileChange} />
                        <button className='upload' onClick={(e) => handleUpload(e, file1, 'upload1')}>Upload to Course Mapping</button>
                    </div>


                    <div className='file-container'>
                        <input type='file' name='file2' onChange={handleFileChange} />
                        <button className='upload' onClick={(e) => handleUpload(e, file2, 'upload2')}>Upload to Staff Master</button>
                        <button className='download' onClick={handleDownload}>Download Staff Data</button> {/* New Download Button */}
                    </div>



                    <input type='file' name='file3' onChange={handleFileChange} />
                    <button className='upload' onClick={(e) => handleUpload(e, file3, 'upload3')}>Upload to Student Master</button>

                    <input type='file' name='file4' onChange={handleFileChange} />
                    <button className='upload' onClick={(e) => handleUpload(e, file4, 'upload4')}>Upload to Scope</button>


                    <div className='file-container'>
                        <input type='file' name='file5' onChange={handleFileChange} />
                        <button className='upload' onClick={(e) => handleUpload(e, file5, 'upload5')}>Upload to Student Mark Entry</button>
                        <button className='download' onClick={handleDownload}>Download Mark Data</button> {/* New Download Button */}
                    </div>


                    <input type='file' name='file6' onChange={handleFileChange} />
                    <button className='upload' onClick={(e) => handleUpload(e, file6, 'upload6')}>Dept Mark Entry</button>
                </div>

            </div>
        </div>

    );
}

export default FileUpload;


