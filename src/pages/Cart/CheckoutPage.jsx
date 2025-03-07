import { useLocation } from 'react-router-dom';
import { createOrder } from '../../services/paymentService';

const CheckoutPage = () => {
    const location = useLocation();
    const orderData = location.state;

    const handlePayment = async () => {
        try {
            const checkoutLink = await createOrder(orderData);

            // Mở PayPal trong popup (width: 500px, height: 700px)
            const paypalWindow = window.open(
                checkoutLink,
                'paypalCheckout',
                'width=500,height=700,left=100,top=100'
            );

            // Kiểm tra nếu popup bị chặn
            if (!paypalWindow) {
                alert('Trình duyệt đã chặn popup! Vui lòng cho phép popup để tiếp tục.');
            }
        } catch (error) {
            alert('Lỗi khi tạo đơn hàng');
        }
    };

    return (
        <div>
            <h2>Xác nhận đơn hàng</h2>
            <p>Địa chỉ giao hàng: {orderData.shippingAddress}</p>
            <p>Tổng tiền: {orderData.totalAmount} USD</p>
            <button onClick={handlePayment}>Thanh toán qua PayPal</button>
        </div>
    );
};

export default CheckoutPage;
