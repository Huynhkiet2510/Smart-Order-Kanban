const OrderCard = ({ order }) => {

    const statusMap = {
        pending: "Chờ xử lý",
        preparing: "Đang chuẩn bị",
        delivering: "Đang giao hàng",
        completed: "Hoàn thành",
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

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-4 border-b bg-gray-50/50 flex justify-between items-center">
                <div>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Mã đơn hàng</span>
                    <h3 className="text-sm font-mono font-medium text-gray-700">
                        #{order?.id ? order.id.slice(-8).toUpperCase() : "UNKNOWN"}
                    </h3>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${getStatusBadge(order?.status)}`}>
                    {statusMap[order?.status] || order?.status}
                </span>
            </div>

            <div className="p-4">
                <ul className="space-y-3 mb-4">
                    {order?.items?.map((item, index) => (
                        <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
                            <div className="flex items-center gap-3">
                                <span className="flex items-center justify-center bg-white border w-6 h-6 rounded text-[10px] font-bold text-gray-500">
                                    {item?.quantity || 0}
                                </span>
                                <span className="text-sm text-gray-700 font-medium">{item?.itemName}</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-800">
                                {((item?.price || 0) * (item?.quantity || 0)).toLocaleString()}đ
                            </span>
                        </li>
                    ))}
                </ul>

                <hr className="my-4 border-dashed" />

                <div className="flex justify-between items-end">
                    <div className="text-[11px] text-gray-500">
                        <p><span className="font-medium text-gray-700">Người nhận:</span> {order?.customerName || "Khách hàng"}</p>
                        <p>
                            <span className="font-medium text-gray-700">Ngày đặt:</span> {order?.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString('vi-VN') : "Đang cập nhật..."}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-400 uppercase font-bold">Tổng thanh toán</p>
                        <p className="text-xl font-black text-orange-500">
                            {(order?.totalAmount || 0).toLocaleString()}đ
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;