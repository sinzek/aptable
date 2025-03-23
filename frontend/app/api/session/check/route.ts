/* eslint-disable @typescript-eslint/no-unused-vars */
// /frontend/app/api/check-session/route.ts

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

export async function GET(request: Request) {
    try {
        const token = (await cookies()).get("session")?.value;

        if (!token) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        await getAuth().verifySessionCookie(token);

        return NextResponse.json({ authenticated: true });
    } catch (error) {
        console.error("Session check error:", error);
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
}
