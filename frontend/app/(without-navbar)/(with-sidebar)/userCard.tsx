import { useUser } from "@/components/context/userContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircleIcon } from "lucide-react";

interface UserCardProps {
    isSidebarOpen: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({ isSidebarOpen }) => {
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
