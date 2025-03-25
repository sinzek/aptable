// frontend/context/UserContext.tsx

"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

interface UserContextType {
    user: User | null;
    username: string | null;
    loading: boolean;
    loggingOut: boolean;
    logout: () => void; // Add logout function
}

const UserContext = createContext<UserContextType>({
    user: null,
    username: null,
    loading: true,
    loggingOut: false,
    logout: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [loggingOut, setLoggingOut] = useState<boolean>(false);

    const logout = async () => {
        setLoggingOut(true);
        setUser(null);
        setUsername(null);
        await signOut(auth);
        setLoggingOut(false);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const isNewUser =
                    user.metadata.creationTime === user.metadata.lastSignInTime;
                if (isNewUser) {
                    // Apply delay only for new users
                    await new Promise((resolve) => setTimeout(resolve, 200));
                }

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
        <UserContext.Provider
            value={{ user, username, loading, loggingOut, logout }}
        >
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
