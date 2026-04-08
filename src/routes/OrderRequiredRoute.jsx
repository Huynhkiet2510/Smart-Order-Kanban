import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const CheckoutRoute = () => {
    const carts = useSelector(state => state.cart.carts)

    if (carts.length === 0) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default CheckoutRoute;