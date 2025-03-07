import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState({
        userId: 1,
        courseId: 101,
        paymentMethodId: 2,
        amount: 100.00,
        totalAmount: 100.00,
        shippingAddress: '123 Learning Street, Online City',
        notes: 'Please enroll me in the advanced course.'
    });

    const handleCheckout = () => {
        navigate('/checkout', { state: cart });
    };

    return (
        <div>
            <h2>Giỏ hàng</h2>
            <p>Khóa học: Advanced Course</p>
            <p>Giá: 100 USD</p>
            <button onClick={handleCheckout}>Tiến hành thanh toán</button>
        </div>
    );
};

export default CartPage;
