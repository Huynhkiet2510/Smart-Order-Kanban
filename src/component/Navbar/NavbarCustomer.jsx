import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UtensilsCrossed, User, ShoppingBag, LogOut  } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const NavbarCustomer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const dropdownRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await logout(); 
            navigate("/login");
        } catch (error) {
            console.error("Lỗi đăng xuất:", error);
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    <div
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 cursor-pointer group"
                    >
                        <div className="p-2 bg-red-500 rounded-lg text-white group-hover:rotate-12 transition">
                            <UtensilsCrossed size={20} />
                        </div>
                        <span className="text-xl font-bold text-gray-900">
                            Huỳnh <span className="text-red-500">Kiệt</span>
                        </span>
                    </div>

                    <div className="relative" ref={dropdownRef}>
                        {user ? (
                            <div
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <span className="hidden sm:block text-sm font-medium text-gray-700">
                                    {user.displayName || "User"}
                                </span>

                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt="avatar"
                                        className="w-9 h-9 rounded-full object-cover border"
                                    />
                                ) : (
                                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200">
                                        <User size={18} />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => navigate("/login")}
                                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm"
                            >
                                Đăng nhập
                            </button>
                        )}

                        {isOpen && (
                            <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-fadeIn">
                                <button
                                    onClick={() => {
                                        navigate("/profile");
                                        setIsOpen(false);
                                    }}
                                    className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-50 text-sm"
                                >
                                    <User size={16} />
                                    Trang cá nhân
                                </button>

                               
                                <button
                                    onClick={() => navigate("/track-order")}
                                    className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-50 text-sm"
                                >
                                    <ShoppingBag size={16} />
                                    Đơn hàng
                                </button>
                                <button
                                 onClick={handleLogout}
                                    className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-50 text-sm"
                                >
                                    <LogOut  size={16} />
                                    Đăng xuất
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default NavbarCustomer;