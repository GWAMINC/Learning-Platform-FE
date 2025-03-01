import { useState, useEffect, useRef } from "react";
import { FaStar, FaUser, FaCommentDots, FaClock, FaBookOpen, FaChalkboardTeacher, FaRegCheckCircle, FaCalendarAlt, FaPlayCircle, FaDownload, FaInfinity, FaCertificate, FaShieldAlt, FaAngleDown, FaAngleUp, FaHeart, FaShare, FaGraduationCap, FaLaptopCode, FaRegLightbulb } from "react-icons/fa";
import "./CourseDetailPage.css";

const CourseDetailPage = () => {
    const [selectedTab, setSelectedTab] = useState("overview");
    const [isSticky, setIsSticky] = useState(false);
    const [expandedSections, setExpandedSections] = useState([0]);
    const courseHeaderRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (courseHeaderRef.current) {
                const headerHeight = courseHeaderRef.current.offsetHeight;
                setIsSticky(window.scrollY > headerHeight - 80);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleSection = (index) => {
        setExpandedSections(prev => 
            prev.includes(index) 
                ? prev.filter(i => i !== index) 
                : [...prev, index]
        );
    };

    const course = {
        title: "Khóa học ReactJS Ultimate",
        subtitle: "Làm chủ React, Redux và xây dựng ứng dụng thực tế chuyên nghiệp",
        instructor: "Nguyễn Văn A",
        instructorTitle: "Senior Frontend Developer | React Expert | 5+ years experience",
        instructorAvatar: "https://source.unsplash.com/100x100/?portrait",
        image: "https://source.unsplash.com/400x300/?coding",
        duration: "12 tuần",
        level: "Trung cấp đến Nâng cao",
        lessons: 78,
        projects: 5,
        lastUpdated: "15/02/2025",
        students: 1243,
        languages: ["Tiếng Việt", "English subtitles"],
        features: [
            "78 bài giảng HD chất lượng cao",
            "5 dự án thực tế từ cơ bản đến nâng cao",
            "Hỗ trợ 1-1 qua Discord và Email",
            "Cập nhật liên tục với React mới nhất",
            "Tài liệu bổ sung và source code đầy đủ"
        ],
        price: {
            original: "1,999,000₫",
            discounted: "899,000₫",
            discountPercent: 55,
            expiry: "01/03/2025"
        },
        description: {
            short: "Đây là khóa học ReactJS toàn diện giúp bạn tiến từ cơ bản đến chuyên nghiệp với React và ReactJS ecosystem.",
            full: "Khóa học ReactJS Ultimate là hành trình học tập toàn diện nhất dành cho những ai muốn làm chủ ReactJS trong thực tế. Không chỉ giới thiệu về các khái niệm cơ bản, khóa học đi sâu vào các kỹ thuật nâng cao, các best practices trong ngành và cách áp dụng chúng vào các dự án thực tế.\n\nKhóa học được thiết kế phù hợp cho cả người mới bắt đầu và những ai muốn nâng cao kỹ năng. Bạn sẽ học cách xây dựng các ứng dụng đáp ứng nhanh, tối ưu hiệu suất và có khả năng mở rộng. Thông qua 5 dự án thực tế, bạn sẽ trải nghiệm toàn bộ quy trình làm việc của một Frontend Developer chuyên nghiệp.\n\nĐặc biệt, khóa học liên tục được cập nhật theo các phiên bản mới nhất của React và các thư viện liên quan, đảm bảo kiến thức bạn nhận được luôn cập nhật với xu hướng công nghệ hiện tại."
        },
        requirements: [
            "Kiến thức cơ bản về HTML, CSS và JavaScript",
            "Hiểu biết về ES6+ là một lợi thế",
            "Không yêu cầu kinh nghiệm ReactJS trước đó",
            "Máy tính có cấu hình trung bình trở lên"
        ],
        targetAudience: [
            "Frontend Developer muốn nâng cao kỹ năng React",
            "Sinh viên CNTT muốn bắt đầu với frontend development",
            "Người chuyển ngành muốn học một framework hiện đại",
            "Các nhà phát triển web muốn cập nhật kỹ năng mới"
        ],
        syllabus: [
            {
                title: "Phần 1: Nền tảng ReactJS",
                duration: "2 tuần",
                lessons: [
                    "Khóa học được thiết kế phù hợp cho cả người mới bắt đầu và những ai muốn nâng cao kỹ năng. Bạn sẽ học cách xây dựng các ứng dụng đáp ứng nhanh, tối ưu hiệu suất và có khả năng mở rộng. Thông qua 5 dự án thực tế, bạn sẽ trải nghiệm toàn bộ quy trình làm việc của một Frontend Developer chuyên nghiệp.",
                    "Cài đặt môi trường phát triển tối ưu",
                    "JSX và cú pháp cơ bản",
                    "Virtual DOM và cách React hoạt động",
                    "Dự án #1: Ứng dụng To-do List đơn giản"
                ]
            },
            {
                title: "Phần 2: Component và React Patterns",
                duration: "2 tuần",
                lessons: [
                    "Component Lifecycle trong Class Components",
                    "Function Components và sự khác biệt",
                    "Props, PropTypes và TypeScript",
                    "Higher Order Components (HOC)",
                    "Render Props Pattern",
                    "Composition vs Inheritance",
                    "Dự án #2: Ứng dụng quản lý sản phẩm"
                ]
            },
            {
                title: "Phần 3: State Management",
                duration: "3 tuần",
                lessons: [
                    "Local state với useState",
                    "Complex state với useReducer",
                    "Context API cho global state",
                    "Redux fundamentals",
                    "Redux Toolkit và modern Redux",
                    "Redux Middleware (Thunk, Saga)",
                    "Dự án #3: Ứng dụng E-commerce với Redux"
                ]
            },
            {
                title: "Phần 4: React Hooks & Performance",
                duration: "2 tuần",
                lessons: [
                    "Deep dive vào React Hooks",
                    "Custom Hooks xây dựng và tái sử dụng",
                    "useEffect, useCallback, useMemo",
                    "Performance optimization",
                    "React.memo, memoization strategy",
                    "Code splitting và lazy loading",
                    "Debugging và profiling"
                ]
            },
            {
                title: "Phần 5: Routing và Form Management",
                duration: "1.5 tuần",
                lessons: [
                    "React Router v6 toàn tập",
                    "Nested routes và dynamic routing",
                    "Protected routes và authentication",
                    "Form handling với React Hook Form",
                    "Form validation và error handling",
                    "Formik và Yup integration"
                ]
            },
            {
                title: "Phần 6: API Integration & Data Fetching",
                duration: "1.5 tuần",
                lessons: [
                    "RESTful API với Axios",
                    "Error handling trong API calls",
                    "React Query fundamentals",
                    "Caching và invalidation strategies",
                    "GraphQL và Apollo Client",
                    "WebSockets và real-time data",
                    "Dự án #4: Ứng dụng blog với API integration"
                ]
            },
            {
                title: "Phần 7: Testing và Deployment",
                duration: "1 tuần",
                lessons: [
                    "Unit testing với Jest",
                    "Component testing với React Testing Library",
                    "Integration tests và E2E tests",
                    "CI/CD pipeline cho React apps",
                    "Deployment strategies (Vercel, Netlify, AWS)",
                    "Performance monitoring"
                ]
            },
            {
                title: "Phần 8: Dự án thực tế cuối khóa",
                duration: "2 tuần",
                lessons: [
                    "Thiết kế hệ thống và kiến trúc",
                    "UI/UX với Material UI hoặc Tailwind CSS",
                    "State management với Redux Toolkit",
                    "Authentication và authorization",
                    "Internationalization (i18n)",
                    "Accessibility và SEO",
                    "Dự án #5: Xây dựng ứng dụng full-feature"
                ]
            }
        ],
        whatYouWillLearn: [
            "Hiểu sâu về cơ chế hoạt động của React và tư duy component-based",
            "Thành thạo các React Hooks và áp dụng các pattern hiện đại",
            "Xây dựng state management system hiệu quả với Redux Toolkit",
            "Tối ưu hóa performance cho ứng dụng React quy mô lớn",
            "Thiết kế và phát triển UI components tái sử dụng cao",
            "Xử lý form và validation một cách chuyên nghiệp",
            "Thực hiện API integration và data fetching với best practices",
            "Viết unit tests và integration tests cho React applications",
            "Triển khai CI/CD và deployment quy trình chuyên nghiệp",
            "Xây dựng 5 dự án thực tế từ zero đến production"
        ],
        authorMessage: "Xin chào các bạn! Tôi là Nguyễn Văn A, người hướng dẫn khóa học này. Với hơn 5 năm kinh nghiệm phát triển ứng dụng React tại các công ty hàng đầu và làm việc với hàng chục dự án thực tế, tôi đã tổng hợp tất cả kiến thức và kỹ năng thiết yếu vào khóa học này.\n\nKhóa học được thiết kế không chỉ giúp bạn nắm vững lý thuyết mà còn thành thạo ứng dụng thực tế qua những dự án thực chiến. Tôi đã tỉ mỉ chuẩn bị mọi bài giảng, ví dụ và dự án để đảm bảo bạn tiếp thu được kiến thức một cách hiệu quả nhất.\n\nHơn thế nữa, tôi sẽ luôn đồng hành cùng bạn trong suốt quá trình học thông qua Discord community và các buổi Q&A hàng tuần. Tôi tin rằng với sự nỗ lực và đam mê, bạn sẽ sớm trở thành chuyên gia React trong tương lai gần.\n\nChúc bạn có một hành trình học tập thật hiệu quả và thú vị!",
        rating: 4.9,
        totalRatings: 427,
        ratingDistribution: {
            5: 85,
            4: 10,
            3: 3,
            2: 1,
            1: 1
        },
        comments: [
            { 
                user: "Nguyễn Quốc B", 
                avatar: "TMB",
                rating: 5,
                date: "12/02/2025",
                text: "Khóa học vượt xa mong đợi của tôi! Giảng viên giải thích các khái niệm phức tạp một cách đơn giản và trực quan. Các bài tập thực hành rất sát với thực tế công việc. Đặc biệt là dự án thứ 3 về E-commerce, tôi đã áp dụng ngay vào dự án cá nhân của mình. Rất đáng đồng tiền bát gạo!" 
            },
            { 
                user: "Hoàng Gia C", 
                avatar: "LTC",
                rating: 5,
                date: "05/02/2025",
                text: "Giảng viên giảng bài rất hay và chi tiết. Điểm mạnh của khóa học này là không chỉ dạy lý thuyết mà còn rất nhiều kinh nghiệm thực tế, những lỗi thường gặp và cách giải quyết. Tôi đặc biệt thích phần Redux và dự án cuối khóa. Đã học nhiều khóa React nhưng đây là khóa học toàn diện nhất!" 
            },
            { 
                user: "Phạm Anh T", 
                avatar: "PQD",
                rating: 5,
                date: "28/01/2025",
                text: "Sau khi hoàn thành khóa học này, tôi đã tự tin xây dựng portfolio và apply thành công vào vị trí Frontend Developer với mức lương tốt hơn 30% so với công việc cũ. Phần testing và CI/CD rất hữu ích cho công việc thực tế. Cảm ơn thầy rất nhiều! Khóa học đáng giá từng đồng bỏ ra." 
            },
            { 
                user: "La Đức E", 
                avatar: "VHE",
                rating: 4,
                date: "15/01/2025",
                text: "Khóa học rất tốt và đầy đủ. Có một vài phần hơi nhanh như GraphQL và WebSockets, nhưng thầy đã bổ sung tài liệu và video phụ để học viên tham khảo thêm. Cộng đồng Discord rất năng động và thầy trả lời câu hỏi rất nhanh. Highly recommended!" 
            }
        ],
        faqs: [
            {
                question: "Khóa học này có phù hợp với người mới bắt đầu không?",
                answer: "Có, khóa học được thiết kế để người học có thể bắt đầu từ kiến thức cơ bản về HTML, CSS và JavaScript. Các bài học đầu tiên sẽ giới thiệu về React từ những khái niệm đơn giản nhất và dần dần nâng cao. Tuy nhiên, bạn nên có kiến thức cơ bản về JavaScript và ES6+ để theo dõi tốt nhất."
            },
            {
                question: "Khóa học có cập nhật theo phiên bản mới của React không?",
                answer: "Có, khóa học được cập nhật thường xuyên theo các phiên bản mới nhất của React và các thư viện liên quan. Khi có các tính năng mới hoặc best practices mới, chúng tôi sẽ bổ sung vào khóa học. Học viên đã đăng ký sẽ được truy cập miễn phí vào các nội dung cập nhật mới."
            },
            {
                question: "Tôi được hỗ trợ như thế nào khi gặp khó khăn trong quá trình học?",
                answer: "Học viên sẽ được tham gia vào nhóm Discord riêng của khóa học, nơi bạn có thể đặt câu hỏi và nhận hỗ trợ từ giảng viên cũng như cộng đồng học viên khác. Ngoài ra, có các buổi Q&A trực tuyến hàng tuần và bạn cũng có thể gửi email trực tiếp cho giảng viên."
            },
            {
                question: "Thời hạn truy cập khóa học là bao lâu?",
                answer: "Học viên sẽ được truy cập trọn đời vào nội dung khóa học, bao gồm cả các cập nhật trong tương lai. Không có thời hạn truy cập."
            }
        ]
    };

    const renderRatingStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FaStar 
                    key={i} 
                    className={i <= rating ? "star filled" : "star empty"} 
                />
            );
        }
        return stars;
    };

    const renderRatingDistribution = () => {
        const maxValue = Math.max(...Object.values(course.ratingDistribution));
        
        return (
            <div className="rating-distribution">
                {[5, 4, 3, 2, 1].map(star => (
                    <div className="rating-bar" key={star}>
                        <div className="rating-label">{star} <FaStar className="star-icon" /></div>
                        <div className="rating-bar-container">
                            <div 
                                className="rating-bar-fill" 
                                style={{ 
                                    width: `${(course.ratingDistribution[star] / maxValue) * 100}%`,
                                    backgroundColor: star >= 4 ? '#4CAF50' : star === 3 ? '#FFC107' : '#F44336'
                                }}
                            />
                        </div>
                        <div className="rating-percentage">
                            {Math.round((course.ratingDistribution[star] / Object.values(course.ratingDistribution).reduce((a, b) => a + b, 0)) * 100)}%
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="course-detail-page">
            <div className="course-header" ref={courseHeaderRef}>
                <div className="header-content">
                    <div className="container">
                        <div className="breadcrumbs">
                            <span>Trang chủ</span> &gt; <span>Khóa học</span> &gt; <span>Lập trình Frontend</span> &gt; <span>ReactJS</span>
                        </div>
                        <div className="header-main">
                            <div className="header-info">
                                <h1>{course.title}</h1>
                                <h2>{course.subtitle}</h2>
                                <div className="course-meta">
                                    <span className="rating-badge">
                                        <FaStar /> {course.rating} ({course.totalRatings} đánh giá)
                                    </span>
                                    <span><FaUser /> {course.students.toLocaleString()} học viên</span>
                                    <span><FaCalendarAlt /> Cập nhật {course.lastUpdated}</span>
                                </div>
                                <div className="instructor-badge">
                                    <FaChalkboardTeacher /> Giảng viên: {course.instructor}
                                </div>
                                <p className="course-brief">{course.description.short}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`sticky-nav ${isSticky ? 'sticky' : ''}`}>
                <div className="container">
                    <div className="tabs">
                        <button className={selectedTab === "overview" ? "active" : ""} onClick={() => setSelectedTab("overview")}>Tổng quan</button>
                        <button className={selectedTab === "curriculum" ? "active" : ""} onClick={() => setSelectedTab("curriculum")}>Chương trình học</button>
                        <button className={selectedTab === "instructor" ? "active" : ""} onClick={() => setSelectedTab("instructor")}>Giảng viên</button>
                        <button className={selectedTab === "reviews" ? "active" : ""} onClick={() => setSelectedTab("reviews")}>Đánh giá</button>
                        <button className={selectedTab === "faqs" ? "active" : ""} onClick={() => setSelectedTab("faqs")}>FAQs</button>
                    </div>
                </div>
            </div>

            <div className="container main-content">
                <div className="content-wrapper">
                    <div className="left-column">
                        {selectedTab === "overview" && (
                            <div className="tab-section">
                                <div className="card overview-card">
                                    <div className="section-title">
                                        <FaGraduationCap className="section-icon" />
                                        <h3>Giới thiệu khóa học</h3>
                                    </div>
                                    
                                    <div className="overview-description">
                                        {course.description.full.split('\n').map((paragraph, idx) => (
                                            <p key={idx}>{paragraph}</p>
                                        ))}
                                    </div>
                                    
                                    <div className="course-highlights">
                                        <div className="highlight-item">
                                            <div className="highlight-icon">
                                                <FaPlayCircle />
                                            </div>
                                            <div className="highlight-info">
                                                <h4>{course.lessons} bài học</h4>
                                                <p>Video HD chất lượng cao</p>
                                            </div>
                                        </div>
                                        <div className="highlight-item">
                                            <div className="highlight-icon">
                                                <FaLaptopCode />
                                            </div>
                                            <div className="highlight-info">
                                                <h4>{course.projects} dự án thực tế</h4>
                                                <p>Từ cơ bản đến nâng cao</p>
                                            </div>
                                        </div>
                                        <div className="highlight-item">
                                            <div className="highlight-icon">
                                                <FaClock />
                                            </div>
                                            <div className="highlight-info">
                                                <h4>{course.duration}</h4>
                                                <p>Học theo tốc độ của bạn</p>
                                            </div>
                                        </div>
                                        <div className="highlight-item">
                                            <div className="highlight-icon">
                                                <FaBookOpen />
                                            </div>
                                            <div className="highlight-info">
                                                <h4>{course.level}</h4>
                                                <p>Phù hợp mọi trình độ</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="what-you-will-learn-section">
                                        <div className="section-title">
                                            <FaRegLightbulb className="section-icon" />
                                            <h3>Bạn sẽ học được gì</h3>
                                        </div>
                                        <div className="what-you-will-learn-grid">
                                            {course.whatYouWillLearn.map((item, index) => (
                                                <div className="learn-item" key={index}>
                                                    <FaRegCheckCircle className="check-icon" />
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="requirements-section">
                                        <div className="section-title">
                                            <FaLaptopCode className="section-icon" />
                                            <h3>Yêu cầu để tham gia khóa học</h3>
                                        </div>
                                        <ul className="requirements-list">
                                            {course.requirements.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div className="target-audience-section">
                                        <div className="section-title">
                                            <FaUser className="section-icon" />
                                            <h3>Đối tượng phù hợp</h3>
                                        </div>
                                        <ul className="target-audience-list">
                                            {course.targetAudience.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedTab === "curriculum" && (
                            <div className="tab-section">
                                <div className="card curriculum-card">
                                    <div className="section-title">
                                        <FaBookOpen className="section-icon" />
                                        <h3>Nội dung khóa học</h3>
                                    </div>

                                    <div className="overview-description">
                                        {course.description.full.split('\n').map((paragraph, idx) => (
                                            <p key={idx}>{paragraph}</p>
                                        ))}
                                    </div>

                                    <div className="curriculum-meta">
                                        <span><strong>{course.syllabus.length}</strong> phần</span>
                                        <span><strong>{course.lessons}</strong> bài học</span>
                                        <span><strong>{course.duration}</strong> thời lượng</span>
                                    </div>
                                    <div className="course-sections">
                                        {course.syllabus.map((section, sectionIndex) => (
                                            <div className="course-section" key={sectionIndex}>
                                                <div 
                                                    className="section-header" 
                                                    onClick={() => toggleSection(sectionIndex)}
                                                >
                                                    <div className="section-header-left">
                                                        <h4>{section.title}</h4>
                                                        <span className="section-meta">
                                                            <span className="duration">{section.duration}</span>
                                                            <span className="lesson-count">{section.lessons.length} bài học</span>
                                                        </span>
                                                    </div>
                                                    <div className="section-toggle">
                                                        {expandedSections.includes(sectionIndex) ? <FaAngleUp /> : <FaAngleDown />}
                                                    </div>
                                                </div>
                                                {expandedSections.includes(sectionIndex) && (
                                                    <ul className="section-lessons">
                                                        {section.lessons.map((lesson, lessonIndex) => (
                                                            <li key={lessonIndex}>
                                                                <FaPlayCircle className="lesson-icon" />
                                                                <span className="lesson-title">{lesson}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedTab === "instructor" && (
                            <div className="tab-section">
                                <div className="card instructor-card">
                                    <div className="section-title">
                                        <FaChalkboardTeacher className="section-icon" />
                                        <h3>Về giảng viên</h3>
                                    </div>
                                    <div className="instructor-profile">
                                        <div className="instructor-header">
                                            <img src={course.instructorAvatar} alt={course.instructor} className="instructor-avatar" />
                                            <div className="instructor-info">
                                                <h3>{course.instructor}</h3>
                                                <p className="instructor-title">{course.instructorTitle}</p>
                                                <div className="instructor-stats">
                                                    <div className="stat-item">
                                                        <span className="stat-value">15</span>
                                                        <span className="stat-label">Khóa học</span>
                                                    </div>
                                                    <div className="stat-item">
                                                        <span className="stat-value">12.5k+</span>
                                                        <span className="stat-label">Học viên</span>
                                                    </div>
                                                    <div className="stat-item">
                                                        <span className="stat-value">4.9</span>
                                                        <span className="stat-label">Đánh giá</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="instructor-bio">
                                            {course.authorMessage.split('\n').map((paragraph, idx) => (
                                                <p key={idx}>{paragraph}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedTab === "reviews" && (
                            <div className="tab-section">
                                <div className="card reviews-card">
                                    <div className="section-title">
                                        <FaStar className="section-icon" />
                                        <h3>Đánh giá từ học viên</h3>
                                    </div>
                                    <div className="reviews-overview">
                                        <div className="reviews-summary">
                                            <div className="rating-big">
                                                <span className="rating-number">{course.rating}</span>
                                                <div className="rating-stars">
                                                    {renderRatingStars(Math.round(course.rating))}
                                                </div>
                                                <p className="rating-count">{course.totalRatings} đánh giá</p>
                                            </div>
                                            {renderRatingDistribution()}
                                        </div>
                                    </div>
                                    
                                    <div className="reviews-filter">
                                        <h4>Lọc đánh giá</h4>
                                        <div className="filter-buttons">
                                            <button className="filter-btn active">Tất cả</button>
                                            <button className="filter-btn">5 sao</button>
                                            <button className="filter-btn">4 sao</button>
                                            <button className="filter-btn">3 sao</button>
                                            <button className="filter-btn">Có nhận xét</button>
                                        </div>
                                    </div>
                                    
                                    <div className="reviews-list">
                                        {course.comments.map((comment, index) => (
                                            <div className="review-card" key={index}>
                                                <div className="review-header">
                                                    <div className="reviewer-avatar">{comment.avatar}</div>
                                                    <div className="reviewer-info">
                                                        <h4>{comment.user}</h4>
                                                        <div className="review-meta">
                                                            <div className="review-stars">
                                                                {renderRatingStars(comment.rating)}
                                                            </div>
                                                            <span className="review-date">{comment.date}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="review-text">{comment.text}</p>
                                                <div className="review-actions">
                                                    <button className="action-btn"><FaHeart /> Hữu ích</button>
                                                    <button className="action-btn"><FaShare /> Chia sẻ</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="reviews-pagination">
                                        <button className="pagination-btn active">1</button>
                                        <button className="pagination-btn">2</button>
                                        <button className="pagination-btn">3</button>
                                        <button className="pagination-btn">...</button>
                                        <button className="pagination-btn">10</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedTab === "faqs" && (
                            <div className="tab-section">
                                <div className="card faqs-card">
                                    <div className="section-title">
                                        <FaRegLightbulb className="section-icon" />
                                        <h3>Câu hỏi thường gặp</h3>
                                    </div>
                                    <div className="faqs-list">
                                        {course.faqs.map((faq, index) => (
                                            <div className="faq-item" key={index}>
                                                <h4 className="faq-question">{faq.question}</h4>
                                                <p className="faq-answer">{faq.answer}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="more-questions">
                                        <h4>Bạn có câu hỏi khác?</h4>
                                        <p>Liên hệ với chúng tôi qua <a href="#">email</a> hoặc <a href="#">Discord</a> để được hỗ trợ.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="right-column">
                        <div className="course-card">
                            <div className="preview-wrapper">
                                <img src={course.image} alt={course.title} className="course-image" />
                                <div className="preview-overlay">
                                    <button className="preview-btn">
                                        <FaPlayCircle />
                                        <span>Xem giới thiệu</span>
                                    </button>
                                </div>
                            </div>
                            <div className="course-price">
                                <div className="price-tag">
                                    <span className="discounted-price">{course.price.discounted}</span>
                                    <span className="original-price">{course.price.original}</span>
                                </div>
                                <div className="discount-info">
                                    <span className="discount-badge">{course.price.discountPercent}% giảm</span>
                                    <span className="discount-expiry">Kết thúc ngày {course.price.expiry}</span>
                                </div>
                            </div>
                            <div className="card-actions">
                                <button className="btn btn-primary">Đăng ký học ngay</button>
                                <button className="btn btn-outline">Thêm vào giỏ hàng</button>
                            </div>
                            <div className="course-includes">
                                <h4>Khóa học bao gồm:</h4>
                                <ul className="includes-list">
                                    {course.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="course-language">
                                <h4>Ngôn ngữ:</h4>
                                <p>{course.languages.join(", ")}</p>
                            </div>
                            <div className="course-guarantees">
                                <div className="guarantee-item">
                                    <FaShieldAlt className="guarantee-icon" />
                                    <span>Đảm bảo hoàn tiền trong 30 ngày</span>
                                </div>
                                <div className="guarantee-item">
                                    <FaInfinity className="guarantee-icon" />
                                    <span>Truy cập trọn đời</span>
                                </div>
                                <div className="guarantee-item">
                                    <FaCertificate className="guarantee-icon" />
                                    <span>Chứng chỉ hoàn thành</span>
                                </div>
                            </div>
                            <div className="share-course">
                                <p>Chia sẻ khóa học này</p>
                                <div className="social-buttons">
                                    <button className="social-btn facebook">Facebook</button>
                                    <button className="social-btn twitter">Twitter</button>
                                    <button className="social-btn linkedin">LinkedIn</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailPage;