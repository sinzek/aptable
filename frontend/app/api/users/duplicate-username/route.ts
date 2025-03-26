// /frontend/app/api/users/duplicate-username/route.ts

import { NextResponse } from "next/server";
import { adminDB } from "@/lib/firebase-admin";

export async function GET(request: Request) {
    try {
        // Get username from the URL search parameters
        const { searchParams } = new URL(request.url);
        const username = searchParams.get("username");

        if (!username) {
            return NextResponse.json(
                { exists: false, message: "Username parameter is required" },
                { status: 400 }
            );
        }

        const snapshot = await adminDB
            .collection("users")
            .where("username", "==", username)
            .limit(1)
            .get();

        return NextResponse.json({ exists: !snapshot.empty });
    } catch (error) {
        console.error("Error checking username:", error);
        return NextResponse.json(
            { exists: false, message: "Server error checking username" },
            { status: 500 }
        );
    }
}
