"use client";
import Image from "next/image";
import { motion, useAnimation } from "motion/react";
import { useEffect } from "react";
import { triggerAnimationEvent } from "./getStartedButton";

export const PinglePic = () => {
    const controls = useAnimation();

    useEffect(() => {
        const handleTriggerAnimation = () => {
            controls.start({
                opacity: [1, 0.9, 1, 0.7, 0.9, 0.5, 0.8, 0.3, 0], // more complex flash effect
                x: [0, -7, 12, -5, 8, -10, 3, -2, 0], // stronger horizontal glitches
                y: [0, 2, -3, 0, -15, -30, -60, -100], // dramatic upward flight
                scale: [1, 1.08, 0.92, 1.05, 0.95, 1.03, 0.9, 0.8, 0.6], // more dynamic scaling
                rotate: [0, 3, -5, 4, -2, 6, -3, 1, 0], // more pronounced rotation
                filter: [
                    "hue-rotate(0deg) blur(0px) brightness(1) contrast(1)",
                    "hue-rotate(15deg) blur(2px) brightness(1.2) contrast(1.1)",
                    "hue-rotate(-25deg) blur(0px) brightness(0.9) contrast(1.3)",
                    "hue-rotate(30deg) blur(3px) brightness(1.3) contrast(0.9)",
                    "hue-rotate(-15deg) blur(1px) brightness(1.1) contrast(1.2)",
                    "hue-rotate(20deg) blur(4px) brightness(1.4) contrast(0.8)",
                    "hue-rotate(-10deg) blur(2px) brightness(0.8) contrast(1.4)",
                    "hue-rotate(5deg) blur(5px) brightness(1.2) contrast(0.7)",
                    "hue-rotate(0deg) blur(8px) brightness(1.5) contrast(0.5)",
                ],
                skew: [0, 2, -3, 1, -4, 2, -1, 0], // add skew for VHS distortion effect
                transition: {
                    duration: 1.5,
                    ease: [0.22, 1, 0.36, 1], // custom bezier curve for more dynamic movement
                },
            });
        };

        document.addEventListener("triggerPingleAnimation", handleTriggerAnimation);

        return () => {
            document.removeEventListener("triggerPingleAnimation", handleTriggerAnimation);
        }
    }, [controls]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={controls}
            className="relative z-10 lg:mb-10 w-[60%] md:w-[80%] lg:w-[90%] floating"
        >
            <Image
                src="/pingle_float_2x.webp"
                alt="A floating Pingle"
                width="619"
                height="453"
            />
        </motion.div>
    );
};