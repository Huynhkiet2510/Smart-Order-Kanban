import React, { useEffect, useState, useMemo } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import OrderCard from './OrderCard';
import Pagination from './Pagination';

const TrackOrderPage = () => {
  const { user } = useAuth();
  const [userOrders, setUserOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (!user?.uid) return;

    const q = query(
      collection(db, "card_orders"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const orders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUserOrders(orders);
    }, (error) => console.error("Lỗi:", error));

    return () => unsubscribe();
  }, [user?.uid]);

  const filteredOrders = useMemo(() => {
    return statusFilter === 'all'
      ? userOrders
      : userOrders.filter(order => order.status === statusFilter);
  }, [userOrders, statusFilter]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const displayOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, currentPage]);

  useEffect(() => setCurrentPage(1), [statusFilter]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">📦 Lịch sử đơn hàng</h2>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm shadow-sm"
          >
            <option value="all">Tất cả đơn hàng</option>
            <option value="pending">Chờ xử lý</option>
            <option value="preparing">Đang chuẩn bị</option>
            <option value="delivering">Đang giao hàng</option>
            <option value="completed">Hoàn thành</option>
          </select>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="bg-white p-12 rounded-xl shadow-sm text-center border border-dashed">
            <p className="text-gray-400 italic">Không có đơn hàng nào trong mục này.</p>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {displayOrders.map(order => <OrderCard key={order.id} order={order} />)}
            </div>

            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TrackOrderPage;