import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import './HomePage.css';

const courses = [
    { id: 1, title: "Web Development", level: "Beginner", duration: "8 weeks", rating: 4.8 },
    { id: 2, title: "Data Science", level: "Intermediate", duration: "12 weeks", rating: 4.9 },
    { id: 3, title: "UI/UX Design", level: "All Levels", duration: "6 weeks", rating: 4.7 },
    { id: 4, title: "Mobile App Development", level: "Advanced", duration: "10 weeks", rating: 4.6 }
];

const testimonials = [
    { name: "HA", role: "Student", text: "Dinh vai looo" },
    { name: "School", role: "Professional", text: "Truong DEPTRAI" },
    { name: "Vuong Nguyen", role: "Educator", text: "Trai đất cảng đầy nắng và gió." }
];

const sections = [
    { 
        title: "Welcome", 
        text: "Discover a world of learning opportunities tailored to your needs and schedule. Our platform brings together top educators and cutting-edge technologies to provide an unmatched educational experience.",
        icon: "🌟"
    },
    { 
        title: "Diverse Courses", 
        text: "Explore our wide range of courses designed for everyone, from beginners to industry professionals. With over 200+ topics across multiple disciplines, you'll find exactly what you need to grow.",
        icon: "📚"
    },
    { 
        title: "Platform Features", 
        text: "Enjoy powerful tools to enhance your learning experience including interactive exercises, real-time feedback, AI-assisted tutoring, and progress tracking to keep you motivated and engaged.",
        icon: "⚙️"
    },
    { 
        title: "Membership Discounts", 
        text: "Join us and get exclusive discounts on courses, early access to new content, monthly webinars with industry experts, and a supportive community to help you along your learning journey.",
        icon: "💎"
    },
];

const HomePage = () => {
    const [activeSection, setActiveSection] = useState(0);
    const [showScrollHint, setShowScrollHint] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedTestimonial, setSelectedTestimonial] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            
            // Calculate which section is currently in view
            const newActiveSection = Math.floor((scrollPosition + windowHeight / 2) / windowHeight);
            setActiveSection(Math.min(newActiveSection, sections.length - 1));
            
            // Hide scroll hint after user starts scrolling
            if (scrollPosition > 100) {
                setShowScrollHint(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const testimonialInterval = setInterval(() => {
            setSelectedTestimonial(prev => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(testimonialInterval);
    }, []);
    
    return (
        <div className="home-container">
            {/* Navbar */}
            <motion.nav 
                className="navbar"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="nav-content">
                    <div className="logo">
                        <svg viewBox="0 0 36 36" id="tanuki-logo" className="is-active">
                            <path id="tanuki-right-ear" className="tanuki-shape" fill="#a3a3a3" d="M2 14l9.38 9v-9l-4-12.28c-.205-.632-1.176-.632-1.38 0z"></path>
                            <path id="tanuki-left-ear" className="tanuki-shape" fill="#a3a3a3" d="M34 14l-9.38 9v-9l4-12.28c.205-.632 1.176-.632 1.38 0z"></path>
                            <path id="tanuki-nose" className="tanuki-shape" fill="#a3a3a3" d="M18,34.38 3,14 33,14 Z"></path>
                            <path id="tanuki-right-eye" className="tanuki-shape" fill="#575757" d="M18,34.38 11.38,14 2,14 6,25Z"></path>
                            <path id="tanuki-left-eye" className="tanuki-shape" fill="#575757" d="M18,34.38 24.62,14 34,14 30,25Z"></path>
                            <path id="tanuki-right-cheek" className="tanuki-shape" fill="#7d7d7d" d="M2 14L.1 20.16c-.18.565 0 1.2.5 1.56l17.42 12.66z"></path>
                            <path id="tanuki-left-cheek" className="tanuki-shape" fill="#7d7d7d" d="M34 14l1.9 6.16c.18.565 0 1.2-.5 1.56L18 34.38z"></path>
                        </svg>
                        <div className="brand-name">EduPlatform</div>
                    </div>

                    {/* Mobile menu toggle */}
                    <div className="mobile-menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>

                    <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                        {["Home", "Courses", "Plan", "Login", "Register"].map((item) => (
                            <motion.li 
                                key={item}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <a href={`#${item.toLowerCase()}`} className="nav-link">
                                    {item}
                                    <span className="link-underline"></span>
                                </a>
                            </motion.li>
                        ))}
                        <motion.li className="theme-toggle-wrapper">
                            <button className="theme-toggle">
                                <span className="sun">☀️</span>
                                <span className="moon">🌙</span>
                            </button>
                        </motion.li>
                    </ul>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <motion.div 
                className="hero-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="hero-content">
                    <motion.h1 
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Transform Your Future Through Learning
                    </motion.h1>
                    <motion.p
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Join thousands of learners expanding their horizons with our premium courses
                    </motion.p>
                    <motion.div 
                        className="hero-cta"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                    >
                        <button className="primary-btn">Explore Courses</button>
                        <button className="secondary-btn">Watch Demo</button>
                    </motion.div>
                    
                    <motion.div
                        className="stats-container"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                    >
                        <div className="stat-item">
                            <div className="stat-number">500+</div>
                            <div className="stat-label">Courses</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">100k+</div>
                            <div className="stat-label">Students</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">98%</div>
                            <div className="stat-label">Satisfaction</div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Section Navigation Dots */}
            <div className="section-navigation">
                {sections.map((_, index) => (
                    <motion.div 
                        key={index}
                        className={`nav-dot ${activeSection === index ? 'active' : ''}`}
                        whileHover={{ scale: 1.2 }}
                        onClick={() => {
                            window.scrollTo({
                                top: index * window.innerHeight,
                                behavior: 'smooth'
                            });
                        }}
                    />
                ))}
            </div>

            {/* Scroll Hint */}
            <AnimatePresence>
                {showScrollHint && (
                    <motion.div 
                        className="scroll-hint"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    >
                        <span>Scroll Down</span>
                        <div className="scroll-arrow">↓</div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Gradient & Bubbles */}
            <div className="background">
                <div className="bubbles-container1">
                    {[...Array(20)].map((_, index) => (
                        <motion.div
                            key={index}
                            className="bubble1"
                            style={{
                                width: `${40 + Math.random() * 80}px`,
                                height: `${40 + Math.random() * 80}px`,
                                left: `${Math.random() * 100}%`,
                            }}
                            initial={{ 
                                y: "120vh",
                                opacity: 0,
                                scale: 0.5,
                            }}
                            animate={{
                                y: "-20vh",
                                opacity: [0, 1, 1, 0],
                                scale: [0.5, 1, 1.2, 0.8],
                            }}
                            transition={{
                                duration: 10 + Math.random() * 10,
                                repeat: Infinity,
                                ease: "linear",
                                delay: index * 0.8
                            }}
                        />
                    ))}
                </div>
                
                <div className="gradient-overlay"></div>
            </div>

            {/* Featured Courses */}
            <motion.div 
                className="featured-courses"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, amount: 0.3 }}
            >
                <h2 className="featured-title">Featured Courses</h2>
                <div className="courses-grid">
                    {courses.map((course) => (
                        <motion.div
                            key={course.id}
                            className="course-card"
                            whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="course-level">{course.level}</div>
                            <h3>{course.title}</h3>
                            <div className="course-info">
                                <span className="duration">{course.duration}</span>
                                <span className="rating">★ {course.rating}</span>
                            </div>
                            <button className="course-btn">View Course</button>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Testimonials */}
            <motion.div 
                className="testimonials"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, amount: 0.3 }}
            >
                <h2 className="testimonials-title">What Our Students Say</h2>
                <div className="testimonials-container">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedTestimonial}
                            className="testimonial"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="quote">"</div>
                            <p className="testimonial-text">{testimonials[selectedTestimonial].text}</p>
                            <div className="testimonial-author">
                                <div className="author-avatar"></div>
                                <div className="author-info">
                                    <div className="author-name">{testimonials[selectedTestimonial].name}</div>
                                    <div className="author-role">{testimonials[selectedTestimonial].role}</div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    
                    <div className="testimonial-dots">
                        {testimonials.map((_, index) => (
                            <div 
                                key={index} 
                                className={`testimonial-dot ${selectedTestimonial === index ? 'active' : ''}`}
                                onClick={() => setSelectedTestimonial(index)}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Sections */}
            <div className="sections-container">
                {sections.map((section, index) => (
                    <motion.section
                        key={index}
                        className="section"
                        initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }} 
                        viewport={{ once: false, amount: 0.3 }}
                    >
                        <div className="section-content">
                            <motion.div 
                                className="section-icon"
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                            >
                                {section.icon}
                            </motion.div>
                            <motion.h2 
                                className="section-title"
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, ease: "easeOut" }}  
                            >
                                {section.title}
                            </motion.h2>
                            <motion.p 
                                className="section-text"
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, ease: "easeOut" }}  
                            >
                                {section.text}
                            </motion.p>
                            <motion.button
                                className="section-cta"
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ delay: 0.6 }}
                            >
                                Learn More
                            </motion.button>
                        </div>
                        <div className="section-image-container">
                            <motion.div 
                                className={`section-image image-${index+1}`}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                            />
                        </div>
                    </motion.section>
                ))}
            </div>

            {/* Newsletter Section */}
            <motion.div 
                className="newsletter-section"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, amount: 0.3 }}
            >
                <div className="newsletter-content">
                    <h2>Stay Updated</h2>
                    <p>Subscribe to our newsletter for the latest courses and exclusive offers</p>
                    <div className="newsletter-form">
                        <input type="email" placeholder="Your email address" />
                        <button className="newsletter-btn">Subscribe</button>
                    </div>
                </div>
            </motion.div>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>EduPlatform</h3>
                        <p>Empowering learners worldwide through accessible, quality education.</p>
                        <div className="social-icons">
                            <a href="#" className="social-icon">
                                <div className="facebook-icon"></div>
                            </a>
                            <a href="#" className="social-icon">
                                <div className="twitter-icon"></div>
                            </a>
                            <a href="#" className="social-icon">
                                <div className="instagram-icon"></div>
                            </a>
                            <a href="#" className="social-icon">
                                <div className="linkedin-icon"></div>
                            </a>
                        </div>
                    </div>
                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Courses</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Contact Us</h3>
                        <ul>
                            <li>info@eduplatform.com</li>
                            <li>+1 (555) 123-4567</li>
                            <li>123 Education St, Learning City</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2025 EduPlatform. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;