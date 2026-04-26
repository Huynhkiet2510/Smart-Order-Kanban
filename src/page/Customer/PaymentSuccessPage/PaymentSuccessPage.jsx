import React from "react";
import { CheckCircle2, Home, Package, ArrowRight } from "lucide-react"; 
import { useNavigate } from "react-router-dom";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className=" flex items-center justify-center bg-slate-50 px-4 font-sans">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-xl p-10 text-center border border-gray-50 relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>

        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-5 rounded-full animate-bounce-short">
            <CheckCircle2 className="text-green-600 w-12 h-12" strokeWidth={2.5} />
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
          Thanh toán thành công!
        </h2>

        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          Cảm ơn bạn đã tin tưởng. Đơn hàng của bạn đã được hệ thống ghi nhận và đang được chuẩn bị.
        </p>

        <div className="bg-slate-50 rounded-2xl p-5 text-left mb-8 space-y-3 border border-slate-100">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 uppercase tracking-wider font-medium">Trạng thái</span>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
              ĐÃ XÁC NHẬN
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-700 pt-2 border-t border-slate-200">
           
            <span>Giao hàng dự kiến: <span className="font-semibold text-gray-900">20 - 30 phút</span></span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/track-order")}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3.5 rounded-2xl transition-all active:scale-95"
          >
            <Package size={20} />
            Theo dõi đơn hàng
            <ArrowRight size={16} className="ml-1 opacity-70" />
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-600 font-medium py-3 rounded-2xl transition border border-gray-200"
          >
            <Home size={18} />
            Quay lại trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;