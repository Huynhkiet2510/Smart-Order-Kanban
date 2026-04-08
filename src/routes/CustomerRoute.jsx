import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const CustomerRoute = () => {
    const { user, role, loading } = useAuth();

    if (loading) return <div className="p-10 text-center">Đang tải quyền truy cập...</div>;

    if (!user || role !== "customer") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default CustomerRoute;