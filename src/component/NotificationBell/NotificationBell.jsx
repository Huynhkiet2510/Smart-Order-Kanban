import React, { useState, useEffect } from 'react';
import { Badge } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { db } from '../../firebase';
import {
    collection,
    query,
    where,
    onSnapshot,
    getDocs,
    writeBatch,
    doc
} from 'firebase/firestore';

const NotificationBell = () => {
    const [count, setCount] = useState(0);
    const [isRinging, setIsRinging] = useState(false);

    useEffect(() => {
        const q = query(collection(db, "card_orders"), where("viewed", "==", false));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newOrderCount = snapshot.size;

            if (newOrderCount > count) {

                const audio = new Audio('/ting-ting.mp3');
                audio.play().catch(() => console.log("Chờ user tương tác để phát nhạc"));

                setIsRinging(true);
                setTimeout(() => setIsRinging(false), 500);
            }

            setCount(newOrderCount);
        });

        return () => unsubscribe();
    }, [count]);

    const handleBellClick = async () => {
        if (count === 0) return;

        try {
            const q = query(
                collection(db, "card_orders"),
                where("viewed", "==", false)
            );
            const querySnapshot = await getDocs(q);

            const batch = writeBatch(db);

            querySnapshot.forEach((document) => {
                const docRef = doc(db, "card_orders", document.id);
                batch.update(docRef, { viewed: true });
            });

            await batch.commit();
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
        }
    };

    return (
        <div onClick={handleBellClick} className="p-4">
            <Badge count={count} overflowCount={99}>
                <div className={isRinging ? 'bell-ringing' : ''}>
                    <BellOutlined style={{ fontSize: '24px' }} />
                </div>
            </Badge>
        </div>
    );
};

export default NotificationBell;