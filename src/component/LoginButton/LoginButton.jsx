import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const LoginButton = () => {
    const { loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const { role: currentRole } = await loginWithGoogle();
            console.log("Role vừa nhận được:", currentRole);
            if (currentRole === "admin") {
                navigate("/order");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
        }
    };

    return (
        <div className="mt-2">
            <button
                onClick={handleLogin}
                className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2.5 rounded-lg bg-white hover:bg-gray-50 transition shadow-sm"
            >
                <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="google"
                    className="w-5 h-5"
                />
                <span className="text-sm font-medium text-gray-700">
                    Đăng nhập với Google
                </span>
            </button>
        </div>
    );
};

export default LoginButton;