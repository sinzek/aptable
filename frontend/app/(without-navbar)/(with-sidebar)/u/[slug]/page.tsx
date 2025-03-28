// /frontend/app/u/[slug]/page.tsx

import { notFound } from "next/navigation";
import AuthButton from "@/components/ui/loginButton";
import {
    checkUsernameAvailability,
    getSessionWithUid,
    getUsernameFromUid,
} from "@/lib/server-utils";

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
        <div className="flex flex-row h-screen w-full items-center justify-center text-2xl text-white font-aleo glow-shadow bg-gradient-to-br from-purple-500 to-maroon-400 p-8 overflow-hidden">
            <p className="">This is&nbsp;</p>
            <p className="font-bold font-sora text-teal-500 mb-[2px]">
                your&nbsp;
            </p>
            Personal Home :3
        </div>
    );
}
