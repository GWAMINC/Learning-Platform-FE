import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaHeart, FaShoppingCart, FaBell, FaStar, FaFilter, FaClock, FaBookOpen, FaChalkboardTeacher, FaRegBookmark, FaBookmark, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./CoursesPage.css";
import {Link} from "react-router-dom";
import courseService from "../../services/courseService.js";

const levels = ["Beginner", "Intermediate", "Advanced", "All Levels"];
const durations = ["0-5 hours", "5-10 hours", "10-20 hours", "20+ hours"];
const ratings = ["4.5 & up", "4.0 & up", "3.5 & up", "3.0 & up"];

const courses = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    // title: `${categories[Math.floor(Math.random() * categories.length)]} ${i % 3 === 0 ? 'Mastery' : i % 3 === 1 ? 'Complete Guide' : 'Bootcamp'} ${i + 1}`,
    instructor: `Professor ${String.fromCharCode(65 + (i % 26))}. ${String.fromCharCode(65 + ((i + 5) % 26))}`,
    rating: (Math.floor(Math.random() * 15) + 35) / 10, // Rating từ 3.5 đến 5.0 sao
    comments: Math.floor(Math.random() * 500) + 50,
    students: Math.floor(Math.random() * 10000) + 1000,
    price: (Math.floor(Math.random() * 80) + 20) * 10000, // Giá từ 200,000 đến 1,000,000 VND
    originalPrice: (Math.floor(Math.random() * 100) + 50) * 10000,
    // thumbnail: `https://source.unsplash.com/400x300/?education,${categories[Math.floor(Math.random() * categories.length)]}&sig=${i}`,
    duration: Math.floor(Math.random() * 20) + 10, // Thời lượng từ 10 đến 30 giờ
    lessons: Math.floor(Math.random() * 50) + 20, // Số bài học từ 20 đến 70
    level: levels[Math.floor(Math.random() * levels.length)],
    // category: categories[Math.floor(Math.random() * categories.length)],
    lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    isSaved: Math.random() > 0.7
}));

const CoursesPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedFilters, setSelectedFilters] = useState({
        level: "All Levels",
        duration: "Any Duration",
        rating: "Any Rating"
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [savedCourses, setSavedCourses] = useState([]);
    const coursesPerPage = 9; // Số khóa học hiển thị trên mỗi trang
    const [isLoading, setIsLoading] = useState(true);
    const [savedCoursesCount, setSavedCoursesCount] = useState(3);
    const [cartItemsCount, setCartItemsCount] = useState(2);
    const [notificationsCount, setNotificationsCount] = useState(5);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [sortOption, setSortOption] = useState("popular");
    const [viewMode, setViewMode] = useState("grid");

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesData = await courseService.getAllCategories();
            setCategories(categoriesData.categories);
        };
        fetchCategories();
    }, []);

    // Simulating loading state
    useEffect(() => {
        setSavedCourses(courses.filter(course => course.isSaved).map(course => course.id));
        
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        
        return () => clearTimeout(timer);
    }, []);

    // Apply filters and search
    const filteredCourses = courses.filter(course => {
        const categoryMatch = selectedCategory === "All" || course.category === selectedCategory;
        const levelMatch = selectedFilters.level === "All Levels" || course.level === selectedFilters.level;
        const durationMatch = selectedFilters.duration === "Any Duration" || 
            (selectedFilters.duration === "0-5 hours" && course.duration <= 5) ||
            (selectedFilters.duration === "5-10 hours" && course.duration > 5 && course.duration <= 10) ||
            (selectedFilters.duration === "10-20 hours" && course.duration > 10 && course.duration <= 20) ||
            (selectedFilters.duration === "20+ hours" && course.duration > 20);
        const ratingMatch = selectedFilters.rating === "Any Rating" || 
            (selectedFilters.rating === "4.5 & up" && course.rating >= 4.5) ||
            (selectedFilters.rating === "4.0 & up" && course.rating >= 4.0) ||
            (selectedFilters.rating === "3.5 & up" && course.rating >= 3.5) ||
            (selectedFilters.rating === "3.0 & up" && course.rating >= 3.0);
        const searchMatch = searchTerm === "" || 
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
        
        return categoryMatch && levelMatch && durationMatch && ratingMatch && searchMatch;
    });

    // Sort courses
    const sortedCourses = [...filteredCourses].sort((a, b) => {
        switch(sortOption) {
            case "popular":
                return b.students - a.students;
            case "newest":
                return new Date(b.lastUpdated) - new Date(a.lastUpdated);
            case "price-low":
                return a.price - b.price;
            case "price-high":
                return b.price - a.price;
            case "rating":
                return b.rating - a.rating;
            default:
                return 0;
        }
    });

    // Tính toán số trang
    const totalPages = Math.ceil(sortedCourses.length / coursesPerPage);

    // Lấy danh sách khóa học cho trang hiện tại
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = sortedCourses.slice(indexOfFirstCourse, indexOfLastCourse);

    // Toggle saved status
    const toggleSaved = (courseId) => {
        if (savedCourses.includes(courseId)) {
            setSavedCourses(savedCourses.filter(id => id !== courseId));
            setSavedCoursesCount(prev => prev - 1);
        } else {
            setSavedCourses([...savedCourses, courseId]);
            setSavedCoursesCount(prev => prev + 1);
        }
    };

    // Add to cart
    const addToCart = () => {
        setCartItemsCount(prev => prev + 1);
    };

    // Reset filters
    const resetFilters = () => {
        setSelectedCategory("All");
        setSelectedFilters({
            level: "All Levels",
            duration: "Any Duration",
            rating: "Any Rating"
        });
        setSearchTerm("");
    };

    // Xử lý thay đổi trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="courses-page">
            {/* Toolbar */}
            <motion.div 
                className="toolbar"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="search-bar">
                    <FaSearch className="icon" />
                    <input 
                        type="text" 
                        placeholder="Tìm kiếm khóa học, giảng viên, hoặc kỹ năng..." 
                        className="search-input" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="toolbar-icons">
                    <motion.div 
                        className="icon-wrapper"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaHeart className="icon" />
                        <motion.span 
                            className="badge"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {savedCoursesCount}
                        </motion.span>
                    </motion.div>
                    <Link to="/cart">
                        <motion.div
                            className="icon-wrapper"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaShoppingCart className="icon" />
                            <motion.span
                                className="badge"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                {cartItemsCount}
                            </motion.span>
                        </motion.div>
                    </Link>
                    <motion.div 
                        className="icon-wrapper"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaBell className="icon" />
                        <motion.span 
                            className="badge"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            {notificationsCount}
                        </motion.span>
                    </motion.div>
                    <div className="avatar-wrapper" onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}>
                        <img src="https://source.unsplash.com/100x100/?portrait" alt="User Avatar" className="avatar" />
                        {isUserDropdownOpen && (
                            <motion.div 
                                className="dropdown-menu"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="user-info">
                                    <div className="user-avatar">
                                        <img src="https://source.unsplash.com/100x100/?portrait" alt="User Avatar" />
                                    </div>
                                    <div className="user-details">
                                        <h4>John Doe</h4>
                                        <p>john.doe@example.com</p>
                                    </div>
                                </div>
                                <div className="dropdown-divider"></div>
                                <p className="dropdown-item"><i className="dropdown-icon">👤</i> Hồ sơ cá nhân</p>
                                <p className="dropdown-item"><i className="dropdown-icon">🎓</i> Khóa học của tôi</p>
                                <p className="dropdown-item"><i className="dropdown-icon">⚙️</i> Cài đặt tài khoản</p>
                                <div className="dropdown-divider"></div>
                                <p className="dropdown-item"><i className="dropdown-icon">🚪</i> Đăng xuất</p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>

            <div className="courses-content">
                {/* Filter Panel */}
                <motion.div 
                    className={`filter-panel ${isFilterOpen ? 'open' : ''}`}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div className="filter-header">
                        <h3>Bộ lọc khóa học</h3>
                        <motion.button 
                            className="reset-button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={resetFilters}
                        >
                            Đặt lại
                        </motion.button>
                    </div>

                    <div className="filter-divider"></div>

                    <div className="filter-section">
                        <h4>Cấp độ</h4>
                        <div className="filter-options">
                            {levels.map(level => (
                                <div className="filter-option" key={level}>
                                    <label className="checkbox-container">
                                        <input 
                                            type="radio" 
                                            name="level" 
                                            checked={selectedFilters.level === level}
                                            onChange={() => setSelectedFilters({...selectedFilters, level})}
                                        />
                                        <span className="checkmark"></span>
                                        {level}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="filter-divider"></div>

                    <div className="filter-section">
                        <h4>Thời lượng</h4>
                        <div className="filter-options">
                            {durations.map(duration => (
                                <div className="filter-option" key={duration}>
                                    <label className="checkbox-container">
                                        <input 
                                            type="radio" 
                                            name="duration" 
                                            checked={selectedFilters.duration === duration}
                                            onChange={() => setSelectedFilters({...selectedFilters, duration})}
                                        />
                                        <span className="checkmark"></span>
                                        {duration}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="filter-divider"></div>

                    <div className="filter-section">
                        <h4>Đánh giá</h4>
                        <div className="filter-options">
                            {ratings.map(rating => (
                                <div className="filter-option" key={rating}>
                                    <label className="checkbox-container">
                                        <input 
                                            type="radio" 
                                            name="rating" 
                                            checked={selectedFilters.rating === rating}
                                            onChange={() => setSelectedFilters({...selectedFilters, rating})}
                                        />
                                        <span className="checkmark"></span>
                                        <div className="rating-label">
                                            {rating.split(' ')[0]} <FaStar className="star-icon filled" />
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="filter-divider"></div>

                    <motion.button 
                        className="apply-filters-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsFilterOpen(false)}
                    >
                        Áp dụng bộ lọc
                    </motion.button>
                </motion.div>

                <div className="main-content">
                    <div className="main-content-header">
                        <div className="filter-toggle-mobile">
                            <motion.button 
                                className="filter-toggle-btn"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                            >
                                <FaFilter /> Bộ lọc
                            </motion.button>
                        </div>

                        {/* Category Slider */}
<motion.div 
    className="category-slider-container"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
>
    <div className="slider-navigation prev">
        <button className="slider-nav-btn" onClick={() => {
            const slider = document.querySelector(".category-slider");
            if (slider) slider.scrollLeft -= 200;
        }}>
            <FaChevronLeft />
        </button>
    </div>
    <div className="category-slider" style={{ overflowX: "auto", whiteSpace: "nowrap", scrollBehavior: "smooth" }}>
        <motion.button 
            className={`category-btn ${selectedCategory === "All" ? "active" : ""}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory("All")}
        >
            Tất cả
        </motion.button>
        {categories.map(category => (
            <motion.button 
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? "active" : ""}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
            >
                {category.name}
            </motion.button>
        ))}
    </div>
    <div className="slider-navigation next">
        <button className="slider-nav-btn" onClick={() => {
            const slider = document.querySelector(".category-slider");
            if (slider) slider.scrollLeft += 200;
        }}>
            <FaChevronRight />
        </button>
    </div>
</motion.div>


                        {/* Sort and View Options */}
                        <motion.div 
                            className="view-options"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <div className="sort-dropdown">
                                <select 
                                    value={sortOption} 
                                    onChange={(e) => setSortOption(e.target.value)}
                                    className="sort-select"
                                >
                                    <option value="popular">Phổ biến nhất</option>
                                    <option value="newest">Mới nhất</option>
                                    <option value="rating">Đánh giá cao nhất</option>
                                    <option value="price-low">Giá thấp đến cao</option>
                                    <option value="price-high">Giá cao đến thấp</option>
                                </select>
                            </div>
                            <div className="view-mode-buttons">
                                <button 
                                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                    onClick={() => setViewMode('grid')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="3" width="7" height="7"></rect>
                                        <rect x="14" y="3" width="7" height="7"></rect>
                                        <rect x="14" y="14" width="7" height="7"></rect>
                                        <rect x="3" y="14" width="7" height="7"></rect>
                                    </svg>
                                </button>
                                <button 
                                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                    onClick={() => setViewMode('list')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="8" y1="6" x2="21" y2="6"></line>
                                        <line x1="8" y1="12" x2="21" y2="12"></line>
                                        <line x1="8" y1="18" x2="21" y2="18"></line>
                                        <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                        <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                        <line x1="3" y1="18" x2="3.01" y2="18"></line>
                                    </svg>
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Results Count */}
                    <motion.div 
                        className="results-info"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <p>Hiển thị <span className="highlight">{sortedCourses.length}</span> khóa học{selectedCategory !== "All" ? ` trong ${selectedCategory}` : ""}</p>
                    </motion.div>

                    {isLoading ? (
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                            <p>Đang tải khóa học...</p>
                        </div>
                    ) : sortedCourses.length === 0 ? (
                        <motion.div 
                            className="no-results"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="no-results-icon">🔍</div>
                            <h2>Không tìm thấy khóa học nào</h2>
                            <p>Hãy thử điều chỉnh bộ lọc hoặc tìm kiếm với từ khóa khác</p>
                            <motion.button 
                                className="reset-search-btn"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={resetFilters}
                            >
                                Xóa bộ lọc
                            </motion.button>
                        </motion.div>
                    ) : (
                        <AnimatePresence>
                            <motion.div 
                                className={`courses-container ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                {currentCourses.map((course, index) => (
                                    <motion.div 
                                        key={course.id}
                                        className="course-card"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                        whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
                                    >
                                        <div className="course-save">
                                            <button 
                                                className="save-button"
                                                onClick={() => toggleSaved(course.id)}
                                            >
                                                {savedCourses.includes(course.id) ? 
                                                    <FaBookmark className="save-icon saved" /> : 
                                                    <FaRegBookmark className="save-icon" />
                                                }
                                            </button>
                                        </div>

                                        <div className="course-image-container">
                                            <div className="course-overlay">
                                                <button className="preview-btn">Xem trước</button>
                                            </div>
                                            <img 
                                                src={course.thumbnail} 
                                                alt={course.title} 
                                                className="course-image" 
                                            />
                                            <div className="course-level">{course.level}</div>
                                        </div>

                                        <div className="course-content">
                                            <div className="course-category">{course.category}</div>
                                            <h3 className="course-title">{course.title}</h3>

                                            <div className="course-instructor">
                                                <FaChalkboardTeacher className="instructor-icon" />
                                                <span>{course.instructor}</span>
                                            </div>

                                            <div className="course-stats">
                                                <div className="course-rating">
                                                    <span className="rating-value">{course.rating.toFixed(1)}</span>
                                                    <div className="stars">
                                                        {[...Array(5)].map((_, i) => (
                                                            <FaStar 
                                                                key={i} 
                                                                className={i < Math.floor(course.rating) ? "star filled" : 
                                                                           i === Math.floor(course.rating) && course.rating % 1 > 0 ? "star half-filled" : "star"}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="reviews-count">({course.comments})</span>
                                                </div>
                                                <div className="course-students">
                                                    <span>{(course.students).toLocaleString()} học viên</span>
                                                </div>
                                            </div>

                                            <div className="course-details">
                                                <div className="detail-item">
                                                    <FaClock className="detail-icon" />
                                                    <span>{course.duration} giờ</span>
                                                </div>
                                                <div className="detail-item">
                                                    <FaBookOpen className="detail-icon" />
                                                    <span>{course.lessons} bài học</span>
                                                </div>
                                            </div>

                                            <div className="course-footer">
                                                <div className="course-price">
                                                    <div className="current-price">{course.price.toLocaleString()} VND</div>
                                                    <div className="original-price">{course.originalPrice.toLocaleString()} VND</div>
                                                </div>
                                                <motion.button 
                                                    className="add-to-cart-btn"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={addToCart}
                                                >
                                                    Thêm vào giỏ
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    )}

                    {/* Pagination */}
                    {!isLoading && sortedCourses.length > 0 && (
                        <motion.div 
                            className="pagination"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <motion.button
                                className="pagination-button prev-next"
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                                whileHover={currentPage !== 1 ? { scale: 1.1 } : {}}
                                whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
                            >
                                <FaChevronLeft />
                            </motion.button>
                            
                            {totalPages <= 7 ? (
                                // Show all pages if there are 7 or fewer
                                [...Array(totalPages)].map((_, i) => (
                                    <motion.button
                                        key={i + 1}
                                        className={`pagination-button ${currentPage === i + 1 ? "active" : ""}`}
                                        onClick={() => handlePageChange(i + 1)}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {i + 1}
                                    </motion.button>
                                ))
                            ) : (
                                // Complex pagination with ellipsis
                                <>
                                    {/* First page always shown */}
                                    <motion.button
                                        className={`pagination-button ${currentPage === 1 ? "active" : ""}`}
                                        onClick={() => handlePageChange(1)}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        1
                                    </motion.button>
                                    
                                    {/* Show ellipsis or page 2 */}
                                    {currentPage > 3 && (
                                        <span className="pagination-ellipsis">...</span>
                                    )}
                                    
                                    {/* Show pages around current page */}
                                    {[...Array(totalPages)].map((_, i) => {
                                        const pageNum = i + 1;
                                        if (
                                            (pageNum > 1 && pageNum < totalPages) && // Not first or last
                                            (Math.abs(pageNum - currentPage) <= 1 || // Adjacent to current
                                            (currentPage <= 3 && pageNum <= 4) || // Near start
                                            (currentPage >= totalPages - 2 && pageNum >= totalPages - 3)) // Near end
                                        ) {
                                            return (
                                                <motion.button
                                                    key={pageNum}
                                                    className={`pagination-button ${currentPage === pageNum ? "active" : ""}`}
                                                    onClick={() => handlePageChange(pageNum)}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    {pageNum}
                                                </motion.button>
                                            );
                                        }
                                        return null;
                                    })}
                                    
                                    {/* Show ellipsis or second last page */}
                                    {currentPage < totalPages - 2 && (
                                        <span className="pagination-ellipsis">...</span>
                                    )}
                                    
                                    {/* Last page always shown */}
                                    <motion.button
                                        className={`pagination-button ${currentPage === totalPages ? "active" : ""}`}
                                        onClick={() => handlePageChange(totalPages)}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {totalPages}
                                    </motion.button>
                                </>
                            )}
                            
                            <motion.button
                                className="pagination-button prev-next"
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                                whileHover={currentPage !== totalPages ? { scale: 1.1 } : {}}
                                whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
                            >
                                <FaChevronRight />
                            </motion.button>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CoursesPage;