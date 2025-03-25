"use client";

import { AptableLogo, MiniAptableLogo } from "@/components/ui/aptableLogo";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState } from "react";
import { useUser } from "@/components/context/userContext";
import Link from "next/link";
import { Button, MotionButton } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LoaderCircleIcon } from "lucide-react";
import { UserModal } from "./userModal";

interface SurroundUIProps {
    children?: ReactNode;
}

interface UserCardProps {
    isSidebarOpen: boolean;
}

const SidebarWidth = 265;

const UserCard: React.FC<UserCardProps> = ({ isSidebarOpen }) => {
    const { user, username, loading, loggingOut } = useUser();
    const router = useRouter();

    const userButtonStates = {
        loggedOut: {
            name: "",
            pfp: (
                <Image
                    alt="Your profile picture"
                    src="/default-PFP.webp"
                    width={100}
                    height={100}
                    className="aspect-square object-contain w-auto h-full rounded-lg"
                />
            ),
            action: () => {
                router.push("/login");
            },
        },
        loggedIn: {
            name: username,
            pfp: (
                <Image
                    alt="Your profile picture"
                    src="/temporary-PFP.jpeg"
                    width={100}
                    height={100}
                    className="aspect-square object-contain w-auto h-full rounded-lg"
                />
            ),
            action: () => {
                window.location.hash = "#user-info";
            },
        },
        loading: {
            name: "",
            pfp: "",
            action: () => {},
        },
    };

    const currentState = loggingOut
        ? "loading"
        : loading
        ? "loading"
        : user
        ? "loggedIn"
        : "loggedOut";

    const { name, pfp: userPFP, action } = userButtonStates[currentState];

    return (
        <>
            <AnimatePresence mode="wait">
                <motion.button
                    className={`w-full ${
                        isSidebarOpen ? "h-[80px]" : "h-[70px]"
                    } bg-gradient-to-br from-purple-600 to-purple-700 hover:bg-gradient-to-br hover:from-purple-500 hover:to-purple-600 transition-all duration-150 rounded-xl p-3 flex flex-row gap-3 shadow-md hover:shadow-lg active:shadow-none active:brightness-75 opacity-100 disabled:opacity-50`}
                    disabled={loading || loggingOut}
                    onClick={action}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            className={`flex flex-col w-full h-full justify-center ${
                                loading ? "items-center" : "items-start"
                            }`}
                            key={currentState}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                        >
                            {currentState === "loading" ? (
                                <LoaderCircleIcon
                                    strokeWidth={3}
                                    className="animate-spin"
                                    color="white"
                                />
                            ) : user ? (
                                <div
                                    className={`flex w-full h-full flex-row items-center justify-start gap-4`}
                                >
                                    {userPFP}
                                    <AnimatePresence mode="wait">
                                        {isSidebarOpen && (
                                            <motion.div
                                                className="flex flex-col h-full items-start justify-center text-left"
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
                                                <p className="font-bold font-sora text-md text-white">
                                                    {name}
                                                </p>
                                                <p className="font-semibold font-aleo text-md text-gray-300">
                                                    Student plan
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <div className="flex w-full h-full flex-row items-center justify-start gap-4">
                                    {userPFP}
                                    {isSidebarOpen && (
                                        <motion.div
                                            className="flex flex-col h-full items-start justify-center text-left"
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
                                            <p className="font-bold font-sora text-md text-white">
                                                Logged out
                                            </p>
                                            <p className="font-semibold font-aleo text-md text-gray-300">
                                                Click here to log in
                                            </p>
                                        </motion.div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </motion.button>
            </AnimatePresence>
        </>
    );
};

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
                <div className="flex flex-col items-center justify-between h-full w-full">
                    <div className="flex flex-col items-center w-full gap-12 px-2">
                        <div className="min-h-[100px]">
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
                                    className={`w-full justify-start gap-5 hover:bg-purple-500/75`}
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
                                    className="w-full justify-start gap-5 hover:bg-purple-500/75"
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
                                className="w-full justify-start gap-5 hover:bg-purple-500/75"
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
                                className="w-full justify-start gap-5 hover:bg-purple-500/75"
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
                    <Button
                        onClick={toggleSidebar}
                        variant="ghost"
                        className="w-full text-white hover:bg-purple-500/75"
                    >
                        {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
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
