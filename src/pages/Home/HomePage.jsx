import React from 'react';
import { motion } from "framer-motion";
import './HomePage.css';

const sections = [
    { title: "Welcome", text: "Discover a world of learning opportunities" },
    { title: "Diverse Courses", text: "Explore our wide range of courses designed for everyone." },
    { title: "Platform Features", text: "Enjoy powerful tools to enhance your learning experience." },
    { title: "Membership Discounts", text: "Join us and get exclusive discounts on courses." },
];

const HomePage = () => {
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
                    </div>
                    <ul className="nav-links">
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
                    </ul>
                </div>
            </motion.nav>

            {/* Background Gradient & Bubbles */}
            <div className="background">
                <div className="bubbles-container1">
                    {[...Array(15)].map((_, index) => (
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
            </div>

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
                        </div>
                    </motion.section>
                ))}
            </div>
        </div>
    );
};

export default HomePage;