import { useState } from "react";
import { FaSearch, FaHeart, FaShoppingCart, FaBell, FaStar } from "react-icons/fa";
import FilterBar from "./FilterBar";
import "./CoursesPage.css";

const categories = [
    "Web Development", "Data Science", "Machine Learning", "AI", "Mobile Development",
    "Game Development", "Cyber Security", "Cloud Computing", "Blockchain", "UI/UX Design"
];

const courses = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Khóa học ${i + 1}`,
    instructor: `Người đăng khóa ${i + 1}`,
    rating: Math.floor(Math.random() * 2) + 4, // Rating từ 4 đến 5 sao
    comments: Math.floor(Math.random() * 50) + 10,
    price: (Math.floor(Math.random() * 80) + 20) * 10000, // Giá từ 200,000 đến 1,000,000 VND
    thumbnail: `https://source.unsplash.com/300x200/?education,technology&sig=${i}`,
    duration: Math.floor(Math.random() * 20) + 10, // Thời lượng từ 10 đến 30 giờ
    lessons: Math.floor(Math.random() * 50) + 20 // Số bài học từ 20 đến 70
}));

const CoursesPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 10; // Số khóa học hiển thị trên mỗi trang

    // Tính toán số trang
    const totalPages = Math.ceil(courses.length / coursesPerPage);

    // Lấy danh sách khóa học cho trang hiện tại
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

    // Xử lý thay đổi trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="courses-page">
            {/* Toolbar */}
            <div className="toolbar">
                <div className="search-bar">
                    <FaSearch className="icon" />
                    <input type="text" placeholder="Tìm kiếm khóa học..." className="search-input" />
                </div>
                <div className="toolbar-icons">
                    <div className="icon-wrapper">
                        <FaHeart className="icon" />
                        <span className="badge">3</span>
                    </div>
                    <div className="icon-wrapper">
                        <FaShoppingCart className="icon" />
                        <span className="badge">5</span>
                    </div>
                    <div className="icon-wrapper">
                        <FaBell className="icon" />
                        <span className="badge">2</span>
                    </div>
                    <div className="avatar-wrapper">
                        <img src="https://source.unsplash.com/100x100/?portrait" alt="User Avatar" className="avatar" />
                        <div className="dropdown-menu">
                            <p>Hồ sơ</p>
                            <p>Cài đặt</p>
                            <p>Đăng xuất</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter */}
            <FilterBar
                categories={["All", ...categories]}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            {/* Danh sách khóa học */}
            <div className="courses-grid">
                {currentCourses.map(course => (
                    <div key={course.id} className="course-card">
                        <img src={course.thumbnail} alt={course.title} className="course-thumbnail" />
                        <h3>{course.title}</h3>
                        <p className="instructor">Giảng viên: {course.instructor}</p>
                        <p className="price">{course.price.toLocaleString()} VND</p>
                        <div className="rating">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={i < course.rating ? "star filled" : "star"} />
                            ))}
                            <span>({course.comments} bình luận)</span>
                        </div>
                        <div className="course-details">
                            <p>Thời lượng: {course.duration} giờ</p>
                            <p>Số bài học: {course.lessons}</p>
                            <button className="enroll-button">Đăng ký ngay</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
                <button
                    className="pagination-button prev-next"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    {"<"}
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        className={`pagination-button ${currentPage === i + 1 ? "active" : ""}`}
                        onClick={() => handlePageChange(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    className="pagination-button prev-next"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    {">"}
                </button>
            </div>
        </div>
    );
};

export default CoursesPage;