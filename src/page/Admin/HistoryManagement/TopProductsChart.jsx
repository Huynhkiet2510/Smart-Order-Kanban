import React, { useMemo } from 'react';
import { Bar } from '@ant-design/plots';
import { FireOutlined } from "@ant-design/icons";

const TopProductsChart = ({ orders = [] }) => {
    // Thay đổi logic bên trong useMemo của TopProductsChart
    const data = useMemo(() => {
        const productMap = {};

        orders.forEach((order) => {
            // DUYỆT QUA MẢNG ITEMS THAY VÌ LẤY TRỰC TIẾP
            if (order.items && Array.isArray(order.items)) {
                order.items.forEach(item => {
                    const name = item.itemName || "Không xác định";
                    const qty = Number(item.quantity) || 0;
                    if (qty > 0) {
                        productMap[name] = (productMap[name] || 0) + qty;
                    }
                });
            }
        });

        return Object.keys(productMap)
            .map((name) => ({
                name,
                count: productMap[name],
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    }, [orders]);

    const config = {
        data,
        xField: 'name',
        yField: 'count',
        height: 350,

        label: {
            text: (d) => `${d.count} phần`,
            position: 'right',
            dx: -3,
            style: {
                fill: '#FFFFFF',
                fontWeight: 600,
                fontSize: 12,
            },
        },

        axis: {
            x: {
                labelFontSize: 12,
                labelFontWeight: 'bold',
                title: false,
            },
            y: {
                grid: true,
                gridLineDash: [4, 4],
                title: false,

            },
        },
        style: {
            fill: ({ name }) => {
                // Tự động đổi màu để trông sinh động hơn
                const colors = ['#1890ff', '#2fc25b', '#facc14', '#f04864', '#8543e0'];
                const index = data.findIndex(item => item.name === name);
                return colors[index] || '#1890ff';
            },
            inset: 5,
            radius: 4,
        },
        // Tooltip chuẩn V2
        tooltip: {
            title: 'name',
            items: [{ channel: 'y', name: 'Đã bán', valueFormatter: (v) => `${v} phần` }],
        },
        // Animation mượt mà hơn
        animate: { enter: { type: 'fadeIn' } },
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <FireOutlined className="text-emerald-500 text-lg" />
                    Top 5 món bán chạy
                </h3>
                <p className="text-gray-500 text-sm italic">Số liệu thống kê theo thời gian thực</p>
            </div>

            <div style={{ height: 350 }}>
                {data.length > 0 ? (
                    <Bar {...config} />
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                        <p>Chưa có dữ liệu bán hàng</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopProductsChart;