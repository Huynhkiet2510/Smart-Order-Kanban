import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebase'; //
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { clearCart } from '../../../store/cartSlice';
import { useAuth } from '../../../contexts/AuthContext';

export const useCheckOut = () => {
    const carts = useSelector((state) => state.cart.carts);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useAuth();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        customerName: '',
        phone: '',
        address: '',
        note: '',
        paymentMethod: 'cod'
    });

    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                ...prev,
                customerName: user.displayName || '',
                phone: user.phone || "",
                address: user.address || '',
            }));
        }
    }, [user]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        if (carts.length === 0) return;

        setLoading(true);
        try {
            const newOrder = {
                columnId: 1,
                userId: user.uid,
                customerName: formData.customerName,
                phone: formData.phone,
                address: formData.address,
                note: formData.note,
                paymentMethod: formData.paymentMethod,

                items: carts.map(item => ({
                    dishId: item.id,
                    itemName: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),

                totalAmount: totalAmount,
                status: "pending",
                viewed: false,
                createdAt: serverTimestamp(),
            };

            await addDoc(collection(db, "card_orders"), newOrder);

            navigate("/payment-success", {
                state: { fromPayment: true },
                replace: true
            });
            setTimeout(() => {
                dispatch(clearCart());
            }, 100);
        } catch (error) {
            console.error("Lỗi đặt hàng:", error);
        } finally {
            setLoading(false);
        }
    };

    const totalAmount = carts.reduce((total, item) => total + item.price * item.quantity, 0);

    return {
        carts, formData, navigate, loading, handleSubmitOrder, handleInputChange, totalAmount
    };
};
