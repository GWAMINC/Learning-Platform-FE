import {useEffect, useState} from "react";
import { FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa";
import "./CategoriesList.css";
import courseService from "../../../services/courseService.js";
import EditModal from "./EditModal.jsx";

const CategoriesList = () => {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({ name: "", description: "" });
    const categoriesPerPage = 5;

    // Tính toán số trang
    const totalPages = categories && categories.length > 0
        ? Math.ceil(categories.length / categoriesPerPage) : 0;
    const indexOfLastCategories = currentPage * categoriesPerPage;
    const indexOfFirstCategories = indexOfLastCategories - categoriesPerPage;
    const currentCategories = (categories || []).slice(indexOfFirstCategories, indexOfLastCategories);

    const fetchCategories = async () => {
        const categoriesData = await courseService.getAllCategories();
        setCategories(categoriesData.categories);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAddCategory = async () => {
        try {
            await courseService.addCategory(currentCategory.name, currentCategory.description);
            fetchCategories();
            setIsModalOpen(false);
            setCurrentCategory({ name: "", description: "" });
        } catch (error) {
            console.error("Failed to add category:", error);
        }
    };

    const handleEditCategory = async () => {
        try {
            await courseService.editCategory(currentCategory.id, currentCategory.name, currentCategory.description);
            fetchCategories();
            setIsModalOpen(false);
            setCurrentCategory({ name: "", description: "" });
        } catch (error) {
            console.error("Failed to edit category:", error);
        }
    }

    const handleDeleteCategory = async (id) => {
        const isConfirmed = window.confirm("Danh mục này có thể thuộc về một số khóa học. Bạn có chắc chắn muốn xóa không?");
        if (isConfirmed)
        {
            try {
                await courseService.deleteCategory(id);
                setCategories(categories.filter((category) => category.id !== id));
            } catch (error) {
                console.error("Error deleting category:", error);
            }
    }   };

    const openAddModal = () => {
        setIsEditing(false);
        setCurrentCategory({ name: "", description: "" });
        setIsModalOpen(true);
    };

    const openEditModal = (category) => {
        setIsEditing(true);
        setCurrentCategory(category);
        setIsModalOpen(true);
    };return (
        <div className="list-container">
            <div className="list-header">
                <h2>Category List</h2>
                <button className="btn-create" onClick={openAddModal}>
                    <FaPlus /> Create Category
                </button>
            </div>

            <table className="category-table">
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
                {currentCategories.map((category) => (
                    <tr key={category.id}>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
                        <td>{category.description}</td>
                        <td>{category.createdAt}</td>
                        <td>{category.updatedAt}</td>
                        <td className="actions">
                            <button className="btn-view"><FaEye /></button>
                            <button className="btn-edit" onClick={() => openEditModal(category)}><FaEdit /></button>
                            <button className="btn-delete" onClick={() => handleDeleteCategory(category.id)}><FaTrash /></button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="paginationAdmin">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </div>

            <EditModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h3>{isEditing ? "Edit Category" : "Create Category"}</h3>
                <input
                    type="text"
                    placeholder="Name"
                    value={currentCategory.name}
                    onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={currentCategory.description}
                    onChange={(e) => setCurrentCategory({ ...currentCategory, description: e.target.value })}
                />
                <button onClick={isEditing ? handleEditCategory : handleAddCategory}>
                    {isEditing ? "Save Changes" : "Create Category"}
                </button>
            </EditModal>
        </div>
    );
};

export default CategoriesList;
