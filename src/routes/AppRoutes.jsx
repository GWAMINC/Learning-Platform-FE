import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage.jsx';
import UserPage from '../pages/UserPage';
import LoginRegister from "../pages/LoginRegister/LoginRegister.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user/:id" element={<UserPage />} />
            <Route path="/login" element={<LoginRegister />} />
        </Routes>
    );
};

export default AppRoutes;