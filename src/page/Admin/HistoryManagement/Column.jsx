import React from 'react';
import { Space, Button } from 'antd';
import dayjs from "dayjs";

export const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(price);
};

export const getHistoryColumns = (handleViewDetail) => [
    {
        title: "Tên khách hàng",
        dataIndex: "customerName"
    },
    {
        title: "Ngày",
        dataIndex: "createdAt",
        render: (createdAt) => {
            if (!createdAt) return "";
            const date = createdAt.toDate?.() || new Date(createdAt);
            return dayjs(date).format("DD/MM/YYYY"); // Dùng dayjs cho đồng bộ
        },
    },
    {
        title: "Địa chỉ",
        dataIndex: "address"
    },
    {
        title: "Giá",
        dataIndex: "price",
        render: (price) => formatPrice(price),
        sorter: (a, b) => a.price - b.price,
        sortDirections: ['ascend', 'descend', 'ascend'],
    },
    {
        title: "Số điện thoại",
        dataIndex: "phone"
    },
    {
        title: "Hành động",
        render: (_, record) => (
            <Space>
                <Button onClick={() => handleViewDetail(record)}>
                    Xem chi tiết
                </Button>
            </Space>
        ),
    }
];