import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/login';
import Dash from './components/dash/dash';
import Layout from './components/layout/layout';
import Stumark from './components/stumark/stumark';

function App() 
{
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="staff/:staffId/*" element={<Layout />} >
                    <Route path="dashboard" element={<Dash />} />
                    <Route path="markpage" element={<Stumark />} />
                </Route>
            </Routes>
        </Router >
    )
}

export default App;