// /frontend/app/api/users/duplicate-email/route.ts

import { NextResponse } from "next/server";
import { adminDB } from "@/lib/firebase-admin";

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

        const snapshot = await adminDB
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
