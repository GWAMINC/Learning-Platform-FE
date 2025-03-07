import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const OrderPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const cart = location.state;

    const [orderData, setOrderData] = useState({
        ...cart,
        shippingAddress: '',
        notes: '',
        paymentMethodId: 1,
        couponCode: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderData({ ...orderData, [name]: value });
    };

    const handlePlaceOrder = () => {
        navigate('/checkout', { state: orderData });
    };

    return (
        <div>
            <h2>Thông tin đặt hàng</h2>
            <input type="text" name="shippingAddress" placeholder="Địa chỉ giao hàng" value={orderData.shippingAddress} onChange={handleInputChange} />
            <input type="text" name="notes" placeholder="Ghi chú" value={orderData.notes} onChange={handleInputChange} />
            <input type="text" name="couponCode" placeholder="Mã giảm giá" value={orderData.couponCode} onChange={handleInputChange} />
            <select name="paymentMethodId" value={orderData.paymentMethodId} onChange={handleInputChange}>
                <option value={1}>Thanh toán tiền mặt</option>
                <option value={2}>Thanh toán qua PayPal</option>
            </select>
            <button onClick={handlePlaceOrder}>Xác nhận đặt hàng</button>
        </div>
    );
};

export default OrderPage;
