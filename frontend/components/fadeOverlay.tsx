"use client";
import { motion, useAnimation } from "motion/react";
import { useEffect } from "react";
import { triggerAnimationEvent } from "./ui/getStartedButton";

export const FadeOverlay = () => {
    const controls = useAnimation();

    useEffect(() => {
        const handleTriggerAnimation = () => {
            controls.start({
                opacity: [0, 0, 0.3, 0.7, 1],
                transition: { duration: 0.5, ease: "easeInOut" }
            });
        };

        document.addEventListener("triggerPingleAnimation", handleTriggerAnimation);

        return () => {
            document.removeEventListener("triggerpingleAnimation", handleTriggerAnimation);
        };
    }, [controls]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={controls}
            className="fixed inset-0 bg-darkpurple-600 z-[51] pointer-events-none"
        />
    )
}