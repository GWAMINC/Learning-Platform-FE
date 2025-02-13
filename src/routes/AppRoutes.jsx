import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage.jsx';
import UserPage from '../pages/UserPage';
import LoginRegister from "../pages/LoginRegister/LoginRegister.jsx";
import CoursesPage from "../pages/Courses/CoursesPage.jsx";
import CourseDetailPage from "../pages/Courses/CourseDetailPage.jsx";
import AdminPage from "../pages/Admin/AdminPage.jsx";
import List from "../pages/Admin/Courses/List.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user/:id" element={<UserPage />} />
            <Route path="/login" element={<LoginRegister />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courseDetail" element={<CourseDetailPage />} />
            <Route path="/admin" element={<AdminPage />}>
                <Route path="courses" element={<List />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;