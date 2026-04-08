import { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useOrderActions } from "../../../component/OrderCard/useOrderActions";
import Column from "../../../component/Column/Column";
import UploadProofModal from "../../../component/OrderCard/UploadProofModal";

const COLUMNS = [
  { id: 1, title: "pending", color: "bg-yellow-100 text-yellow-700", status: "pending" },
  { id: 2, title: "preparing", color: "bg-blue-100 text-blue-700", status: "preparing" },
  { id: 3, title: "delivering", color: "bg-purple-100 text-purple-700", status: "delivering" },
  { id: 4, title: "completed", color: "bg-green-100 text-green-700", status: "completed" },
];

const OrderManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderPending, setOrderPending] = useState(null)

  const { moveOrder, completeOrderWithCloudinary } = useOrderActions();


  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    const oldColumnId = parseInt(source.droppableId);
    const newColumnId = parseInt(destination.droppableId);

    if (newColumnId < oldColumnId) {
      toast.warning("Không thể chuyển đơn hàng về trạng thái trước đó!");
      return;
    }

    if (newColumnId > oldColumnId + 1) {
      toast.warning("Bạn phải chuẩn bị đơn hàng đúng quy trình theo từng bước!");
      return;
    }

    if (newColumnId === 4) {
      setOrderPending({ id: draggableId, oldColumnId });

      setIsModalOpen(true);

      return;
    }
    const newStatus = COLUMNS.find(col => col.id === newColumnId)?.status;

    moveOrder(draggableId, newColumnId, newStatus);
  }

  const handleConfirmCompletion = async (file) => {
    try {
      await completeOrderWithCloudinary(orderPending.id, file);

      setIsModalOpen(false);
      setOrderPending(null);
      toast.success("Đơn hàng đã hoàn thành với bằng chứng ảnh!");
    } catch (err) {
      console.log(err)
      toast.error("Lỗi upload ảnh, vui lòng thử lại!");
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-100">
      <div className="flex-1 p-4 overflow-hidden flex flex-col">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-4 h-full overflow-x-auto justify-around items-start custom-scrollbar pb-2">
            {COLUMNS.map((c) => (
              <Column title={c.title} color={c.color} key={c.id} columnId={c.id} />
            ))}
          </div>
        </DragDropContext>
      </div>

      {isModalOpen && (
        <UploadProofModal
          orderPending={orderPending}
          onClose={() => {
            setIsModalOpen(false);
            setOrderPending(null);
          }}
          onConfirm={handleConfirmCompletion}
        />
      )}
    </div>
  )
}

export default OrderManagement;