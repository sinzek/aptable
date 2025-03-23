// frontend/components/AuthButton.tsx

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/context/userContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import cookies from "js-cookie";
import { Button } from "./button";

export default function AuthButton() {
    const { user, logout } = useUser();
    const router = useRouter();
    const [clientCookieExists, setClientCookieExists] = useState<
        boolean | null
    >(null);
    const [serverAuthChecked, setServerAuthChecked] = useState(false);

    useEffect(() => {
        const sessionCookie = cookies.get("session");
        setClientCookieExists(!!sessionCookie);
        console.log("client cookie exists: ", !!sessionCookie);

        async function checkSession() {
            try {
                const response = await fetch("/api/session/check");
                if (response.ok) {
                    // server verified session
                } else {
                    setClientCookieExists(false); // server-side check failed
                }
            } catch (error) {
                console.error("Error checking session:", error);
                setClientCookieExists(false); // server-side check failed
            } finally {
                setServerAuthChecked(true);
            }
        }

        checkSession();
    }, []);

    if (!serverAuthChecked) {
        // display button based on client-side cookie presence (temporary)
        return (
            <Button
                onClick={() =>
                    clientCookieExists ? handleLogout() : router.push("/login")
                }
                variant="ghost"
                size="default"
            >
                <span className="text-white front-aleo">
                    {clientCookieExists ? "Log out" : "Log in"}
                </span>
            </Button>
        );
    }

    // display button based on server-verified user state
    return (
        <Button
            onClick={() => (user ? handleLogout() : router.push("/login"))}
            variant="ghost"
            size="default"
        >
            <span className="text-white front-aleo">
                {user ? "Log out" : "Log in"}
            </span>
        </Button>
    );

    async function handleLogout() {
        try {
            const response = await fetch("/api/users/logout", {
                method: "POST",
            });

            if (response.ok) {
                await signOut(auth);
                logout();
                router.push("/");
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Error logging out", error);
        }
    }
}
