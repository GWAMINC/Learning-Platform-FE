import axios from "axios";

const API_BASE = "http://localhost:8080/api/user";

const getUserById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE}/${id}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};

const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE}/all`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all users:", error);
        return [];
    }
};

const login = async (email, password) => {
    try {
        const response = await axios.post(
            `${API_BASE}/login`,
            { email, password },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { success: false, message: "Lỗi không xác định" };
    }
};

export default { getUserById, getAllUsers, login };
