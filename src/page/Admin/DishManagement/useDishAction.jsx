import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../firebase";
import { uploadToCloudinary } from "../../../utils/uploadService"
import { Form } from "antd";

export const useDishAction = () => {
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(null);

    const handleFillInput = (dish) => {
        setIsEditing(dish.id);
        setOpen(true);

        setTimeout(() => {
            form.setFieldsValue({
                name: dish.name,
                price: dish.price,
                category: dish.category,
                image: dish.image ? [{
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: dish.image,
                }] : [],
            });
        }, 100);
    };


    const SaveDish = async (values) => {
        if (!values.name || !values.price) return;
        setSubmitting(true);

        try {
            let finalImageUrl = "";

            const file = values.image?.[0]?.originFileObj;

            if (file) {
                // Trường hợp 1: Có chọn file mới -> Upload lên Cloudinary
                finalImageUrl = await uploadToCloudinary(file);
            } else {
                // Trường hợp 2: Không chọn file mới -> Lấy lại link ảnh cũ (đã có sẵn trong form)
                finalImageUrl = values.image?.[0]?.url || "";
            }

            const dishData = {
                name: values.name,
                price: Number(values.price),
                category: values.category,
                image: finalImageUrl,
                isDisable: false,
                updatedAt: serverTimestamp(),
            };

            if (isEditing) {
                const dishRef = doc(db, "dishes", isEditing);
                await updateDoc(dishRef, dishData);
            } else {
                await addDoc(collection(db, "dishes"), {
                    ...dishData,
                    isDisable: false,
                    createdAt: serverTimestamp(),
                });
            }

            setOpen(false);
            setIsEditing(null);
        } catch (error) {
            console.error("Lỗi:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const updateDish = async (dish) => {
        try {
            const dishRef = doc(db, "dishes", dish.id);
            await updateDoc(dishRef, {
                name: dish.name,
                price: dish.price
            })

        } catch (error) {
            console.log("lỗi khi cập nhật món ăn", error)
        }
    };

    const removeDish = async (dishId) => {
        try {
            await deleteDoc(doc(db, "dishes", dishId));
        } catch (error) {
            console.log("lỗi khi xóa món ăn", error)
        }
    };

    const ToggleDisable = async (id, currentStatus) => {
        try {
            const dishRef = doc(db, "dishes", id);
            await updateDoc(dishRef, {
                isDisable: !currentStatus
            });
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
        }
    };

    return {
        form,
        submitting,
        open,
        isEditing,
        SaveDish,
        updateDish,
        handleFillInput,
        removeDish,
        ToggleDisable,
        setOpen
    };
};