import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

function ErrorOrderPage() {
    const navigate = useNavigate();
    return <>
        <Result
            status="error"
            title="Thanh Toán thất bại!"
            subTitle="Thanh toán không thành công vui lòng thanh toán lại!"
            extra={[
                <Button onClick={() => navigate("/order-tracking")} type="primary" key="console">
                    Theo dõi đơn hàng
                </Button>,
                <Button onClick={() => navigate("/")} key="buy">Tiếp tục mua sắm</Button>,
            ]}
        />;
    </>
}

export default ErrorOrderPage;