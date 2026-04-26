import React, { useState } from "react";
import { Search, Plus, User } from "lucide-react";
import { setSearchQuery } from "../../store/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CreateOrderModal from "../CreateOrder/CreateOrderModal";
import NotificationBell from "../NotificationBell/NotificationBell"
import { useAuth } from "../../contexts/AuthContext";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const { user } = useAuth();

  const isOrderPage = location.pathname === "/admin/orders";
  const searchQuery = useSelector((state) => state.orders.searchQuery);


  return (
    <nav className="h-16 bg-white px-6 flex items-center justify-between border-b border-gray-100 shadow-lg">
      <div className="flex-1 max-w-md">
        <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            placeholder="Tìm đơn hàng..."
            className="bg-transparent outline-none ml-2 w-full text-sm text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {isOrderPage && (
          <Button
            onClick={() => setIsOpen(true)}
            type="primary"
            icon={<PlusOutlined />}
          >
            <span className="text-sm font-medium">Tạo đơn</span>
          </Button>
        )}

        <div className="relative">

          <NotificationBell />

        </div>

        <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
          <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">
            {user?.displayName}
          </span>
          <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center flex-shrink-0">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-sm font-medium text-gray-600">
                {user?.displayName?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <CreateOrderModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;