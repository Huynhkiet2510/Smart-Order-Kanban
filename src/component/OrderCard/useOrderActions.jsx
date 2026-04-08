import { db } from "../../firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../../store/orderSlice";
import { uploadToCloudinary } from "../../utils/uploadService"

export const useOrderActions = () => {
    const dispatch = useDispatch();

    const completeOrderWithCloudinary = async (orderId, file) => {
        try {
            const imageUrl = await uploadToCloudinary(file);

            if (!imageUrl) {
                throw new Error("Không thể upload ảnh xác nhận.");
            }

            const orderRef = doc(db, "card_orders", orderId);
            await updateDoc(orderRef, {
                columnId: 4,
                status: "completed",
                proofImageUrl: imageUrl,
                completedAt: serverTimestamp(),
            });

            return imageUrl;
        } catch (error) {
            console.error("Lỗi khi hoàn tất đơn hàng:", error);
        }
    };

    const createOrder = async (formData) => {
        const newOrder = {
            ...formData,
            columnId: 1,
            status: "pending",
            createdAt: serverTimestamp()
        };
        try {
            await addDoc(collection(db, "card_orders"), newOrder);
        } catch (error) {
            console.error("Lỗi tạo order:", error);
        }
    };

    const moveOrder = async (orderId, newColumnId, newStatus) => {

        dispatch(updateOrderStatus({ id: orderId, newColumnId }));

        try {
            const orderRef = doc(db, "card_orders", orderId);
            await updateDoc(orderRef, {
                columnId: newColumnId,
                status: newStatus
            });
        } catch (error) {
            console.error("Lỗi cập nhật Firebase:", error);
        }
    };

    const removeOrder = async (orderId) => {
        if (window.confirm("Bạn có chắc muốn xóa đơn này?")) {
            try {
                await deleteDoc(doc(db, "card_orders", orderId));
            } catch (error) {
                console.error("Lỗi xóa order:", error);
            }
        }
    };

    return { createOrder, moveOrder, removeOrder, completeOrderWithCloudinary };
};