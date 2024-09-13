import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/login';
import Layout from './components/layout/layout';
import Dash from './components/dash/dash';
import CourseList from './components/courselist/courselist'
import Stumark from './components/stumark/stumark';
import UploadFile from './components/fileupload/fileupload';
import Report from './components/report/report';

function App() 
{
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="staff/:staffId/*" element={<Layout />} >
                    <Route path="dashboard" element={<Dash />} />
                    <Route path="courselist" element={<CourseList />} />
                    <Route path="studentmark" element={<Stumark />} />
                    <Route path="uploadfile" element={<UploadFile />} />
                    <Route path="report" element={<Report />} />
                </Route>
            </Routes>
        </Router >
    )
}

export default App;