import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase'; // Đảm bảo đường dẫn này đúng với file firebase.js của bạn
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    const getFullUserData = async (currentUser) => {
        if (!currentUser) return null;

        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const firestoreData = userSnap.data();
            setRole(firestoreData.role);
            return { ...currentUser, ...firestoreData };
        } else {
            const newUser = {
                uid: currentUser.uid,
                email: currentUser.email,
                displayName: currentUser.displayName || "Người dùng mới",
                photoURL: currentUser.photoURL || "",
                role: "customer",
                phone: "",
                address: "",
                createdAt: serverTimestamp()
            };
            await setDoc(userRef, newUser);
            setRole("customer");
            return { ...currentUser, ...newUser };
        }
    };

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const fullUser = await getFullUserData(result.user);
        setUser(fullUser);
        return { user: fullUser, role: fullUser.role };
    };

    const loginWithEmail = async (email, password) => {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const fullUser = await getFullUserData(result.user);
        setUser(fullUser);
        return { user: fullUser, role: fullUser.role };
    };

    const registerWithEmail = async (email, password, additionalData) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(result.user, {
            displayName: additionalData.displayName,
            photoURL: additionalData.photoURL || ""
        });

        const userRef = doc(db, "users", result.user.uid);
        const newUser = {
            uid: result.user.uid,
            email: result.user.email,
            displayName: additionalData.displayName,
            photoURL:
                additionalData.photoURL ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    additionalData.displayName || "User"
                )}&background=ff4d4f&color=fff`,
            phone: additionalData.phone || "",
            address: additionalData.address || "",
            role: "customer",
            createdAt: serverTimestamp()
        };

        await setDoc(userRef, newUser);

        const fullUser = { ...result.user, ...newUser };
        setRole("customer");
        setUser(fullUser);

        return { user: fullUser, role: "customer" };
    };

    const logout = () => {
        setRole(null);
        setUser(null);
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);
            if (currentUser) {
                // Mỗi khi F5 hoặc mở web, tự động lấy dữ liệu đầy đủ từ Firestore
                const fullUser = await getFullUserData(currentUser);
                setUser(fullUser);
            } else {
                setUser(null);
                setRole(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            role,
            loginWithGoogle,
            loginWithEmail,
            registerWithEmail,
            logout
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};