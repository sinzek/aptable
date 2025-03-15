"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react"
import { motion, useAnimation } from "motion/react";

export default function Start() {
    const [stepNum, setStepNum] = useState(0);

    const MenuStep = () => {
        switch (stepNum) {
            case 0:
                return (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="flex flex-col h-full justify-start">
                            <h2 className="text-2xl lg:text-3xl text-center font-sora font-extrabold text-white">
                                Sign up
                            </h2>
                            <input type="email" name="email" autoFocus placeholder="Enter email" />
                            <input type="password" name="password" placeholder="Enter password" />
                            <Button variant="outline" size="lg" onClick={() => setStepNum(stepNum + 1)}>
                                <span className="text-white">Next</span>
                            </Button>
                        </div>
                    </motion.div>

                );
            case 1:
                return (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="flex flex-col h-full justify-start">
                            <h2 className="text-2xl lg:text-3xl text-center font-sora font-extrabold text-white">
                                Enter a dope ass username
                            </h2>
                            <input type="username" name="username" autoFocus placeholder="Enter username" />
                            <Button variant="outline" size="lg" onClick={handleTriggerAnimation}>
                                <span className="text-white">Next</span>
                            </Button>
                            <Button variant="outline" size="lg" onClick={() => setStepNum(stepNum - 1)}>
                                <span className="text-white">Back</span>
                            </Button>
                        </div>
                    </motion.div>
                );
        }
    }

    const controls = useAnimation();

    const handleTriggerAnimation = () => {
        controls.start({
            opacity: [0, 0, 0.3, 0.7, 1],
            transition: { duration: 0.5, ease: "easeInOut" }
        });
    };

    return (
        <div className="h-screen">
            <motion.div
                initial={{ opacity: 0 }}
                animate={controls}
                className="fixed inset-0 bg-darkpurple-800 z-[51] pointer-events-none"
            />
            <div className="flex flex-col w-full h-full items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: "50%" }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                    className="absolute h-1/2 w-1/3 flex flex-col items-center justify-center"
                >
                    <div className="relative w-full h-full flex flex-col items-center justify-start p-8 bg-gradient-to-l from-[#d058a8]/80 via-[#e89e57]/80 to-[#d26fb1]/80 rounded-tr-[60px] rounded-bl-[60px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] outline outline-[10px] outline-[#5d0020] backdrop-blur-[21.40px] overflow-hidden">
                        <MenuStep />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}