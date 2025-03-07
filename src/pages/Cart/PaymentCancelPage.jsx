import { useEffect } from 'react';
import './PaymentCancelPage.css';

const PaymentCancelPage = () => {
    useEffect(() => {
        document.title = 'Thanh toán thất bại';
    }, []);

    return (
        <div className="payment-container cancel">
            <div className="payment-card">
                <div className="payment-icon">❌</div>
                <h2>Thanh toán thất bại!</h2>
                <p>Giao dịch đã bị hủy. Bạn có thể an toàn tắt trang popup này.</p>
            </div>
        </div>
    );
};

export default PaymentCancelPage;
