import React, { useState, useMemo } from 'react';
import { Table, DatePicker, Input } from 'antd';
import { SearchOutlined, HistoryOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useOrderCards } from '../../../hooks/useOrderCard';
import { useHistoryAction } from './useHistoryAction';
import DetailModal from './DetailModal';
import { getHistoryColumns, formatPrice } from './Column';
import RevenueChart from "./RevenueChart"
import TopProductsChart from './TopProductsChart';

const History = () => {
    const { orders } = useOrderCards();
    const [selectedDate, setSelectedDate] = useState(null);
    const [searchText, setSearchText] = useState("");

    const {
        handleViewDetail,
        isOpenDetailModal,
        selectOrder,
        setIsOpenDetailModal
    } = useHistoryAction();

    const columns = useMemo(() => getHistoryColumns(handleViewDetail), [handleViewDetail]);

    const removeVietnameseTones = (str) => {
        if (!str) return "";

        return String(str)
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .toLowerCase();
    };



    const filteredData = useMemo(() => {
        const lowerSearchText = removeVietnameseTones(searchText.trim());

        return orders.filter((item) => {
            const dateMatch = !selectedDate
                ? true
                : dayjs(item.createdAt?.toDate?.() || item.createdAt).isSame(selectedDate, "day");

            const searchMatch = !lowerSearchText
                ? true
                : (
                    removeVietnameseTones(item.customerName || "").includes(lowerSearchText) ||
                    removeVietnameseTones(String(item.phone || "")).includes(lowerSearchText)
                );

            return dateMatch && searchMatch;
        });
    }, [orders, selectedDate, searchText]);

    return (
        <div className="h-full flex flex-col p-6 space-y-5 bg-gray-100 ">
            <RevenueChart orders={orders} />
            <TopProductsChart orders={orders} />
            <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col h-full ">
                <div className='flex justify-between items-center mb-5 flex-shrink-0'>
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <HistoryOutlined className="text-blue-500 text-lg" />
                        Lịch sử đơn hàng
                    </h3>

                    <div className='flex items-center gap-3'>
                        <Input
                            placeholder="Tìm khách hàng, SĐT..."
                            prefix={<SearchOutlined className="text-gray-400" />}
                            className="w-[280px]"
                            allowClear
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <DatePicker
                            format="DD/MM/YYYY"
                            placeholder="Chọn ngày lọc"
                            className="w-[160px]"
                            onChange={(date) => setSelectedDate(date)}
                        />
                    </div>
                </div>

                <div className="flex-1 min-h-0  flex flex-col">
                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        rowKey="id"
                        scroll={{ y: 'calc(100vh - 320px)', x: 800 }}

                        pagination={{
                            pageSize: 10,
                            showTotal: (total) => `Tổng cộng ${total} đơn hàng`,
                            className: "mt-4",
                            placement: "bottomRight"
                        }}
                        className="flex-1"
                    />
                </div>

                {isOpenDetailModal && (
                    <DetailModal
                        order={selectOrder}
                        onClose={() => setIsOpenDetailModal(false)}
                        formatPrice={formatPrice}
                    />
                )}
            </div>
        </div>
    );
};

export default History; 