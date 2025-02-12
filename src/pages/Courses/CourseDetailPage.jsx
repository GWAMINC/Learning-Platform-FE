import { useState } from "react";
import { FaStar, FaUser, FaCommentDots } from "react-icons/fa";
import "./CourseDetailPage.css";

const CourseDetailPage = () => {
    const [selectedTab, setSelectedTab] = useState("overview");

    const course = {
        title: "Khóa học ReactJS",
        instructor: "Nguyễn Văn A",
        image: "https://source.unsplash.com/400x300/?coding",
        description: "Đây là khóa học ReactJS từ cơ bản đến nâng cao giúp bạn xây dựng ứng dụng web chuyên nghiệp.",
        syllabus: [
            "Giới thiệu về ReactJS",
            "Component và Props",
            "State và Lifecycle",
            "React Hooks",
            "React Router",
            "Kết nối API",
            "Quản lý trạng thái với Redux",
            "Dự án thực tế"
        ],
        whatYouWillLearn: [
            "Hiểu rõ cách hoạt động của ReactJS",
            "Xây dựng giao diện người dùng với Component",
            "Quản lý trạng thái với Hooks và Redux",
            "Kết nối API và xử lý dữ liệu",
            "Triển khai dự án thực tế"
        ],
        authorMessage: "Xin chào! Tôi là Nguyễn Văn A, người hướng dẫn khóa học này. Tôi mong rằng bạn sẽ học được nhiều kiến thức hữu ích từ khóa học này!",
        rating: 4.8,
        comments: [
            { user: "Trần B", text: "Khóa học rất bổ ích và dễ hiểu!" },
            { user: "Lê C", text: "Giảng viên giảng bài rất hay và chi tiết." }
        ]
    };

    return (
        <div className="course-detail-page">
            <div className="top-section">
                <div className="left">
                    <div className="course-outline">
                        <h2>Chương trình học</h2>
                        <ul>
                            {course.syllabus.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="course-description">
                        <h3>Mô tả khóa học</h3>
                        <p>{course.description}</p>
                    </div>
                </div>
                <div className="right">
                <img src={course.image} alt={course.title} className="course-image" />
                    <h2>{course.title}</h2>
                    <p className="instructor"><FaUser /> {course.instructor}</p>
                </div>
            </div>

            <div className="tabs">
                <button className={selectedTab === "overview" ? "active" : ""} onClick={() => setSelectedTab("overview")}>What You Will Learn</button>
                <button className={selectedTab === "author" ? "active" : ""} onClick={() => setSelectedTab("author")}>Lời tác giả</button>
                <button className={selectedTab === "rating" ? "active" : ""} onClick={() => setSelectedTab("rating")}>Đánh giá</button>
                <button className={selectedTab === "comments" ? "active" : ""} onClick={() => setSelectedTab("comments")}>Bình luận</button>
            </div>

            <div className="tab-content">
                {selectedTab === "overview" && (
                    <ul className="what-you-will-learn">
                        {course.whatYouWillLearn.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                )}
                {selectedTab === "author" && <p className="author-message">{course.authorMessage}</p>}
                {selectedTab === "rating" && (
                    <div className="rating">
                        <FaStar className="star filled" /> {course.rating} / 5.0
                    </div>
                )}
                {selectedTab === "comments" && (
                    <div className="comments">
                        {course.comments.map((comment, index) => (
                            <p key={index}><FaCommentDots /> <strong>{comment.user}:</strong> {comment.text}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseDetailPage;
