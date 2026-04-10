import React from 'react';
import { MoreHorizontal, GripVertical } from "lucide-react";
import OrderCard from '../OrderCard/OrderCard';
import { useOrderCards } from "../../hooks/useOrderCard";
import { Droppable } from '@hello-pangea/dnd';
import { useSelector } from 'react-redux';
import { InboxOutlined } from "@ant-design/icons";

const Column = ({ title, color, columnId }) => {
    const { orders } = useOrderCards();
    const searchQuery = useSelector((state) => state.orders.searchQuery);

    let filteredOrders = orders.filter(order => order.columnId === columnId);
    if (columnId === 4) {
        const now = new Date().getTime();
        const oneDayInMs = 24 * 60 * 60 * 1000;
        filteredOrders = filteredOrders.filter(order => {
            if (!order.createdAt) return false;
            const orderTime = order.createdAt?.toDate
                ? order.createdAt.toDate().getTime()
                : new Date(order.createdAt).getTime();
            return (now - orderTime) <= oneDayInMs;
        });
    }

    const processedOrders = filteredOrders.map(order => {
        const searchLower = searchQuery.trim().toLowerCase();
        const isMatched = searchLower !== "" && (
            (order.itemName || "").toLowerCase().includes(searchLower) ||
            (order.customerName || "").toLowerCase().includes(searchLower) ||
            (order.phone || "").includes(searchLower)
        );
        return {
            ...order,
            isHighlight: searchLower !== "" && isMatched,
            isDimmed: searchLower !== "" && !isMatched
        };
    });

    return (
        <div className="bg-[#F2F2F2] w-[280px] rounded-2xl p-2 h-full border border-gray-200 flex flex-col">
            <div className="flex justify-between items-center mb-4 flex-shrink-0">
                <div className="flex gap-2 items-center">
                    <GripVertical size={18} className="text-gray-500" />
                    <h3 className={`px-2 py-1 rounded text-sm font-bold ${color}`}>{title}</h3>
                    <span className="bg-white px-2 py-0.5 rounded-md text-xs shadow-sm font-medium">
                        {processedOrders.length}
                    </span>
                </div>
                <div className="flex gap-2 items-center text-gray-600">
                    <MoreHorizontal size={18} className="cursor-pointer hover:bg-gray-200 rounded" />
                </div>
            </div>

            <Droppable droppableId={columnId.toString()}>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`flex-1 min-h-[450px] overflow-y-auto custom-scrollbar flex flex-col gap-3 p-1 transition-colors duration-200 ${snapshot.isDraggingOver ? "bg-gray-300/20 rounded-xl" : ""
                            }`}
                    >
                        {processedOrders.length > 0 ? (
                            processedOrders.map((order, index) => (
                                <OrderCard key={order.id} order={order} index={index} />
                            ))
                        ) : (
                            !snapshot.isDraggingOver && (
                                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 opacity-30 select-none">
                                    <InboxOutlined style={{ fontSize: '48px' }} />
                                    <p className="mt-2 text-sm font-medium">Chưa có đơn hàng</p>
                                </div>
                            )
                        )}

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Column;