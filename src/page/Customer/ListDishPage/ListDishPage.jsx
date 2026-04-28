import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { ShoppingBag } from "lucide-react";
import { useDish } from "../../../hooks/useDish";
import CartOrder from "../CartOrder/CartOrder";
import DishSkeleton from "../../../component/Skeleton/DishSkeleton";
import DishCard from "./DishCard";
import CategoryBar from "./CategoryBar";

const ListDishPage = () => {
  const { dishes, isLoading } = useDish();
  const [activeTab, setActiveTab] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const carts = useSelector((state) => state.cart.carts);

  const totalItems = useMemo(() =>
    carts.reduce((sum, item) => sum + item.quantity, 0),
    [carts]);

  // useEffect(() => {
  //   document.title = activeTab === "All"
  //     ? "Đặc sản Cà Mau - Menu món ăn"
  //     : `${activeTab} - Đặc sản Cà Mau`;
  // }, [activeTab]);

  const filteredDishes = useMemo(() => {
    if (!dishes) return [];
    return activeTab === "All"
      ? dishes
      : dishes.filter((d) => d.category === activeTab);
  }, [dishes, activeTab]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 pb-20">
      <h1 className="text-2xl md:text-3xl font-bold text-center my-8 text-gray-800">
        Thực đơn đặc sản
      </h1>

      <button
        onClick={() => setIsOpen(true)}
        aria-label={`Xem giỏ hàng với ${totalItems} sản phẩm`}
        className="fixed bottom-8 right-8 z-40 bg-red-600 text-white p-4 rounded-full shadow-2xl hover:bg-red-700 hover:scale-110 transition-all flex items-center group"
      >
        <ShoppingBag size={28} className="group-hover:rotate-12 transition-transform" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[10px] font-black px-2 py-1 rounded-full border-2 border-white animate-bounce">
            {totalItems}
          </span>
        )}
      </button>

      <CategoryBar activeTab={activeTab} onSelect={setActiveTab} />

      <h2 className="text-xl font-semibold mb-6 text-center text-gray-700">
        {activeTab === "All" ? "Tất cả món ăn" : activeTab}
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {isLoading ? (
          Array(6).fill(0).map((_, i) => <DishSkeleton key={i} />)
        ) : (
          filteredDishes.map((dish, index) => (
            <DishCard key={dish.id} dish={dish} index={index} />
          ))
        )}
      </div>

      <CartOrder isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default ListDishPage;