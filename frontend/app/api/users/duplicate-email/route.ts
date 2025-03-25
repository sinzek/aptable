// /frontend/app/api/users/duplicate-email/route.ts

import { NextResponse } from "next/server";
import * as admin from "firebase-admin";

// initialize Firebase Admin if not already initialized
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

export async function GET(request: Request) {
    try {
        // get email from the URL search parameters
        const { searchParams } = new URL(request.url);
        const email = searchParams.get("email");

        if (!email) {
            return NextResponse.json(
                { exists: false, message: "Email parameter is required" },
                { status: 400 }
            );
        }

        const snapshot = await db
            .collection("users")
            .where("email", "==", email)
            .limit(1)
            .get();

        return NextResponse.json({ exists: !snapshot.empty });
    } catch (error) {
        console.error("Error checking email:", error);
        return NextResponse.json(
            { exists: false, message: "Server error checking email" },
            { status: 500 }
        );
    }
}
