import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/login';
import Dash from './components/dash/dash';
import Layout from './components/layout/layout';
import Mark from './components/mark/mark';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/staff/:staffId/*" element={<Layout />} >
                    <Route path="dashboard" element={<Dash />} />
                    <Route path="markpage" element={<Mark />} />
                </Route>
            </Routes>
        </Router >
    )
}

export default App;