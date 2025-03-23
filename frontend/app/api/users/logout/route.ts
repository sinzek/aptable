/* eslint-disable @typescript-eslint/no-unused-vars */
// /frontend/app/api/logout/route.ts

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import * as admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

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
        const token = (await cookies()).get("session")?.value;

        if (!token) {
            return NextResponse.json(
                {
                    success: true,
                    message: "No session token found, user already logged out",
                },
                { status: 200 }
            );
        }

        const decodedToken = await getAuth().verifySessionCookie(token);
        await getAuth().revokeRefreshTokens(decodedToken.sub);

        (await cookies()).delete("session");

        return NextResponse.json(
            { success: true, message: "Logout successful" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Logout error:", error);
        (await cookies()).delete("session");
        return NextResponse.json(
            { success: false, message: "Logout failed" },
            { status: 500 }
        );
    }
}
