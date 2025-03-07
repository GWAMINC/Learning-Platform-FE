import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/payment';

export const createOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/create-order`, orderData, {withCredentials : true});
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi tạo đơn hàng:', error);
        throw error;
    }
};
