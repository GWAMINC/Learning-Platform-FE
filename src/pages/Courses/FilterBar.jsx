import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const FilterBar = ({ categories, selectedCategory, setSelectedCategory }) => {
    const sliderRef = useRef(null);
    const x = useMotionValue(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isAutoScrolling, setIsAutoScrolling] = useState(true); 

    const sliderWidth = categories.length * 150;
    const containerWidth = 1200;

    useEffect(() => {
        let animationFrameId;

        const scrollStep = () => {
            if (!isDragging && isAutoScrolling && selectedCategory === "All") {
                const newX = x.get() - 0.5;
                if (newX < -(sliderWidth / 2)) {
                    x.set(0);
                } else {
                    x.set(newX);
                }
            }
            animationFrameId = requestAnimationFrame(scrollStep);
        };

        animationFrameId = requestAnimationFrame(scrollStep);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isDragging, x, sliderWidth, isAutoScrolling, selectedCategory]);
    useEffect(() => {
        if (selectedCategory !== "All") {
            setIsAutoScrolling(false);
        } else {
            setIsAutoScrolling(true);
        }
    }, [selectedCategory]);

    const getEmoji = (category) => {
        const emojiMap = {
            "All": "🌈",
            "Web Development": "💻",
            "Data Science": "📊",
            "Machine Learning": "🤖",
            "AI": "🧠",
            "Mobile Development": "📱",
            "Game Development": "🎮",
            "Cyber Security": "🔒",
            "Cloud Computing": "☁️",
            "Blockchain": "⛓️",
            "UI/UX Design": "🎨",
        };
        return emojiMap[category] || "❓";
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        if (category !== "All") {
            setIsAutoScrolling(false);
        } else {
            setIsAutoScrolling(true);
        }
    };

    return (
        <div className="filter-container">
            <motion.div className="filter-wrapper">
                <div className="bubble-container">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="bubble"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 360],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.4,
                            }}
                        />
                    ))}
                </div>

                <motion.div
                    ref={sliderRef}
                    className="category-slider"
                    style={{ x }}
                    drag="x"
                    dragConstraints={{ left: -(sliderWidth / 2), right: 0 }}
                    dragElastic={0.1}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={() => setIsDragging(false)}
                >
                    {[...categories, ...categories].map((category, index) => (
                        <motion.button
                            key={index}
                            className={`category-button ${selectedCategory === category ? "active" : ""}`}
                            onClick={() => handleCategoryClick(category)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {selectedCategory === category && (
                                <motion.div
                                    layoutId="activeBackground"
                                    className="active-background"
                                    initial={false}
                                    transition={{ type: "spring", bounce: 0.5 }}
                                />
                            )}
                            <span className="category-content">
                                {getEmoji(category)} {category}
                            </span>
                        </motion.button>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default FilterBar;