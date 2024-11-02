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
import Settings from './components/settings/settings';
import PrivateRoute from './components/login/authenticate/privaterouter';
import MarkRelease from './components/manage/markrelease/markrelease';
import DeptReport from './components/statusreport/deptreport/deptreport';
import StaffCourseManage from './components/manage/staffcoursemanage/staffcoursemanage';
import Rsmatrix from './components/rsmatrix/rsmatrix';
import Rsmatrixreport from './components/statusreport/rsmatrixreport/rsmatrixreport';
import StudentManage from './components/manage/studentmanage/studentmanage';
import Studentoutcome from './components/studentoutcome/studentoutcome';
import MarkManage from './components/manage/markmanage/markmanage';
import TutorReport from './components/tutorreport/tutorreport';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="staff/:staffId/*" element={<PrivateRoute element={<Layout />} />} >
                        <Route path="dashboard" element={<Dash />} />
                        <Route path="courselist" element={<CourseList />} />
                        <Route path="studentmark" element={<Stumark />} />
                        <Route path="inputfiles" element={<InputFile />} />
                        <Route path="statusreport" element={<StatusReport />} />
                        <Route path="matrixreport" element={<Rsmatrixreport />} />
                        <Route path="manage" element={<Manage />} />
                        <Route path="scopemanage" element={<ScopeManage />} />
                        <Route path="staffmanage" element={<StaffManage />} />
                        <Route path="studentmanage" element={<StudentManage />} />
                        <Route path="markrelease" element={<MarkRelease />} />
                        <Route path="markmanage" element={<MarkManage />} />
                        <Route path="rsmatrix" element={<Rsmatrix />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="staffcoursemapmanage" element={<StaffCourseManage />} />
                        <Route path=":dept/departmentreport" element={<DeptReport />} />
                        <Route path='studentoutcome' element={<Studentoutcome />} />
                        <Route path='classteacherreport' element={<TutorReport />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;