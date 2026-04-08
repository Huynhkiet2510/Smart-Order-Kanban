import React from "react";
import { CheckCircle, Home, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-lg p-8 text-center border border-gray-100">
        
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="text-green-500 w-10 h-10" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Thanh toán thành công 🎉
        </h2>

        <p className="text-gray-500 text-sm mb-6">
          Đơn hàng của bạn đã được ghi nhận. Chúng tôi sẽ xử lý và giao hàng sớm nhất!
        </p>

        <div className="bg-gray-50 rounded-xl p-4 text-left mb-6">
          <p className="text-sm text-gray-600">
            📦 Trạng thái: <span className="font-semibold text-green-600">Đã xác nhận</span>
          </p>
          <p className="text-sm text-gray-600 mt-1">
            ⏱ Thời gian giao dự kiến: 20 - 30 phút
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-xl transition"
          >
            <Home size={18} />
            Trang chủ
          </button>

          <button
            onClick={() => navigate("/track-order")}
            className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition shadow"
          >
            <ShoppingCart size={18} />
            Đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;