import { GraduationCap } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./button";

const PricingCards = () => {
    return (
        <div className="flex flex-col gap-3 w-full">
            <motion.div className="flex flex-row px-4 md:px-8 py-3 md:py-6 rounded-3xl bg-gradient-to-br from-orange-500/50 via-yellow-500/40 to-orange-500/30 border border-white/25 hover:border-white/50 transition-all duration-150 ease-in-out items-center justify-between"
                initial={{ opacity: 0, boxShadow: "0px 0px 0px #000" }}
                animate={{ opacity: 1, boxShadow: "0px 0px 7px #FFFFFF95" }}
                transition={{ delay: 0.5, type: "spring" }}
            >
                <div className="flex flex-row gap-3 items-center">
                    <GraduationCap strokeWidth={2} className="md:w-16 md:h-16 w-12 h-12 p-1 md:p-2 bg-yellow-500/25 rounded-full stroke-yellow-200" />
                    <div className="flex flex-col items-start justify-center">
                        <h2 className="text-xl md:text-2xl text-white font-sora font-extrabold ">
                            Student Plan
                        </h2>
                        <h2 className="text-base md:text-lg text-white/75 font-sora font-bold">
                            $11.99/mo
                        </h2>
                    </div>

                </div>
                <div className="flex flex-col">
                    <Button variant="pricing" size="lg">
                        <span>Yep this one</span>
                    </Button>
                </div>
            </motion.div>
            <motion.div className="flex flex-row px-4 md:px-8 py-3 md:py-6 rounded-3xl bg-gradient-to-br from-purple-500/50 via-red-500/25 to-purple-500/30 border border-white/25 hover:border-white/50 transition-all duration-150 ease-in-out items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
            >
                <div className="flex flex-row gap-3 items-center">
                    <GraduationCap strokeWidth={2} className="md:w-16 md:h-16 w-12 h-12 p-1 md:p-2 bg-purple-300/25 rounded-full stroke-purple-300" />
                    <div className="flex flex-col items-start justify-center">
                        <h2 className="text-xl md:text-2xl text-white font-sora font-extrabold ">
                            Basic plan
                        </h2>
                        <h2 className="text-base md:text-lg text-white/75 font-sora font-bold">
                            $11.99/mo
                        </h2>
                    </div>

                </div>
                <div className="flex flex-col">
                    <Button variant="pricing" size="default" className="bg-gradient-to-t from-purple-500/50 to-purple-200">
                        <span className="font-aleo lg:text-lg text-white">Nah this one</span>
                    </Button>
                </div>
            </motion.div>
            <motion.div className="flex flex-row px-8 py-6 rounded-3xl bg-gradient-to-br from-purple-500/45 via-red-500/25 to-purple-500/30 border border-white/25 hover:border-white/50 transition-all duration-150 ease-in-out items-center"
                initial={{ opacity: 0, boxShadow: "0px 0px 0px #000" }}
                animate={{ opacity: 1, boxShadow: "0px 5px 20px #00000060" }}
                transition={{ delay: 0.7, type: "spring" }}
            >

            </motion.div>
        </div>
    );
};

export default PricingCards;