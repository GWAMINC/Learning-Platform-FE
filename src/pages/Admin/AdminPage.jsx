import { useState } from "react";
import { FaBars, FaUser, FaChalkboard, FaBook } from "react-icons/fa";
import "./AdminPage.css";
import { useNavigate, Outlet } from "react-router-dom";

const AdminPage = () => {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    return (
        <div className="admin-container">
            {/* Sidebar */}
            <div className={`sidebar ${isOpen ? "" : "collapsed"}`}>
                {/* Toggle Button */}
                <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
                    <FaBars />
                </button>

                {/* Sidebar Menu */}
                <div className="menu">
                    <div className="menu-item" onClick={() => navigate("/admin/courses")}>
                        <div className="menu-title">
                            <FaBook />
                            {isOpen && <span>Course</span>}
                        </div>
                    </div>
                    <div className="menu-item" onClick={() => navigate("/admin/categories")}>
                        <div className="menu-title">
                            <FaBook />
                            {isOpen && <span>Categories</span>}
                        </div>
                    </div>
                </div>

                {/* Bottom Menu */}
                <div className="bottom-menu">
                    <hr className="divider-top" />
                    <div className="menu-item">
                        <FaChalkboard /> {isOpen && <span>Dashboard</span>}
                    </div>
                    <div className="menu-item">
                        <FaUser /> {isOpen && <span>Admin Profile</span>}
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminPage;
