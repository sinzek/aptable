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
import { ChevronsLeftIcon } from "lucide-react";

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
            width: "100%",
            height: "100%",
            x: "0",
            y: "0",
            borderRadius: "0px",
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
            borderRadius: "30px",
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
        <div className="flex flex-row w-full h-screen overflow-hidden">
            <UserModal />
            <motion.div
                initial="open"
                animate={isSidebarOpen ? "open" : "closed"}
                variants={sidebarVariants}
                className={`fixed top-0 left-0 h-screen w-[265px] bg-darkpurple-500 backdrop-blur-[10px] py-5 z-50 px-1`}
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
                                        Wiki
                                    </motion.span>
                                )}
                            </MotionButton>
                        </nav>
                    </div>
                    <PingleBox isSidebarOpen={isSidebarOpen} />
                    <Button
                        onClick={toggleSidebar}
                        variant="ghost"
                        className={`w-6 -right-[44px] absolute top-16 text-white rounded-l-none bg-darkpurple-500 hover:brightness-125 hover:bg-darkpurple-500 transition-all duration-100 -z-10 active:brightness-100 p-0`}
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
                    </Button>
                </div>
            </motion.div>

            <motion.div
                initial="open"
                animate={isSidebarOpen ? "open" : "closed"}
                variants={contentVariants}
                className={`flex flex-col ml-auto overflow-hidden items-center justify-center`}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default SurroundUI;
