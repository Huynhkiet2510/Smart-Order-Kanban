import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Clock, MapPin, Phone, Trash2 } from "lucide-react";
import { useOrderActions } from "./useOrderActions";


const OrderCard = ({ order, index }) => {

  const { removeOrder } = useOrderActions();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-700",
      preparing: "bg-blue-100 text-blue-700",
      delivering: "bg-purple-100 text-purple-700",
      completed: "bg-green-100 text-green-700",
    };
    return styles[status] || "bg-gray-100 text-gray-700";
  };

  const statusMap = {
    pending: "Chờ xử lý",
    preparing: "Đang chuẩn bị",
    delivering: "Đang giao hàng",
    completed: "Hoàn thành",
  };


  const date = new Date(order.createdAt);

  const seconds = (Date.now() - date.getTime()) / 1000;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let timeDisplay;

  if (minutes < 1) {
    timeDisplay = "1 phút trước";
  } else if (minutes < 60) {
    timeDisplay = `${minutes} phút trước`;
  } else if (hours < 24) {
    timeDisplay = `${hours} giờ trước`;
  } else {
    timeDisplay = `${days} ngày trước`;
  }


  return (
    <Draggable draggableId={order.id} index={index}>
      {(provided, snapshot) => (
        <article
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}

          className={`bg-white p-4 space-y-2 rounded-2xl flex flex-col shadow-sm border transition-all duration-300 ${snapshot.isDragging ? "shadow-2xl ring-2 ring-blue-400" : ""
            } 
          ${order.isHighlight
              ? "border-green-500 ring-2 ring-green-200 z-10 scale-[1.02]"
              : order.isDimmed
                ? "opacity-40 grayscale-[0.5] border-gray-100"
                : "border-gray-100"
            }`}
        >
          <header className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <h3 className="text-[15px] font-bold text-gray-900 leading-tight">
                {order.customerName}
              </h3>
              <div className="flex items-center text-[11px] text-gray-500 gap-1.5">
                <div className="flex items-center gap-1">
                  <Phone size={11} className="text-gray-400" />
                  {order.phone}
                </div>
              </div>
            </div>
            <div className="flex items-center text-[9px] text-gray-400 font-medium bg-gray-50 px-2 py-0.5 rounded-full">
              <Clock size={10} className="mr-1" />
              {timeDisplay}
            </div>
          </header>

          <section className="flex-1 space-y-2">
            <div className="space-y-1">
              {order.items && order.items.length > 0 ? (
                order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start">
                    <p className="text-sm font-medium text-gray-800 flex-1">
                      • {item.itemName}
                    </p>
                    <span className="text-[10px] text-gray-400 font-normal ml-2">
                      x{item.quantity}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 italic">Không có thông tin món</p>
              )}

         
              {order.note && (
                <p className="text-[11px] text-orange-500 italic mt-1">
                  *{order.note}
                </p>
              )}
            </div>

            {/* Địa chỉ */}
            <div className="flex items-start gap-1 text-[11px] text-gray-500">
              <MapPin size={12} className="mt-0.5 flex-shrink-0" />
              <p className="line-clamp-1">{order.address}</p>
            </div>

            {/* Trạng thái và Tổng tiền */}
            <div className="flex justify-between items-center pt-1 border-t border-dashed border-gray-100 mt-2">
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${getStatusBadge(order.status)}`}>
                {statusMap[order.status] || order.status}
              </span>
              <div className="text-right">
                <p className="text-[10px] text-gray-400 font-normal">Tổng cộng:</p>
                <span className="text-sm font-bold text-blue-600">
                  {formatPrice(order.totalAmount)}
                </span>
              </div>
            </div>
          </section>

          {order.columnId === 1 && (
            <footer>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeOrder(order.id);
                }}
                className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white text-[11px] py-2 rounded-lg transition-all font-bold border border-red-100"              >
                <Trash2 size={12} />
                Hủy đơn hàng
              </button>
            </footer>
          )}
        </article>
      )}
    </Draggable>
  );
};

export default OrderCard;