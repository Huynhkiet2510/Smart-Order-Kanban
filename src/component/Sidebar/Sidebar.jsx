import { ClipboardList, Utensils, History, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const menuItems = [
  {
    id: 1,
    title: "Quản lý đơn hàng",
    icon: ClipboardList,
    path: "/admin/orders",
  },

  {
    id: 2,
    title: "Lịch sử đơn hàng",
    icon: History,
    path: "/admin/history",
  },
  {
    id: 3,
    title: "Quản lý món ăn",
    icon: Utensils,
    path: "/admin/dishes",
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { logout } = useAuth();

  const handleLogout = async () => {
        try {
            await logout(); 
            navigate("/login");
        } catch (error) {
            console.error("Lỗi đăng xuất:", error);
        }
    };

  return (
    <div className="w-[260px] h-screen bg-slate-900 text-white flex flex-col justify-between px-4 py-6 border-r border-slate-800">

      <div>
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center rounded-xl font-bold text-lg shadow-lg">
            K
          </div>
          <div>
            <div className="font-semibold text-white text-base">
              HTK 
            </div>
            <div className="text-xs text-gray-400">
              Food Admin
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <div
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                  transition-all duration-200
                  ${isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-300 hover:bg-slate-800 hover:text-white"
                  }
                `}
              >
                <Icon
                  size={20}
                  className={`${isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                    }`}
                />
                <span className="text-sm font-medium">
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <button
        onClick={handleLogout}
          className="w-full flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-red-500 transition-all duration-200 text-sm"
        >
          <LogOut size={18} />
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Sidebar;