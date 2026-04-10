import React, { useState, useMemo, useEffect } from "react";
import { useDish } from "../../../hooks/useDish";
import { Plus, ShoppingBag, Fish } from "lucide-react";
import { addCart } from "../../../store/cartSlice"
import { useDispatch, useSelector } from "react-redux";
import CartOrder from "../CartOrder/CartOrder";
import DishSkeleton from "../../../component/Skeleton/DishSkeleton"

const FIXED_CATEGORIES = [
  { key: "All", label: "Tất cả" },
  { key: "Món chính", label: "Món chính" },
  { key: "Khai vị", label: "Khai vị" },
  { key: "Tráng miệng", label: "Tráng miệng" },
  { key: "Đồ uống", label: "Đồ uống" },
];

const MainPage = () => {
  const { dishes, isLoading } = useDish();
  const [activeTab, setActiveTab] = useState("All");
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const carts = useSelector((state) => state.cart.carts);

  const totalItems = carts.reduce((sum, item) => sum + item.quantity, 0);


  useEffect(() => {
    document.title =
      activeTab === "All"
        ? "Đặc sản Cà Mau - Menu món ăn"
        : `${activeTab} - Đặc sản Cà Mau`;
  }, [activeTab]);

  const filteredDishes = useMemo(() => {
    if (!dishes) return [];
    if (activeTab === "All") return dishes;
    return dishes.filter((d) => d.category === activeTab);
  }, [dishes, activeTab]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Thực đơn
      </h1>

      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-red-600 text-white p-4 rounded-full shadow-2xl hover:bg-red-700 hover:scale-110 transition-all flex items-center group"
      >
        <ShoppingBag size={28} className="group-hover:rotate-12 transition-transform" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[10px] font-black px-2 py-1 rounded-full border-2 border-white animate-bounce">
            {totalItems}
          </span>
        )}
      </button>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {FIXED_CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveTab(cat.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition
              ${activeTab === cat.key
                ? "bg-red-500 text-white shadow"
                : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4 text-center">
        {activeTab === "All" ? "Tất cả món ăn" : activeTab}
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {isLoading ? (
          Array(6).fill(0).map((_, index) => <DishSkeleton key={index} />)
        ) : (
          filteredDishes.map((d) => (
            <article
              key={d.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm"
            >

              <div className="h-48 overflow-hidden">
                <img
                  src={d.image}
                  alt={d.name}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-110 transition duration-300"
                />
              </div>

              <div className="flex justify-between items-center  p-4 text-center">
                <div>
                  <h3 className="font-semibold text-base line-clamp-2">
                    {d.name}
                  </h3>

                  <p className="text-red-500 font-bold text-lg mt-2">
                    {d.price?.toLocaleString()}đ
                  </p>
                </div>

                {d.isDisable === true ? (
                  <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm border border-red-200">
                    Hết hàng
                  </span>
                ) : (
                  <button
                    onClick={() => dispatch(addCart(d))}
                    className="mt-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl transition"
                  >
                    <Plus />
                  </button>
                )}
              </div>
            </article>
          ))
        )}
      </div>

      <CartOrder isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default MainPage;