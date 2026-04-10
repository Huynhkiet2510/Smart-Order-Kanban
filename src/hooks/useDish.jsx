import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';

export const useDish = () => {
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    }, (error) => {
      console.error("Lắng nghe dữ liệu thất bại:", error);
      setIsLoading(false); 
    });

    return () => unsubscribe();
  }, []);

  return {
    dishes,
    isLoading 
  };
};