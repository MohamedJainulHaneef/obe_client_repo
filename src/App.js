import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/login/authenticate/authenticate';
import Login from './components/login/login';
import Layout from './components/layout/layout';
import Dash from './components/dash/dash';
import CourseList from './components/courselist/courselist';
import Stumark from './components/courselist/stumark/stumark';
import InputFile from './components/fileupload/fileupload';
import StatusReport from './components/statusreport/statusreport';
import Manage from './components/manage/manage';
import ScopeManage from './components/manage/scopemanage/scopemanage';
import StaffManage from './components/manage/staffmanage/staffmanage';
import PrivateRoute from './components/login/authenticate/privaterouter';
import MarkRelease from './components/manage/markrelease/markrelease';

function App() 
{
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="staff/:staffId/*" element={<PrivateRoute element={<Layout />} />}>
                        <Route path="dashboard" element={<Dash />} />
                        <Route path="courselist" element={<CourseList />} />
                        <Route path="studentmark" element={<Stumark />} />
                        <Route path="inputfiles" element={<InputFile />} />
                        <Route path="statusreport" element={<StatusReport />} />
                        <Route path="manage" element={<Manage />}/>
                        <Route path="staffmanage" element={<StaffManage />} />
                        <Route path="scopemanage" element={<ScopeManage />} />
                        <Route path="markrelease" element={<MarkRelease />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App;