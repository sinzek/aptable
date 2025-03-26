// frontend/utils/firebase-admin.ts

import { initializeApp } from "firebase-admin/app";
import { apps, credential, firestore } from "firebase-admin";

if (!apps.length) {
    initializeApp({
        credential: credential.cert({
            projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
            clientEmail: process.env.FBADMIN_CLIENT_EMAIL,
            privateKey: process.env.FBADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
    });
}

export const adminDB = firestore();
