import { motion } from "framer-motion";
import "./HomePage.css";

const sections = [
    { title: "Welcome", text: "Discover a world of learning opportunities" },
    { title: "Diverse Courses", text: "Explore our wide range of courses designed for everyone." },
    { title: "Platform Features", text: "Enjoy powerful tools to enhance your learning experience." },
    { title: "Membership Discounts", text: "Join us and get exclusive discounts on courses." },
];

const HomePage = () => {
    return (
        <div className="homepage">
            {/* Navbar */}
            <nav className="navbar">
                <ul>
                    <li><a href="/public">Home</a></li>
                    <li><a href="/courses">Courses</a></li>
                    <li><a href="#plan">Plan</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="#register">Register</a></li>
                </ul>
            </nav>

            {/* Background Gradient & Bubbles */}
            <div className="background-gradient">
                <div className="bubbles">
                    {[...Array(10)].map((_, i) => (
                        <span key={i} className="bubble"></span>
                    ))}
                </div>
            </div>

            {/* Sections */}
            <div className="sections">
                {sections.map((section, index) => (
                    <motion.section
                        key={index}
                        className="slide"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: false, amount: 0.5 }}
                    >
                        <div className="content">
                            <h2>{section.title}</h2>
                            <p>{section.text}</p>
                        </div>
                    </motion.section>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
