import React, { useMemo, useState } from 'react';
import { Column } from '@ant-design/plots';
import { DatePicker } from 'antd';
import { ShoppingCartOutlined, DollarCircleOutlined, BarChartOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const RevenueChart = ({ orders }) => {
  const [internalSelectedDate, setInternalSelectedDate] = useState(dayjs());

  // Tính toán dữ liệu biểu đồ và Tổng doanh thu cùng lúc
  // Thay đổi logic bên trong useMemo của RevenueChart
  const { chartData, totalRevenue, totalOrdersCount } = useMemo(() => {
    const group = {};
    const pivotDate = internalSelectedDate;
    const daysToShow = [];

    for (let i = 6; i >= 0; i--) {
      const d = pivotDate.subtract(i, 'day').format('DD/MM');
      daysToShow.push(d);
      group[d] = 0;
    }

    let revenueSum = 0;
    let count = 0;

    orders.forEach(order => {
      // 1. Xử lý ngày tháng an toàn hơn
      const dateRaw = order.createdAt?.seconds
        ? new Date(order.createdAt.seconds * 1000)
        : (order.createdAt?.toDate?.() || new Date(order.createdAt));

      const dateStr = dayjs(dateRaw).format('DD/MM');

      // 2. LẤY ĐÚNG FIELD totalAmount CHÚNG TA ĐÃ LƯU
      const orderPrice = Number(order.totalAmount) || 0;

      revenueSum += orderPrice;
      count++;

      if (group[dateStr] !== undefined) {
        group[dateStr] += orderPrice;
      }
    });

    const chartData = daysToShow.map(date => ({
      date,
      revenue: group[date]
    }));

    return { chartData, totalRevenue: revenueSum, totalOrdersCount: count };
  }, [orders, internalSelectedDate]);

  const config = {
    data: chartData,
    xField: 'date',
    yField: 'revenue',
    height: 220,
    smooth: true,
    columnStyle: {
      radius: [4, 4, 0, 0],
    },
    color: '#10b981', // Màu xanh emerald cho hiện đại
    label: {
      position: 'top',
      style: { fill: '#6b7280', fontSize: 11 },
      formatter: (val) => val.revenue > 0 ? `${(val.revenue / 1000).toFixed(0)}k` : '',
    },
    tooltip: {
      formatter: (datum) => ({
        name: 'Doanh thu',
        value: new Intl.NumberFormat('vi-VN').format(datum.revenue) + '₫',
      }),
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

        <div className="bg-blue-50 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Tổng đơn hàng</p>
            <p className="text-2xl font-bold text-gray-800">
              {totalOrdersCount}
            </p>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg">
            <ShoppingCartOutlined className="text-blue-500 text-xl" />
          </div>
        </div>


        <div className="bg-emerald-50 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Tổng doanh thu</p>
            <p className="text-2xl font-bold text-emerald-600">
              {new Intl.NumberFormat("vi-VN").format(totalRevenue)}₫
            </p>
          </div>
          <div className="bg-emerald-100 p-3 rounded-lg">
            <DollarCircleOutlined className="text-emerald-500 text-xl" />
          </div>
        </div>

      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <BarChartOutlined className="text-emerald-500 text-lg" />
            Thống kê doanh thu
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            Trong 7 ngày gần nhất
          </p>
        </div>

        <DatePicker
          value={internalSelectedDate}
          format="DD/MM/YYYY"
          onChange={(date) => date && setInternalSelectedDate(date)}
          allowClear={false}
          className="rounded-lg border-gray-200"
        />
      </div>

      <div className="bg-gray-50 p-4 rounded-xl">
        <Column {...config} />
      </div>

    </div>
  );
};

export default RevenueChart;