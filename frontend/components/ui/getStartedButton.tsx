"use client";
import { MotionButton } from "@/components/ui/button";
import { ArrowRight, LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useUser } from "../context/userContext";
import { motion, AnimatePresence } from "framer-motion";

export const triggerAnimationEvent = new Event("triggerPingleAnimation");

export const GetStartedButton = () => {
    const { user, username, loading, loggingOut } = useUser();
    const router = useRouter();

    const handleClick = useCallback(() => {
        document.dispatchEvent(triggerAnimationEvent);

        if (user) {
            setTimeout(() => {
                router.push(`/u/${username}`);
            }, 300);
        } else {
            setTimeout(() => {
                router.push("/start");
            }, 300);
        }
    }, [router, user, username]);

    const buttonStates = {
        guest: {
            label: "Get started",
        },
        user: {
            label: "Continue",
        },
        loading: {
            label: "Loading",
        },
    };

    const currentState = loggingOut
        ? "loading"
        : loading
        ? "loading"
        : user
        ? "user"
        : "guest";

    const { label: label } = buttonStates[currentState];

    return (
        <MotionButton
            variant="getstarted"
            size="lg"
            onClick={handleClick}
            className="md:min-w-[209px] shadow-[0_0_30px_10px_rgba(255,255,255,0.15)] min-w-[180px] justify-center"
            layout
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentState}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                >
                    {currentState === "loading" ? (
                        <LoaderCircleIcon
                            strokeWidth={3}
                            className="animate-spin"
                        />
                    ) : (
                        <>
                            <span>{label}</span>
                            <ArrowRight strokeWidth={3.5} />
                        </>
                    )}
                </motion.div>
            </AnimatePresence>
        </MotionButton>
    );
};
