import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { setOrders } from '../store/orderSlice';

export const useOrderCards = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders.orders);

    useEffect(() => {
        const q = query(collection(db, "card_orders"), orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => {
                const d = doc.data();

                return {
                    id: doc.id,
                    ...d,
                    createdAt: d.createdAt?.toMillis(),
                    completedAt: d.completedAt?.toMillis(),
                };
            });

            dispatch(setOrders(data));
        }, (error) => {
            console.error("Lắng nghe dữ liệu thất bại:", error);
        });

        return () => unsubscribe();
    }, [dispatch]);

    return { orders };
};