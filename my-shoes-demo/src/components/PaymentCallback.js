import { useEffect, useState } from "react";
import Loading from "./Loading";
import fetchAPI from "../config/axiosConfig";
import { useNavigate } from "react-router-dom";

const PAYMENT_URL = "/payment/vnpay/verify"
function PaymentCallback() {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const handlePayment = async () => {
        try {
            const body = {};
            params.forEach((value, key) => {
                body[key] = value
            })
            console.log(body);

            await fetchAPI.post(PAYMENT_URL, body);
            navigate("/payment-success");
        } catch (error) {
            console.log(error);
            navigate("/payment-error");
        }
    }
    handlePayment();
    return isLoading ? <Loading /> : <></>
}

export default PaymentCallback;