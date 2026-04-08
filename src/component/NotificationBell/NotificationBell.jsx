import React, { useState, useEffect } from 'react';
import { Badge } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { db } from '../../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

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

    return (
        <div className="p-4">
            <Badge count={count} overflowCount={99}>
                <div className={isRinging ? 'bell-ringing' : ''}>
                    <BellOutlined style={{ fontSize: '24px' }} />
                </div>
            </Badge>
        </div>
    );
};

export default NotificationBell;