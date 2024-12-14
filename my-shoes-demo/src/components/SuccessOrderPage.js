import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

function SuccessOrderPage() {
    const navigate = useNavigate();
    return <>
        <Result
            status="success"
            title="Chúc mừng bạn đã tạo đơn hàng thành công!"
            subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
            extra={[
                <Button type="primary" key="console" onClick={() => navigate("/order-tracking")}>
                    Theo dõi đơn hàng
                </Button>,
                <Button onClick={() => navigate("/")} key="buy">Tiếp tục mua sắm</Button>,
            ]}
        />;
    </>
}

export default SuccessOrderPage;