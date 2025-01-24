import React from 'react';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="homepage">
            <section className="slide welcome-slide">
                <div className="content">
                    <h1>Welcome</h1>
                    <p>Discover a world of learning opportunities</p>
                </div>
            </section>
            <section className="slide courses-slide">
                <div className="content">
                    <h2>Diverse Courses</h2>
                    <p>Explore our wide range of courses designed for everyone.</p>
                </div>
            </section>
            <section className="slide features-slide">
                <div className="content">
                    <h2>Platform Features</h2>
                    <p>Enjoy powerful tools to enhance your learning experience.</p>
                </div>
            </section>
            <section className="slide membership-slide">
                <div className="content">
                    <h2>Membership Discounts</h2>
                    <p>Join us and get exclusive discounts on courses.</p>
                </div>
            </section>
            <footer className="slide footer-slide">
                <div className="content">
                    <p>&copy; 2025 Learning Platform. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;