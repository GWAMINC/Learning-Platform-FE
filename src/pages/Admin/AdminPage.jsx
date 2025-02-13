import { useState } from "react";
import { FaBars, FaUser, FaChalkboard, FaBook, FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import "./AdminPage.css";
import {useNavigate, Outlet} from "react-router-dom";

const AdminPage = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isCourseOpen, setIsCourseOpen] = useState(false);
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
                <ul className="menu">
                    {/* Course Section */}
                    <li className="menu-item" onClick={() => navigate("/admin/courses")}>
                        <div className="menu-title" >
                            <FaBook />
                            {isOpen && <span>Course</span>}
                        </div>
                    </li>
                </ul>


                {/* Bottom Menu */}
                <ul className="menu bottom-menu">
                    <hr className="divider-top"/>
                    <li className="menu-item">
                        <FaChalkboard/> {isOpen && <span>Dashboard</span>}
                    </li>
                    <li className="menu-item">
                        <FaUser/> {isOpen && <span>Admin Profile</span>}
                    </li>
                </ul>
            </div>

            {/* Dropdown Course (Nổi ngoài sidebar) */}
            {/*{isCourseOpen && (*/}
            {/*    <div className="submenu-container show">*/}
            {/*        <ul className="submenu">*/}
            {/*            <li><FaPlus /> <span>Create Course</span></li>*/}
            {/*            <li><FaEye /> <span>View Courses</span></li>*/}
            {/*            <li><FaEdit /> <span>Edit Course</span></li>*/}
            {/*            <li><FaTrash /> <span>Delete Course</span></li>*/}
            {/*        </ul>*/}
            {/*    </div>*/}
            {/*)}*/}

            {/* Content Area */}
            <div className="content">
                <Outlet/>
            </div>
        </div>
    );
};

export default AdminPage;
