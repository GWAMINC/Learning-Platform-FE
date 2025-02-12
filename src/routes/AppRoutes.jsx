import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage.jsx';
import UserPage from '../pages/UserPage';
import LoginRegister from "../pages/LoginRegister/LoginRegister.jsx";
import CoursesPage from "../pages/Courses/CoursesPage.jsx";
import CourseDetailPage from "../pages/Courses/CourseDetailPage.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user/:id" element={<UserPage />} />
            <Route path="/login" element={<LoginRegister />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courseDetail" element={<CourseDetailPage />} />
        </Routes>
    );
};

export default AppRoutes;