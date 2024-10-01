import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/login/authenticate/authenticate';
import Login from './components/login/login';
import Layout from './components/layout/layout';
import Dash from './components/dash/dash';
import CourseList from './components/courselist/courselist';
import Stumark from './components/courselist/stumark/stumark';
import UploadFile from './components/fileupload/fileupload';
import Report from './components/report/report';
import Setting from './components/settings/setting';
import StaffManage from './components/staff_manage/staffmanage';
import PrivateRoute from './components/login/authenticate/privaterouter';


function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    {/* Protect the staff routes with PrivateRoute */}
                    <Route path="staff/:staffId/*" element={<PrivateRoute element={<Layout />} />}>
                        <Route path="dashboard" element={<Dash />} />
                        <Route path="courselist" element={<CourseList />} />
                        <Route path="studentmark" element={<Stumark />} />
                        <Route path="uploadfile" element={<UploadFile />} />
                        <Route path="report" element={<Report />} />
                        <Route path="setting" element={<Setting />} />
                        <Route path='setting/setting/staffmanage' element={<StaffManage />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App;
