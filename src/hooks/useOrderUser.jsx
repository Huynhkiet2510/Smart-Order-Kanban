import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export const useOrderUser = (userId) => {
    const [userOrders, setUserOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        const q = query(
            collection(db, "card_orders"),
            where("userId", "==", userId),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const orders = querySnapshot.docs.map(doc => ({ 
                id: doc.id, 
                ...doc.data() 
            }));
            setUserOrders(orders);
            setIsLoading(false);
        }, (error) => {
            console.error("Lỗi lắng nghe đơn hàng:", error);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [userId]);

    return { userOrders, isLoading };
};