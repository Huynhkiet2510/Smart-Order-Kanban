import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';

export const useDish = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "dishes"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => {
        const d = doc.data();
        return {
          id: doc.id,
          ...d,
          createdAt: d.createdAt?.toMillis() || null,
          completedAt: d.completedAt?.toMillis() || null,
        };
      });

      setDishes(data);
    }, (error) => {
      console.error("Lắng nghe dữ liệu thất bại:", error);
    });

    return () => unsubscribe();
  }, []);

  return {
    dishes
  };
};