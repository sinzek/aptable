// /frontend/app/u/[slug]/page.tsx

import { notFound } from "next/navigation";
import AuthButton from "@/components/ui/loginButton";
import {
    checkUsernameAvailability,
    getSessionWithUid,
    getUsernameFromUid,
} from "@/lib/server-utils";
import { SearchBar } from "@/components/ui/searchBar";
import { ThreeOptions } from "./threeOptions";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const userExists = await checkUsernameAvailability(slug);

    if (!userExists) {
        notFound();
    }

    const sessionInfo = await getSessionWithUid();
    let username: string | null = null;

    if (sessionInfo?.uid) {
        username = await getUsernameFromUid(sessionInfo.uid);
    }

    if (slug === "null") {
        // need to disallow username "null" lol
        return (
            <div className="flex flex-row h-screen w-full items-center justify-center text-2xl text-white font-aleo glow-shadow bg-maroon-300 overflow-hidden">
                <AuthButton />
            </div>
        );
    } else if (
        !sessionInfo?.authenticated ||
        (sessionInfo?.authenticated && username != slug) // if user is on an existing profile but is not logged in, or if the user is logged in but is viewing another user's profile
    ) {
        return (
            <div className="flex flex-row h-screen w-full items-center justify-center text-2xl text-white font-aleo glow-shadow bg-gradient-to-br from-red-600 to-maroon-500 overflow-hidden">
                <p className="mr-1">This is</p>
                <p className="font-bold font-sora text-teal-500 mb-[2px]">
                    {slug}
                </p>
                &apos;s Personal Home :3
            </div>
        );
    }

    return (
        <div className="h-screen text-2xl text-white font-aleo glow-shadow bg-darkpurple-500 overflow-hidden">
            <div className="flex flex-col w-full py-6 items-center justify-center px-[25%] gap-2 bg-gradient-to-r from-purple-700/50 via-purple-500/50 to-purple-700/50">
                <h1 className="text-center font-sora text-white font-extrabold text-xl md:text-2xl">
                    Welcome, <span className="text-teal-300">{slug}!</span>
                </h1>
                <h4 className="text-center font-aleo text-gray-300 font-semibold text-sm md:text-md/6 text-balance pb-4">
                    What are you learning today, pal? Yeahh buddy, walk away...
                    Yeahhhh
                </h4>
                <SearchBar placeholder="Find a course" className="w-96" />
            </div>
            <div className="flex flex-col gap-2 w-full px-24 mt-10">
                <ThreeOptions />
                <h2 className="font-sora font-semibold text-xl md:text-2xl">
                    Your courses
                </h2>
            </div>
        </div>
    );
}
