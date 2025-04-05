"use client";

import { ArrowBigRight, ChartLine } from "lucide-react";

export const ThreeOptions = () => {
    return (
        <div className="flex flex-row w-full h-full gap-6 justify-center">
            <button
                type="button"
                className="flex flex-row w-64 h-24 hover:shadow-yellow-500/10 hover:shadow-xl transition-all duration-100 active:brightness-90 hover:brightness-125 bg-gradient-to-r from-yellow-400/75 to-yellow-500/90 rounded-xl p-5 items-center justify-between"
            >
                <div className="flex flex-col text-left">
                    <h3 className="text-white font-sora font-extrabold text-xl">
                        Continue
                    </h3>
                    <h3 className="text-gray-200 font-sora font-semibold text-base">
                        where you left off
                    </h3>
                </div>
                <div className="p-1 rounded-full bg-white/30">
                    <ArrowBigRight
                        strokeWidth={3}
                        size={30}
                        className="fill-white stroke-2"
                    />
                </div>
            </button>
            <button
                type="button"
                className="flex flex-row w-64 h-24 hover:shadow-red-500/10 hover:shadow-xl transition-all duration-100 active:brightness-90 hover:brightness-125 bg-gradient-to-r from-red-400/75 to-red-500/75 rounded-xl p-5 items-center justify-between"
            >
                <div className="flex flex-col text-left">
                    <h3 className="text-white font-sora font-extrabold text-xl">
                        Courses
                    </h3>
                    <h3 className="text-gray-200 font-sora font-semibold text-base">
                        view all courses
                    </h3>
                </div>
                <div className="p-1 rounded-full bg-white/20">
                    <ChartLine
                        strokeWidth={3}
                        size={30}
                        className=" stroke-white stroke-4 scale-75"
                    />
                </div>
            </button>
            <button
                type="button"
                className="flex flex-row w-64 h-24 hover:shadow-teal-500/10 hover:shadow-xl transition-all duration-100 active:brightness-90 hover:brightness-125 bg-gradient-to-r from-teal-400/75 to-teal-500/75 rounded-xl p-5 items-center justify-between"
            >
                <div className="flex flex-col text-left">
                    <h3 className="text-white font-sora font-extrabold text-xl">
                        Stats
                    </h3>
                    <h3 className="text-gray-200 font-sora font-semibold text-base">
                        view your stats
                    </h3>
                </div>
                <div className="p-1 rounded-full bg-white/20">
                    <ChartLine
                        strokeWidth={3}
                        size={30}
                        className=" stroke-white stroke-4 scale-75"
                    />
                </div>
            </button>
        </div>
    );
};
