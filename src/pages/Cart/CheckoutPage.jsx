import { useLocation } from 'react-router-dom';
import { createOrder } from '../../services/paymentService';

const CheckoutPage = () => {
    const location = useLocation();
    const orderData = location.state;

    const handlePayment = async () => {
        try {
            const formattedOrderData = {
                ...orderData,
                paymentMethodId: Number(orderData.paymentMethodId) // Chuyển thành number
            };
            const response = await createOrder(formattedOrderData);
            console.log(response)
            if (formattedOrderData.paymentMethodId === 2) {
                const paypalWindow = window.open(
                    response,
                    'paypalCheckout',
                    'width=500,height=700,left=100,top=100'
                );
                if (!paypalWindow) {
                    alert('Trình duyệt đã chặn popup! Vui lòng cho phép popup để tiếp tục.');
                }
            } else {
                alert('Đặt hàng thành công!');
            }
        } catch (error) {
            alert('Lỗi khi tạo đơn hàng: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Hoàn tất đặt hàng</h2>
            <p>Địa chỉ giao hàng: {orderData.shippingAddress}</p>
            <p>Tổng tiền: {orderData.totalAmount} USD</p>
            <button onClick={handlePayment}>Thanh toán</button>
        </div>
    );
};

export default CheckoutPage;