import { useState } from "react";
import { FaSearch, FaHeart, FaShoppingCart, FaBell, FaStar, FaUser } from "react-icons/fa";
import "./CoursesPage.css";

const categories = [
    "Web Development", "Data Science", "Machine Learning", "AI", "Mobile Development",
    "Game Development", "Cyber Security", "Cloud Computing", "Blockchain", "UI/UX Design"
];

const courses = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    title: `Khóa học ${i + 1}`,
    instructor: `Người đăng khóa ${i + 1}`,
    rating: Math.floor(Math.random() * 2) + 4, // Rating từ 4 đến 5 sao
    comments: Math.floor(Math.random() * 50) + 10,
    price: (Math.floor(Math.random() * 80) + 20) * 10000, // Giá từ 200,000 đến 1,000,000 VND
    thumbnail: `https://source.unsplash.com/300x200/?education,technology&sig=${i}`
}));


const CoursesPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    return (
        <div className="courses-page">
            {/* Toolbar */}
            <div className="toolbar">
                <div className="search-bar">
                    <FaSearch className="icon" />
                    <input type="text" placeholder="Tìm kiếm khóa học..." />
                </div>
                <div className="toolbar-icons">
                    <FaHeart className="icon" />
                    <FaShoppingCart className="icon" />
                    <FaBell className="icon" />
                    <FaUser className="icon avatar" />
                </div>
            </div>

            {/* Filter */}
            <div className="filter-bar">
                {categories.map((cat, index) => (
                    <button
                        key={index}
                        className={selectedCategory === cat ? "active" : ""}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        <span>{cat}</span> {/* Bọc nội dung trong span để animation chạy đúng */}
                    </button>
                ))}
            </div>


            {/* Danh sách khóa học */}
            <div className="courses-grid">
                {courses.map(course => (
                    <div key={course.id} className="course-card">
                        <img src={course.thumbnail} alt={course.title} className="course-thumbnail" />
                        <h3>{course.title}</h3>
                        <p className="instructor">{course.instructor}</p>
                        <p className="price">{course.price.toLocaleString()} VND</p>
                        <div className="rating">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={i < course.rating ? "star filled" : "star"} />
                            ))}
                            <span>({course.comments} bình luận)</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Paging */}
            <div className="pagination">
                <button>{"<"}</button>
                <button className="active">1</button>
                <button>2</button>
                <button>3</button>
                <button>{">"}</button>
            </div>
        </div>
    );
};

export default CoursesPage;
