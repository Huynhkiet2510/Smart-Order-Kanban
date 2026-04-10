import React from 'react';
import { Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addCart } from '../../../store/cartSlice';

const DishCard = ({ dish, index }) => {
  const dispatch = useDispatch();

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <div className="h-48 overflow-hidden">
        <img
          src={dish.image}
          alt={dish.name}
          loading={index < 4 ? "eager" : "lazy"}
          fetchpriority={index < 3 ? "high" : "auto"}
          className="w-full h-full object-cover hover:scale-110 transition duration-300"
        />
      </div>

      <div className="flex justify-between items-center p-4">
        <div>
          <h3 className="font-semibold text-base line-clamp-2">{dish.name}</h3>
          <p className="text-red-500 font-bold text-lg mt-2">
            {dish.price?.toLocaleString()}đ
          </p>
        </div>

        {dish.isDisable ? (
          <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1.5 rounded-full border border-red-200 uppercase tracking-wider shadow-sm">
            Hết hàng
          </span>
        ) : (
          <button
            onClick={() => dispatch(addCart(dish))}
            aria-label={`Thêm ${dish.name} vào giỏ hàng`}
            className="mt-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl transition shadow-md hover:shadow-lg"
          >
            <Plus size={20} />
          </button>
        )}
      </div>
    </article>
  );
};

export default React.memo(DishCard); 