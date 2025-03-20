import { ArrowRight, FlameIcon, GraduationCap, LaughIcon } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./button";

const PricingCards = () => {
    return (
        <div className="flex flex-col gap-3 w-full">
            <motion.div className="relative overflow-hidden flex flex-row px-4 md:px-8 py-3 md:py-6 rounded-3xl bg-gradient-to-br from-orange-500/50 via-yellow-500/40 to-orange-500/30 border-4 border-white/25 hover:border-white/50 transition-all duration-150 ease-in-out items-center justify-between"
                initial={{ opacity: 0, boxShadow: "0px 0px 0px #000" }}
                animate={{ opacity: 1, boxShadow: "0px 0px 7px #FFFFFF95" }}
                transition={{ delay: 0.5, type: "spring" }}
            >
                <div className="absolute flex flex-col items-center justify-center text-red-100/85 text-[0.5rem] md:text-xs font-extrabold font-sora top-4 md:top-6 -left-8 w-28 h-4 md:w-36 md:h-8 bg-gradient-to-r from-red-700 via-red-500 to-red-700 shadow-md -rotate-45">most popular!</div>
                <div className="flex flex-row gap-3 items-center">
                    <GraduationCap strokeWidth={2} className="md:w-16 md:h-16 w-12 h-12 p-1 md:p-2 bg-yellow-500/25 rounded-full stroke-yellow-200" />
                    <div className="flex flex-col items-start justify-center">
                        <h2 className="text-sm md:text-xl font-sora font-extrabold text-white">
                         ✨Student Plan✨
                        </h2>
                        <div className="flex flex-row items-center justify-center gap-1">
                            <p className="text-xs md:text-sm text-white/75 font-semibold line-through">
                                $24.99
                            </p>
                            <h2 className="text-md md:text-3xl font-sora font-extrabold bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 to-teal-500 bg-clip-text text-transparent">
                                $11.99
                            </h2>
                            <p className="text-xs md:text-sm text-white/75 font-semibold">
                                /month
                            </p>
                        </div>
                        
                    </div>

                </div>
                <div className="flex flex-col">
                    <Button variant="pricing" size="lg">
                        <span>Checkout</span>
                        <ArrowRight strokeWidth={3} stroke="black" />
                    </Button>
                </div>
            </motion.div>
            <motion.div className="flex flex-row px-4 md:px-8 py-3 md:py-6 rounded-3xl bg-gradient-to-br from-purple-500/50 via-red-500/25 to-purple-500/30 border border-white/25 hover:border-white/50 transition-all duration-150 ease-in-out items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
            >
                <div className="flex flex-row gap-3 items-center">
                    <FlameIcon strokeWidth={2} className="md:w-16 md:h-16 w-12 h-12 p-1 md:p-2 bg-purple-300/25 rounded-full stroke-purple-300" />
                    <div className="flex flex-col items-start justify-center">
                        <h2 className="text-md md:text-2xl text-white font-sora font-extrabold ">
                            Basic plan
                        </h2>
                        <h2 className="text-sm md:text-lg text-white/75 font-sora font-bold">
                            $7.99/mo
                        </h2>
                    </div>

                </div>
                <div className="flex flex-col">
                    <Button variant="pricing" size="lg" className="bg-gradient-to-br from-purple-300 from-20% via-white via-50% to-red-300 to-80% opacity-85 hover:opacity-100">
                        <span className="font-aleo lg:text-lg text-black">Checkout</span>
                        <ArrowRight strokeWidth={3} stroke="black" />
                    </Button>
                </div>
            </motion.div>
            <motion.div className="flex flex-row px-4 md:px-8 py-3 md:py-6 rounded-3xl bg-gradient-to-br from-gray-500/25 via-white/12 to-gray-500/15 border border-white/25 transition-all duration-150 ease-in-out items-center justify-between pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.6, type: "spring" }}
            >
                <div className="flex flex-row gap-3 items-center">
                    <LaughIcon strokeWidth={2} className="md:w-16 md:h-16 w-12 h-12 p-1 md:p-2 bg-gray-300/25 rounded-full stroke-gray-300" />
                    <div className="flex flex-col items-start justify-center">
                        <h2 className="text-md md:text-2xl text-white font-sora font-extrabold ">
                            Teacher&apos;s Plan
                        </h2>
                        <h2 className="text-sm md:text-lg text-white/75 font-sora font-bold">
                            $IDK.99/mo
                        </h2>
                    </div>

                </div>
                <div className="flex flex-col">
                    <Button variant="pricing" disabled size="default" className="bg-gradient-to-t from-gray-500/50 to-gray-200">
                        <span className="font-aleo lg:text-lg text-white">Coming soon</span>
                    </Button>
                </div>
            </motion.div>

            <div className="flex flex-row items-center justify-stretch gap-2">
                    HELLO
            </div>
        </div>
        
    );
};

export default PricingCards;