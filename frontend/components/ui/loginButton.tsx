import { useRouter } from "next/navigation";
import { useUser } from "@/components/context/userContext";
import { MotionButton } from "./button";
import { LoaderCircleIcon, LogOutIcon, LogInIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function AuthButton() {
    const { user, logout, loading, loggingOut } = useUser();
    const router = useRouter();

    const buttonStates = {
        login: {
            label: "Log in",
            icon: LogInIcon,
            action: () => router.push("/login"),
        },
        logout: {
            label: "Log out",
            icon: LogOutIcon,
            action: handleLogout,
        },
        loading: {
            label: "Loading",
            icon: LoaderCircleIcon,
            action: () => {},
        },
    };

    const currentState = loggingOut
        ? "loading"
        : loading
        ? "loading"
        : user
        ? "logout"
        : "login";

    const { label, icon: ButtonIcon, action } = buttonStates[currentState];

    return (
        <MotionButton
            onClick={action}
            variant="ghost"
            size="default"
            disabled={loading || loggingOut}
            className="md:min-w-[108px] justify-center"
            layout
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentState}
                    className="flex items-center gap-2 text-white font-aleo"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                >
                    {currentState === "loading" ? (
                        <ButtonIcon strokeWidth={3} className="animate-spin" />
                    ) : (
                        <>
                            <span>{label}</span>
                        </>
                    )}
                </motion.div>
            </AnimatePresence>
        </MotionButton>
    );

    async function handleLogout() {
        try {
            const response = await fetch("/api/users/logout", {
                method: "POST",
            });

            if (response.ok) {
                await logout();
                router.push("/");
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Error logging out", error);
        }
    }
}
