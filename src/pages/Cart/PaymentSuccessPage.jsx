import { useSearchParams } from 'react-router-dom';
import {useEffect} from "react";
import './PaymentSuccessPage.css';

const PaymentSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('orderId');

    useEffect(() => {
        document.title = 'Thanh toán thành công';
    }, []);
    return (
        <div className="payment-container success">
            <div className="payment-card">
                <div className="payment-icon">🎉</div>
                <h2>Thanh toán thành công!</h2>
                <p>Mã đơn hàng: {orderId}</p>
                <p>Bạn có thể an toàn tắt trang popup này.</p>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
