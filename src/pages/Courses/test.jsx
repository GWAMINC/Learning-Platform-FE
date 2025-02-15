// import React, { useRef, useEffect, useState } from "react";
// import { motion, useMotionValue, useTransform } from "framer-motion";
// import "./CoursesPage.css";

// const FilterBar = ({ categories, selectedCategory, setSelectedCategory }) => {
//     const sliderRef = useRef(null);
//     const x = useMotionValue(0);
//     const xInput = [-100, 0, 100];
//         const background = useTransform(x, xInput, [
//             "linear-gradient(180deg, #D9BBA0 0%, #A67C65 100%)", // Warm beige to coffee
//             "linear-gradient(180deg, #8C7A67 0%, #4A4238 100%)", // Muted brown to deep taupe
//             "linear-gradient(180deg, #E4D9C5 0%, #B5A28D 100%)"  // Cream to light khaki
//         ]);
//     const [isDragging, setIsDragging] = useState(false);

//     // Hàm tự động cuộn
//     useEffect(() => {
//         const autoScroll = setInterval(() => {
//             if (!isDragging) {
//                 x.set(x.get() - 1); // Di chuyển sang trái
//             }
//         }, 30); // Tốc độ cuộn (ms)

//         return () => clearInterval(autoScroll); // Dọn dẹp interval khi component unmount
//     }, [isDragging, x]);

//     const getEmoji = (category) => {
//         const emojiMap = {
//             "All": "🌈",
//             "Web Development": "💻",
//             "Data Science": "📊",
//             "Machine Learning": "🤖",
//             "AI": "🧠",
//             "Mobile Development": "📱",
//             "Game Development": "🎮",
//             "Cyber Security": "🔒",
//             "Cloud Computing": "☁️",
//             "Blockchain": "⛓️",
//             "UI/UX Design": "🎨",
//         };
//         return emojiMap[category] || "❓";
//     };

//     return (
//         <div className="filter-container">
//                     <motion.div className="filter-wrapper" style={{ background }}>
//                         {/* Background animated bubbles */}
//                 <div className="bubble-container">
//                     {[...Array(5)].map((_, i) => (
//                         <motion.div
//                             key={i}
//                             className="bubble"
//                             style={{
//                                 top: `${Math.random() * 100}%`,
//                                 left: `${Math.random() * 100}%`,
//                             }}
//                             animate={{
//                                 scale: [1, 1.2, 1],
//                                 rotate: [0, 360],
//                             }}
//                             transition={{
//                                 duration: 3,
//                                 repeat: Infinity,
//                                 delay: i * 0.4,
//                             }}
//                         />
//                     ))}
//                 </div>

//                 {/* Sliding category buttons */}
//                 <motion.div
//                     ref={sliderRef}
//                     className="category-slider"
//                     style={{ x }}
//                     drag="x"
//                     dragConstraints={{ left: -1000, right: 0 }}
//                     dragElastic={0.2}
//                     onDragStart={() => setIsDragging(true)} // Bắt đầu kéo
//                     onDragEnd={() => setIsDragging(false)} // Kết thúc kéo
//                 >
//                     {[...categories, ...categories].map((category, index) => (
//                         <motion.button
//                             key={index}
//                             className={`category-button ${
//                                 selectedCategory === category ? "active" : ""
//                             }`}
//                             onClick={() => setSelectedCategory(category)}
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                         >
//                             {selectedCategory === category && (
//                                 <motion.div
//                                     layoutId="activeBackground"
//                                     className="active-background"
//                                     initial={false}
//                                     transition={{ type: "spring", bounce: 0.5 }}
//                                 />
//                             )}
//                             <span className="category-content">
//                                 {getEmoji(category)} {category}
//                             </span>
//                         </motion.button>
//                     ))}
//                 </motion.div>
//             </motion.div>

//             {/* Floating decorative emojis */}
//             {["🎈", "⭐", "🎪"].map((emoji, i) => (
//                 <motion.div
//                     key={i}
//                     className="floating-decoration"
//                     style={{
//                         position: "absolute",
//                         top: `${10 + Math.random() * 80}%`,
//                         left: `${5 + Math.random() * 90}%`,
//                         fontSize: `${1.5 + Math.random() * 0.5}rem`,
//                         filter: `drop-shadow(0 0 5px rgba(255, 255, 255, 0.7))`,
//                     }}
//                     animate={{
//                         y: [-20, 20],
//                         rotate: [0, 360],
//                         scale: [1, 1.1, 1],
//                     }}
//                     transition={{
//                         duration: 2 + Math.random(),
//                         repeat: Infinity,
//                         repeatType: "reverse",
//                         delay: i * 0.3,
//                     }}
//                 >
//                     {emoji}
//                 </motion.div>
//             ))}
//         </div>
//     );
// };

// export default FilterBar;