import { motion } from "motion/react";
import Image from "next/image";

interface TopRightModuleProps {
    isSidebarOpen: boolean;
}

const topRightModuleVariants = {
    closed: {
        y: "-200%",
        x: "100%",
        transition: {
            type: "spring",
            stiffness: 275,
            damping: 30,
        },
    },
    open: {
        y: "0",
        x: "0",
        transition: {
            type: "spring",
            stiffness: 275,
            damping: 30,
        },
    },
};

const TopRightModuleContent = () => {
    const handleBellClicked = () => {
        return;
    };
    const handleAchievementsClicked = () => {
        return;
    };
    const handleStatsClicked = () => {
        return;
    };

    return (
        <div className="w-full h-full flex flex-row items-center justify-center gap-1">
            <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 0 }}
                whileHover={{
                    rotate: [0, 5, 0, -5, 0],
                    transition: {
                        duration: 0.3,
                        ease: "easeInOut",
                        repeat: 1,
                    },
                }}
            >
                <button
                    name="notifications"
                    onClick={handleBellClicked}
                    className="w-full h-full opacity-1 hover:bg-white/10 rounded-xl p-1 transition-all duration-100 active:brightness-75 flex flex-row gap-2 items-center justify-center hover:translate-y-[-1px]"
                    title="Notifications"
                >
                    <Image
                        width={24}
                        height={24}
                        alt="notification-bell"
                        src="/bell_icon.svg"
                    />
                </button>
            </motion.div>
            <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 0 }}
                whileHover={{
                    rotate: [0, 5, 0, -5, 0],
                    transition: {
                        duration: 0.3,
                        ease: "easeInOut",
                        repeat: 1,
                    },
                }}
            >
                <button
                    name="achievements"
                    onClick={handleAchievementsClicked}
                    className="w-full h-full opacity-1 hover:bg-white/10 rounded-xl p-1 transition-all duration-100 active:brightness-75 flex flex-row gap-2 items-center justify-center hover:translate-y-[-1px]"
                    title="Achievements"
                >
                    <Image
                        width={24}
                        height={24}
                        alt="trophy"
                        src="/achievement_icon.svg"
                    />
                </button>
            </motion.div>
            <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 0 }}
                whileHover={{
                    rotate: [0, 5, 0, -5, 0],
                    transition: {
                        duration: 0.3,
                        ease: "easeInOut",
                        repeat: 1,
                    },
                }}
            >
                <button
                    name="stats"
                    onClick={handleStatsClicked}
                    className="w-full h-full opacity-1 hover:bg-white/10 rounded-xl p-1 transition-all duration-100 active:brightness-75 flex flex-row gap-2 items-center justify-center hover:translate-y-[-1px]"
                    title="Stats"
                >
                    <Image
                        width={24}
                        height={24}
                        alt="trophy"
                        src="/stats_icon.svg"
                    />
                </button>
            </motion.div>
        </div>
    );
};

export const TopRightModule: React.FC<TopRightModuleProps> = ({
    isSidebarOpen,
}) => {
    return (
        <>
            <motion.div
                className={`absolute top-[9px] right-10 z-[10] ui-shadow [clip-path:inset(1px_-30px_-25px_0)]`}
                animate={isSidebarOpen ? "open" : "closed"}
                variants={topRightModuleVariants}
                key="open"
            >
                <svg
                    className={`h-10 origin-top-left skew-x-[30deg] overflow-visible`}
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 100 32"
                    xmlSpace="preserve"
                >
                    <path
                        className={`translate-y-[0.5px] fill-darkpurple-600`}
                        shapeRendering="optimizeQuality"
                        d="M0,0c5.9,0,10.7,4.8,10.7,10.7v10.7c0,5.9,4.8,10.7,10.7,10.7H128V0"
                    ></path>
                </svg>
            </motion.div>
            <motion.div
                className={`absolute top-[9px] right-[9px] z-[11] h-10 w-32 bg-darkpurple-600 rounded-full toggle-shadow`}
                animate={isSidebarOpen ? "closed" : "open"}
                variants={topRightModuleVariants}
                key="closed"
                initial={{ y: "-200%", x: "100%" }}
            ></motion.div>
            <motion.div
                className={`absolute top-[9px] right-[9px] z-[11] h-10 w-32 overflow-hidden`}
                animate={isSidebarOpen ? "open" : "closed"}
                variants={topRightModuleVariants}
                key="content-open"
            >
                <TopRightModuleContent />
            </motion.div>
            <motion.div
                className={`absolute top-[9px] right-[9px] z-[11] h-10 w-32 overflow-hidden`}
                animate={isSidebarOpen ? "closed" : "open"}
                variants={topRightModuleVariants}
                key="content-closed"
                initial={{ y: "-200%", x: "100%" }}
            >
                <TopRightModuleContent />
            </motion.div>
        </>
    );
};
