"use client";

import { AptableLogo, MiniAptableLogo } from "@/components/ui/aptableLogo";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState } from "react";
import { useUser } from "@/components/context/userContext";
import Link from "next/link";
import { Button, MotionButton } from "@/components/ui/button";
import { UserModal } from "./userModal";
import { UserCard } from "./userCard";
import { PingleBox } from "./pingleBox";
import { ChevronsLeftIcon, SquareArrowOutUpRight } from "lucide-react";
import { TopRightModule } from "./topRightModule";

interface SurroundUIProps {
    children?: ReactNode;
}

const SidebarWidth = 265;

const SurroundUI: React.FC<SurroundUIProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { username } = useUser();

    const sidebarVariants = {
        closed: {
            x: "-175px",
            paddingLeft: "175px",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
            },
        },
        open: {
            x: 0,
            paddingLeft: "0px",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
            },
        },
    };

    const contentVariants = {
        closed: {
            width: `100%`,
            height: "100%",
            x: "45px",
            y: "0",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
            },
        },
        open: {
            width: `calc(100% - ${SidebarWidth}px - 10px)`,
            height: "calc(100% - 20px)",
            x: "-10px",
            y: "10px",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
            },
        },
    };

    const innerContentVariants = {
        closed: {
            borderRadius: "0px",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
            },
        },
        open: {
            borderRadius: "20px",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
            },
        },
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex flex-row w-screen h-screen overflow-hidden">
            <TopRightModule isSidebarOpen={isSidebarOpen} />
            <UserModal />
            <motion.div
                initial="open"
                animate={isSidebarOpen ? "open" : "closed"}
                variants={sidebarVariants}
                className={`fixed top-0 left-0 h-screen w-[265px] bg-darkpurple-600 backdrop-blur-[10px] py-5 z-50 px-1 ${
                    isSidebarOpen ? "" : "sidebar-shadow"
                } transition-shadow duration-300`}
            >
                <div className="relative flex flex-col items-center justify-between h-full w-full z-[1]">
                    <div className="flex flex-col items-center w-full gap-8 px-2">
                        <div className="min-h-[80px]">
                            <AnimatePresence mode="wait">
                                {isSidebarOpen ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: "-100%" }}
                                        animate={{ opacity: 1, y: "0" }}
                                        exit={{ opacity: 0, y: "-100%" }}
                                        layout
                                    >
                                        <Link href="/">
                                            <AptableLogo
                                                width={200}
                                                height={100}
                                            />
                                        </Link>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        layout
                                    >
                                        <Link href="/">
                                            <MiniAptableLogo
                                                width={54}
                                                height={27}
                                            />
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <UserCard isSidebarOpen={isSidebarOpen} />
                        <nav className="flex flex-col items-center w-full gap-4">
                            <Link href={`/u/${username}`} className="w-full">
                                <MotionButton
                                    variant="ghost"
                                    size="sidepanel"
                                    className={`w-full justify-start gap-5 hover:bg-white/25`}
                                    animate={{
                                        paddingRight: isSidebarOpen
                                            ? "auto"
                                            : "16px",
                                        paddingLeft: isSidebarOpen
                                            ? "auto"
                                            : "16px",
                                    }}
                                >
                                    <Image
                                        src="/house.svg"
                                        alt="Home"
                                        width={36}
                                        height={36}
                                        className="mb-1"
                                    />
                                    {isSidebarOpen && (
                                        <motion.span
                                            className="ml-[4px] text-start font-sora font-extrabold text-white/90"
                                            initial={{
                                                opacity: 0,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                transition: { delay: 0.1 },
                                            }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.05 }}
                                        >
                                            Home
                                        </motion.span>
                                    )}
                                </MotionButton>
                            </Link>
                            <Link href="/exchange" className="w-full">
                                <MotionButton
                                    variant="ghost"
                                    size="sidepanel"
                                    className="w-full justify-start gap-5 hover:bg-white/25"
                                    animate={{
                                        paddingRight: isSidebarOpen
                                            ? "auto"
                                            : "15px",
                                        paddingLeft: isSidebarOpen
                                            ? "auto"
                                            : "15px",
                                    }}
                                >
                                    <Image
                                        src="/cart.svg"
                                        alt="Shop"
                                        width={40}
                                        height={40}
                                    />
                                    {isSidebarOpen && (
                                        <motion.span
                                            className="text-start font-sora font-extrabold text-white/90"
                                            initial={{
                                                opacity: 0,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                transition: { delay: 0.1 },
                                            }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.05 }}
                                        >
                                            Exchange
                                        </motion.span>
                                    )}
                                </MotionButton>
                            </Link>
                            <MotionButton
                                variant="ghost"
                                size="sidepanel"
                                className="w-full justify-start gap-5 hover:bg-white/25"
                                animate={{
                                    paddingRight: isSidebarOpen
                                        ? "auto"
                                        : "15px",
                                    paddingLeft: isSidebarOpen
                                        ? "auto"
                                        : "15px",
                                }}
                            >
                                <Image
                                    src="/backpack.svg"
                                    alt="Backpack"
                                    width={40}
                                    height={40}
                                />
                                {isSidebarOpen && (
                                    <motion.span
                                        className="text-start font-sora font-extrabold text-white/90"
                                        initial={{
                                            opacity: 0,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            transition: { delay: 0.1 },
                                        }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.05 }}
                                    >
                                        Inventory
                                    </motion.span>
                                )}
                            </MotionButton>
                            <MotionButton
                                variant="ghost"
                                size="sidepanel"
                                className="w-full justify-start gap-5 hover:bg-white/25"
                                animate={{
                                    paddingRight: isSidebarOpen
                                        ? "auto"
                                        : "15px",
                                    paddingLeft: isSidebarOpen
                                        ? "auto"
                                        : "15px",
                                }}
                            >
                                <Image
                                    src="/book.svg"
                                    alt="Book"
                                    width={40}
                                    height={40}
                                />
                                {isSidebarOpen && (
                                    <motion.span
                                        className="text-start font-sora font-extrabold text-white/90 flex flex-row items-center gap-2"
                                        initial={{
                                            opacity: 0,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            transition: { delay: 0.1 },
                                        }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.05 }}
                                    >
                                        Wiki
                                        <SquareArrowOutUpRight
                                            strokeWidth={2}
                                            className="scale-105"
                                        />
                                    </motion.span>
                                )}
                            </MotionButton>
                        </nav>
                    </div>
                    <PingleBox isSidebarOpen={isSidebarOpen} />
                    <button
                        onClick={toggleSidebar}
                        className={`w-10 h-10 -right-[44px] absolute top-16 text-white rounded-r-full bg-darkpurple-600 hover:brightness-125 transition-all duration-100 -z-10 active:brightness-90 toggle-shadow [clip-path:inset(-30px_-30px_-30px_0px)] flex flex-row items-center justify-center`}
                        title={`${
                            isSidebarOpen ? "Shrink sidebar" : "Enlarge sidebar"
                        }`}
                    >
                        <ChevronsLeftIcon
                            strokeWidth={3}
                            className={`${
                                isSidebarOpen ? "rotate-0" : "rotate-180"
                            } transition-all duration-200 ease-in scale-125`}
                            opacity="0.5"
                        />
                    </button>
                </div>
            </motion.div>

            <motion.div
                initial="open"
                animate={isSidebarOpen ? "open" : "closed"}
                variants={contentVariants}
                className={`flex flex-col ml-auto overflow-hidden items-center justify-center`}
            >
                <motion.div
                    className={`
                        w-full 
                        h-full 
                        overflow-hidden 
                        before:absolute 
                        before:inset-0 
                        before:rounded-[20px] 
                        ${isSidebarOpen ? "before:special-shadow" : ""} 
                        before:transition-all 
                        before:duration-300 
                        before:ease-in-out 
                        before:pointer-events-none 
                        before:z-10`}
                    initial="open"
                    animate={isSidebarOpen ? "open" : "closed"}
                    variants={innerContentVariants}
                >
                    {children}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default SurroundUI;
