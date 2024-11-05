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
import StudentOutcome from './components/studentoutcome/studentoutcome';
import CourseOutcome from './components/courseoutcome/courseoutcome';
import MarkManage from './components/manage/markmanage/markmanage';
import TutorReport from './components/tutorreport/tutorreport';
import TutorStudent from './components/tutorreport/tutorstudent/tutorstudent';
import CourseStuOC from './components/studentoutcome/handlestuoutcome/handlestuoutcome';
import CourseCouOC from './components/courseoutcome/handlecououtcome/handlecououtcome';
import TutorCouOC from './components/courseoutcome/tutorcououtcome/tutorcououtcome';
import HodCouOC from './components/courseoutcome/hodcououtcome/hodcououtcome';
import AdminCouOC from './components/courseoutcome//admincououtcome/admincououtcome';

function App() 
{
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
                        <Route path="tutorstudentoutcome" element={<TutorStudent />} />
                        <Route path="studentmanage" element={<StudentManage />} />
                        <Route path="markrelease" element={<MarkRelease />} />
                        <Route path="markmanage" element={<MarkManage />} />
                        <Route path="rsmatrix" element={<Rsmatrix />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="staffcoursemapmanage" element={<StaffCourseManage />} />
                        <Route path=":dept/departmentreport" element={<DeptReport />} />
                        <Route path='studentoutcome' element={<StudentOutcome />} />
                        <Route path='courseoutcome' element={<CourseOutcome />} />
                        <Route path='classteacherreport' element={<TutorReport />} />
                        <Route path='coursestudentoutcome' element={<CourseStuOC />} />
                        <Route path='coursesoutcome' element={<CourseCouOC />} />
                        <Route path='tutorcourseoutcome' element={<TutorCouOC />} />
                        <Route path='hodcourseoutcome' element={<HodCouOC />} />
                        <Route path='admincourseoutcome' element={<AdminCouOC />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;