import { useState } from "react";
import { FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa";
import "./List.css";

const List = () => {
    // Dữ liệu khóa học
    const courses = [
        { id: 1, name: "React Basics", description: "Learn the basics of React", createdAt: "2023-01-10", updatedAt: "2023-05-15" },
        { id: 2, name: "Advanced React", description: "State management, hooks, context API", createdAt: "2023-02-14", updatedAt: "2023-06-20" },
        { id: 3, name: "JavaScript Fundamentals", description: "Core JS concepts and ES6+", createdAt: "2022-11-05", updatedAt: "2023-04-11" },
        { id: 4, name: "Node.js & Express", description: "Backend development with Node.js", createdAt: "2023-03-21", updatedAt: "2023-07-30" },
        { id: 5, name: "Fullstack Development", description: "Building end-to-end web applications", createdAt: "2022-12-12", updatedAt: "2023-08-22" },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 3;

    // Tính toán số trang
    const totalPages = Math.ceil(courses.length / coursesPerPage);
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

    return (
        <div className="list-container">
            {/* Nút Create Course */}
            <div className="list-header">
                <h2>Course List</h2>
                <button className="btn-create">
                    <FaPlus /> Create Course
                </button>
            </div>

            {/* Bảng danh sách khóa học */}
            <table className="course-table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Tên khóa học</th>
                    <th>Mô tả</th>
                    <th>Ngày tạo</th>
                    <th>Ngày cập nhật</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {currentCourses.map((course) => (
                    <tr key={course.id}>
                        <td>{course.id}</td>
                        <td>{course.name}</td>
                        <td>{course.description}</td>
                        <td>{course.createdAt}</td>
                        <td>{course.updatedAt}</td>
                        <td className="actions">
                            <button className="btn-view"><FaEye /></button>
                            <button className="btn-edit"><FaEdit /></button>
                            <button className="btn-delete"><FaTrash /></button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Phân trang */}
            <div className="paginationAdmin">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </div>
        </div>
    );
};

export default List;
