import { Modal } from "antd";
import dayjs from "dayjs";

const DetailModal = ({ order, onClose, formatPrice }) => {
    return (
        <Modal
            title="Chi tiết đơn hàng hoàn thành"
            open={!!order}
            onCancel={onClose}
            footer={null}
        >
            <div className="space-y-4">
                <p><strong>Khách hàng:</strong> {order?.customerName}</p>
                <p><strong>Số điện thoại:</strong> {order?.phone}</p>
                <p><strong>Địa chỉ:</strong> {order?.address}</p>
                <p><strong>Tổng tiền:</strong> {formatPrice(order?.price)}</p>
                <p><strong>Ngày hoàn thành: </strong>{order?.createdAt ? dayjs(order.createdAt.toDate?.()).format("DD/MM/YYYY") : "---"}</p>
                <p> <strong>Gio xác nhận: </strong>{order?.createdAt ? dayjs(order.createdAt.toDate?.()).format("HH:mm") : "---"}</p>

            </div>

            <div className="mt-4">
                <p className="font-bold mb-2 text-green-600">Bằng chứng giao hàng:</p>
                {order?.proofImageUrl ? (
                    <img
                        src={order.proofImageUrl}
                        alt="Proof"
                        className="w-full h-auto rounded-xl border shadow-sm"
                    />
                ) : (
                    <div className="bg-gray-100 p-8 text-center text-gray-400 rounded-xl">
                        Không có ảnh bằng chứng
                    </div>
                )}
            </div>

        </Modal >
    )
}

export default DetailModal