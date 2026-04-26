import React, { useState } from 'react'
import { useDish } from '../../hooks/useDish';
import { useAuth } from '../../contexts/AuthContext';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

export const useCreateOrder = ({ form, onClose }) => {
    const [loading, setLoading] = useState(false);
    const { dishes } = useDish();
    const { user } = useAuth();

    const handleValuesChange = (changedValues, allValues) => {
        if (changedValues.items) {
            const updatedItems = allValues.items.map(item => {
                if (item && item.itemName) {
                    const selectedDish = dishes.find(d => d.name === item.itemName);
                    if (selectedDish) {
                        return {
                            ...item,
                            price: selectedDish.price * (item.quantity || 1)
                        };
                    }
                }
                return item;
            });
            form.setFieldsValue({ items: updatedItems });
        }
    };

    const handleCreateOrder = async (values) => {
        setLoading(true);
        try {
            const totalAmount = values.items.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

            const newOrder = {
                columnId: 1,
                userId: user.uid || "",
                customerName: values.customerName || "",
                phone: values.phone || "",
                address: values.address || "",
                items: values.items.map(item => ({
                    itemName: item.itemName,
                    quantity: Number(item.quantity),
                    price: Number(item.price),
                    dishId: dishes.find(d => d.name === item.itemName)?.id || null
                })),
                totalAmount: totalAmount,
                status: "pending",
                note: values.note || "",
                viewed: false,
                createdAt: serverTimestamp()
            };

            await addDoc(collection(db, "card_orders"), newOrder);
            form.resetFields();
            onClose();
        } catch (error) {
            console.error("Lỗi tạo đơn:", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        dishes, loading, handleValuesChange, handleCreateOrder
    }
}
