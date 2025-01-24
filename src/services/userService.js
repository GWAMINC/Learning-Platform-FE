const API_BASE = 'http://localhost:8080/api/user';

const getUserById = async (id) => {
    try {
        const response = await fetch(`${API_BASE}/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(response);
        const data = await response.json(); // Chuyển đổi JSON từ backend
        console.log(data); // Kiểm tra dữ liệu nhận được
        return data;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};


const getAllUsers = async () => {
    const response = await fetch(`${API_BASE}/all`);
    return response.json();
};

export default { getUserById, getAllUsers };