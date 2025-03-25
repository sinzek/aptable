// /frontend/app/u/[slug]/page.tsx
import * as admin from "firebase-admin";
import { notFound } from "next/navigation";
import AuthButton from "@/components/ui/loginButton";

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
            clientEmail: process.env.FBADMIN_CLIENT_EMAIL,
            privateKey: process.env.FBADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
    });
}

const db = admin.firestore();

async function checkUsernameAvailability(username: string) {
    try {
        const snapshot = await db
            .collection("users")
            .where("username", "==", username)
            .limit(1)
            .get();

        return !snapshot.empty;
    } catch (error) {
        console.error("Error checking username:", error);
        return false;
    }
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const userExists = await checkUsernameAvailability(slug);

    if (slug === "null") {
        return (
            <div className="flex flex-row h-screen w-full items-center justify-center text-2xl text-white font-aleo glow-shadow bg-maroon-500">
                <AuthButton />
            </div>
        );
    }

    if (!userExists) {
        notFound();
    }

    return (
        <div className="flex flex-row h-screen w-full items-center justify-center text-2xl text-white font-aleo glow-shadow bg-gradient-to-br from-purple-500 to-maroon-400">
            <p className="mr-1">This is</p>
            <p className="font-bold font-sora text-teal-500 mb-[2px]">{slug}</p>
            &apos;s Personal Home :3
        </div>
    );
}
