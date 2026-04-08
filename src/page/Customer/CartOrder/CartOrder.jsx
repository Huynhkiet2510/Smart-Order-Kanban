import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Plus, Minus } from 'lucide-react';
import { increaseQty, decreaseQty } from '../../../store/cartSlice';
import { useNavigate } from 'react-router-dom';

const CartOrder = ({ isOpen, onClose }) => {
  const carts = useSelector(state => state.cart.carts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={onClose}
      />

      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl p-6 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
        }`}>


        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Giỏ hàng của bạn</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        {carts.length === 0 ? (
          <p className="text-gray-500 italic text-center">Giỏ hàng trống</p>
        ) : (
          <ul className="overflow-y-auto max-h-[calc(100vh-180px)] space-y-4">
            {carts.map((item) => (
              <li key={item.id} className="flex gap-3 border-b pb-3">

                <img
                  src={item.image || "https://via.placeholder.com/80"}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.price?.toLocaleString()}đ
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => dispatch(decreaseQty(item.id))}
                      className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="min-w-[24px] text-center font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => dispatch(increaseQty(item.id))}
                      className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="text-right font-bold text-red-500">
                  {(item.price * item.quantity).toLocaleString()}đ
                </div>
              </li>
            ))}
          </ul>
        )}

        {carts.length > 0 && (
          <>
            <div className="mt-4 flex justify-between font-bold text-lg">
              <span>Tổng:</span>
              <span className="text-red-500">
                {carts
                  .reduce((total, item) => total + item.price * item.quantity, 0)
                  .toLocaleString()}đ
              </span>
            </div>

            <button
              onClick={() => navigate("/checkout")}

              className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-bold transition">
              Thanh toán
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default CartOrder;