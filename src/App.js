import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/login';
import Dash from './components/dash/dash';

function App() 
{
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                {/* Add route with staffId parameter */}
                <Route path="/dashboard/:staffId" element={<Dash />} />
            </Routes>
        </Router>
    );
}

export default App;