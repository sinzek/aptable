// frontend/context/UserContext.tsx

"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

interface UserContextType {
    user: User | null;
    username: string | null;
    loading: boolean;
    logout: () => void; // Add logout function
}

const UserContext = createContext<UserContextType>({
    user: null,
    username: null,
    loading: true,
    logout: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const logout = () => {
        setUser(null);
        setUsername(null);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const isNewUser =
                    user.metadata.creationTime === user.metadata.lastSignInTime;
                if (isNewUser) {
                    // Apply delay only for new users
                    await new Promise((resolve) => setTimeout(resolve, 500));
                }

                setUser(user);

                const userDocRef = doc(db, "users", user.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    setUsername(userDocSnap.data().username);
                } else {
                    setUsername(null);
                }
                setUser(user);
            } else {
                setUser(null);
                setUsername(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ user, username, loading, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
