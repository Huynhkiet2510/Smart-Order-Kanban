import { Navigate, Outlet, useLocation } from "react-router-dom";

const PaymentSuccessRoute = () => {
    const location = useLocation();

    console.log("Full Location Object:", location);
    console.log("State hiện tại:", location.state);

    if (!location.state || location.state.fromPayment !== true) {
        console.warn("Truy cập bị chặn: Không tìm thấy state fromPayment");
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default PaymentSuccessRoute;