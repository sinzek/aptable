// /frontend/app/api/session/route.ts

import { NextResponse } from "next/server";
import * as admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
            clientEmail: process.env.FBADMIN_CLIENT_EMAIL,
            privateKey: process.env.FBADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
    });
}

export async function POST(request: Request) {
    try {
        const { idToken } = await request.json();

        const expiresIn = 60 * 60 * 24 * 14 * 1000; // 14 days

        const sessionCookie = await getAuth().createSessionCookie(idToken, {
            expiresIn,
        });

        (await cookies()).set("session", sessionCookie, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: expiresIn,
            sameSite: "strict",
            path: "/",
        });

        return NextResponse.json({
            success: true,
            message: "Session cookie set",
        });
    } catch (error) {
        console.error("Error setting session cookie:", error);
        return NextResponse.json(
            { success: false, message: "Failed to set session cookie" },
            { status: 500 }
        );
    }
}
