import { NextResponse } from "next/server";
import { adminDB } from "@/lib/firebase-admin";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get("username");

        if (!username) {
            return NextResponse.json(
                {
                    loginSuccess: false,
                    message: "Username parameter is required",
                },
                { status: 400 }
            );
        }

        const snapshot = await adminDB
            .collection("users")
            .where("username", "==", username)
            .limit(1)
            .get();

        if (snapshot.empty) {
            return NextResponse.json({
                loginSuccess: false,
                message: "Username not found",
            });
        }

        const userDoc = snapshot.docs[0];
        const userData = userDoc.data();

        if (!userData.email) {
            return NextResponse.json({
                loginSuccess: false,
                message: "User does not have an email",
            });
        }

        return NextResponse.json({ loginSuccess: true, email: userData.email });
    } catch (error) {
        console.error("Error fetching user email:", error);
        return NextResponse.json(
            { loginSuccess: false, message: "Server error fetching email" },
            { status: 500 }
        );
    }
}
