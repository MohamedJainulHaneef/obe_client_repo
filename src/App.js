import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/login/authenticate/authenticate';
import Login from './components/login/login';
import Layout from './components/layout/layout';
import Dash from './components/dash/dash';
import CourseList from './components/courselist/courselist';
import Stumark from './components/courselist/stumark/stumark';
import UploadFile from './components/fileupload/fileupload';
import Report from './components/report/report';
import Manage from './components/manage/manage';
import ScopeManage from './components/manage/scope/scope';
import StaffManage from './components/manage/staffmanage/staffmanage';
import PrivateRoute from './components/login/authenticate/privaterouter';
import ReportRelease from './components/manage/reportrelease/reportrelease';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="staff/:staffId/*" element={<PrivateRoute element={<Layout />} />}>
                        <Route path="dashboard" element={<Dash />} />
                        <Route path="courselist" element={<CourseList />} />
                        <Route path="studentmark" element={<Stumark />} />
                        <Route path="uploadfile" element={<UploadFile />} />
                        <Route path="report" element={<Report />} />
                        <Route path="manage" element={<Manage />}/>
                        <Route path="staffmanage" element={<StaffManage />} />
                        <Route path="scopemanage" element={<ScopeManage />} />
                        <Route path="reportrelease" element={<ReportRelease />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
