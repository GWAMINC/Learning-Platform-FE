import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState({
        userId: 2,
        courseId: 101,
        amount: 100.00,
        totalAmount: 100.00,
    });

    const handleProceedToCheckout = () => {
        navigate('/order/confirm', { state: cart });
    };

    return (
        <div>
            <h2>Giỏ hàng</h2>
            <p>Khóa học: Advanced Course</p>
            <p>Giá: 100 USD</p>
            <button onClick={handleProceedToCheckout}>Tiến hành đặt hàng</button>
        </div>
    );
};

export default CartPage;