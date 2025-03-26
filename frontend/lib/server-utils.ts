// frontend/lib/server-utils.ts

import { adminDB } from "@/lib/firebase-admin";
import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";

export async function checkUsernameAvailability(
    username: string
): Promise<boolean> {
    try {
        const snapshot = await adminDB
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

export async function getSessionWithUid(): Promise<{
    authenticated: boolean;
    uid: string;
} | null> {
    try {
        const token = (await cookies()).get("session")?.value;

        if (!token) {
            return null;
        }

        const decodedToken = await getAuth().verifySessionCookie(token);
        if (decodedToken) {
            return { authenticated: true, uid: decodedToken.uid };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Session check error:", error);
        return null;
    }
}

export async function getUsernameFromUid(uid: string): Promise<string | null> {
    try {
        const docRef = adminDB.collection("users").doc(uid);
        const docSnapshot = await docRef.get();

        if (docSnapshot.exists) {
            const data = docSnapshot.data();
            return (data?.username as string | undefined) ?? null; // Assuming 'username' field exists
        }
        return null;
    } catch (error) {
        console.error(
            "Error getting username from UID (as document ID):",
            error
        );
        return null;
    }
}
