import { PinglePic } from "@/components/ui/pinglePic";
import { AnimatePresence, motion } from "framer-motion";

interface PingleBoxProps {
    isSidebarOpen: boolean;
}

export const PingleBox: React.FC<PingleBoxProps> = ({ isSidebarOpen }) => {
    return (
        <button className="w-[80%] hover:brightness-110 transition-all duration-150 rounded-xl">
            <div className="relative h-auto aspect-square rounded-xl bg-gradient-to-b from-yellow-500 to-red-500 flex flex-col items-center justify-center overflow-hidden shadow-md hover:shadow-lg active:shadow-none active:brightness-75">
                <div
                    className={`${
                        isSidebarOpen ? "translate-y-8" : "translate-y-6"
                    } transition-all duration-150`}
                >
                    <PinglePic />
                </div>
                <svg
                    className={`absolute bottom-[5%] left-1/2 -translate-x-1/2 w-40 h-[10%]  transition-all duration-150 overflow-visible  ${
                        isSidebarOpen ? "opacity-1" : "opacity-0"
                    }`}
                >
                    <ellipse
                        cx="50%"
                        cy="50%"
                        rx="25%"
                        ry="30%"
                        className="fill-black/50 filter blur-sm"
                    />
                </svg>
            </div>
        </button>
    );
};
