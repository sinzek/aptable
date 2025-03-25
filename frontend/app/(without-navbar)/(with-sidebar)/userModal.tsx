"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const UserModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
        window.history.pushState("", document.title, window.location.pathname);
    };

    useEffect(() => {
        if (window.location.hash === "#user-info") {
            setIsOpen(true);
        }

        const handleHashChange = () => {
            setIsOpen(window.location.hash === "#user-info");
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isOpen) {
                closeModal();
            }
        };

        window.addEventListener("hashchange", handleHashChange);
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("hashchange", handleHashChange);
            window.addEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.div
                    className={`fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-[51] backdrop-blur-3xl`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: {
                            duration: 0.2,
                        },
                    }}
                    onClick={closeModal}
                >
                    <motion.div
                        className={`absolute top-0 w-screen h-screen pointer-events-none blur-[200px]`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.35 }}
                        transition={{ duration: 5, type: "spring" }}
                        exit={{
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                            },
                        }}
                    >
                        <Image
                            src="/blob-red.svg"
                            alt="background-blob"
                            width={320}
                            height={320}
                            className="absolute top-0 right-0"
                        />
                        <Image
                            src="/blob-yellow.svg"
                            alt="background-blob"
                            width={510}
                            height={510}
                            className="absolute bottom-[20%] left-[-10%]"
                        />
                        <Image
                            src="/blob-orange.svg"
                            alt="background-blob"
                            width={420}
                            height={420}
                            className="absolute top-0 left-[40%]"
                        />
                        <Image
                            src="/blob-purple.svg"
                            alt="background-blob"
                            width={500}
                            height={500}
                            className="absolute bottom-0 right-[27%] brightness-200"
                        />
                    </motion.div>
                    <motion.div
                        className="bg-purple-500/10 py-6 md:py-12 px-8 w-auto rounded-[50px] ui-shadow flex flex-col items-center gap-6 justify-center backdrop-blur-[10px]"
                        initial={{ opacity: 0, y: 300 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                            opacity: 0,
                            y: 150,
                            transition: {
                                duration: 0.2,
                            },
                        }}
                        transition={{
                            delay: 0.2,
                            duration: 1,
                            type: "spring",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-2xl lg:text-3xl text-center text-balance text-white font-sora font-extrabold">
                            User info
                        </h3>
                        <Button
                            variant="default"
                            size="lg"
                            className="mt-2 opacity-50 hover:opacity-80"
                            onClick={closeModal}
                        >
                            Close
                        </Button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
