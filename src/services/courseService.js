import axios from "axios";

const API_BASE = "http://localhost:8080/api/course";

const getAllCourses = async () => {
    try {
        const response = await axios.get(`${API_BASE}/list`, { withCredentials: true });
        response.data.forEach(course => {
            course.price = JSON.parse(course.price);
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching all courses:", error);
        return [];
    }
}


const createCourse = async (title, description, categories, price, currency) => {
    try {
        const response = await axios.post(`${API_BASE}/create`, {
            title: title,
            description: description,
            categories: categories,
            price: price,
            currency: currency
        }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error creating course:", error);
        throw error;
    }
}
const getAllCategories = async () => {
    try {
        const response = await axios.get(`${API_BASE}/category/all`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching all categories:", error);
        return [];
    }
};

const addCategory = async (name, description) => {
    try {
        const response = await axios.post(`${API_BASE}/category/create`, {
            name: name,
            description: description
            }, {withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error adding category:", error);
        throw error;
    }
};

const editCategory = async (id, name, description) => {
    try {
        const response = await axios.post(`${API_BASE}/category/update`, {
            id : id,
            name: name,
            description: description
            },
            {withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error editing category:", error);
        throw error;
    }
};

const deleteCategory = async (id) => {
    try {
        await axios.delete(`${API_BASE}/category/delete`, {
            params: { id: id },
            withCredentials: true,
        });
    } catch (error) {
        console.error("Error deleting category:", error);
        throw error;
    }
};


export default {getAllCourses, createCourse, getAllCategories, addCategory, editCategory, deleteCategory };