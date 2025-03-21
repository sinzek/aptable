import { ArrowRight, FlameIcon, GraduationCap, LaughIcon } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./button";

const PricingCards = () => {
    return (
        <div className="flex flex-col gap-3 w-full">
            <motion.div className="relative overflow-hidden flex flex-row px-4 md:px-8 py-3 md:py-6 rounded-3xl bg-gradient-to-br from-orange-500/50 via-yellow-500/40 to-orange-500/30 border border-white/75 transition-all duration-150 ease-in-out items-center justify-between"
                initial={{ opacity: 0, boxShadow: "0px 0px 0px #000" }}
                animate={{ opacity: 1, boxShadow: "0px 0px 7px #FFFFFF95" }}
                transition={{ delay: 0.5, type: "spring" }}
            >
                <div className="absolute flex flex-col items-center justify-center text-red-100/85 text-[0.5rem] md:text-xs font-extrabold font-sora top-4 md:top-6 -left-8 w-28 h-4 md:w-36 md:h-8 bg-gradient-to-r from-red-700 via-red-500 to-red-700 shadow-md -rotate-45">most popular!</div>
                <div className="flex flex-row gap-3 items-center">
                    <GraduationCap strokeWidth={2} className="md:w-16 md:h-16 w-12 h-12 p-1 md:p-2 bg-yellow-500/25 rounded-full stroke-yellow-200" />
                    <div className="flex flex-col items-start justify-center">
                        <h2 className="text-md md:text-xl font-sora font-extrabold text-white">
                            ✨Student Plan✨
                        </h2>
                        <div className="flex flex-row items-center justify-center gap-1">
                            <p className="text-xs md:text-sm text-white/75 font-semibold line-through">
                                $25
                            </p>
                            <h2 className="text-lg md:text-3xl font-sora font-extrabold bg-gradient-to-r from-yellow-500 to-red-400 bg-clip-text text-transparent">
                                $12
                            </h2>
                            <p className="text-xs md:text-sm text-white/75 font-semibold">
                                /month
                            </p>
                        </div>

                    </div>

                </div>
                <div className="flex flex-col">
                    <Button variant="pricing" size="lg" className="bg-gradient-to-r from-yellow-500 to-red-400">
                        <span className="font-aleo lg:text-lg text-darkpurple-500">Subscribe</span>
                        <ArrowRight strokeWidth={3} className="stroke-darkpurple-500" />
                    </Button>
                </div>
            </motion.div>
            <motion.div className="flex flex-row px-4 md:px-8 py-3 md:py-6 rounded-3xl bg-gradient-to-br from-purple-400/25 via-maroon-400/25 to-purple-400/25 border border-white/50 transition-all duration-150 ease-in-out items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
            >
                <div className="flex flex-row gap-3 items-center">
                    <FlameIcon strokeWidth={2} className="md:w-16 md:h-16 w-12 h-12 p-1 md:p-2 bg-purple-300/25 rounded-full stroke-purple-300" />
                    <div className="flex flex-col items-start justify-center">
                        <h2 className="text-md md:text-xl text-white font-sora font-extrabold ">
                            Basic plan
                        </h2>
                        <div className="flex flex-row items-center justify-center gap-1">
                            <p className="text-xs md:text-sm text-white/75 font-semibold line-through">
                                $17
                            </p>
                            <h2 className="text-lg md:text-3xl font-sora font-extrabold text-teal-300">
                                $8
                            </h2>
                            <p className="text-xs md:text-sm text-white/75 font-semibold">
                                /month
                            </p>
                        </div>
                    </div>

                </div>
                <div className="flex flex-col">
                    <Button variant="pricing" size="lg" className="bg-teal-300">
                        <span className="font-aleo lg:text-lg text-darkpurple-500">Subscribe</span>
                        <ArrowRight strokeWidth={3} className="stroke-darkpurple-500" />
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
                        <h2 className="text-md md:text-xl text-white font-sora font-extrabold ">
                            Teacher&apos;s Plan
                        </h2>
                        <div className="flex flex-row items-center justify-center gap-1">
                            <p className="text-xs md:text-sm text-white/75 font-semibold line-through">
                                $???
                            </p>
                            <h2 className="text-lg md:text-3xl font-sora font-extrabold text-gray-300">
                                $???
                            </h2>
                            <p className="text-xs md:text-sm text-white/75 font-semibold">
                                /month
                            </p>
                        </div>
                    </div>

                </div>
                <div className="flex flex-col">
                    <Button variant="pricing" disabled size="lg" className="bg-gradient-to-br from-gray-500/70 via-gray-200 to-gray-500/70">
                        <span className="font-aleo lg:text-lg text-darkpurple-500">Coming soon</span>
                        <ArrowRight strokeWidth={3} className="stroke-darkpurple-500" />
                    </Button>
                </div>
            </motion.div>
        </div>

    );
};

export default PricingCards;