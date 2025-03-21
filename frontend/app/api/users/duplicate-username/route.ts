// /frontend/app/api/users/duplicate-username/route.ts

import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
            clientEmail: process.env.FBADMIN_CLIENT_EMAIL,
            privateKey: process.env.FBADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
    });
}

const db = admin.firestore();

export async function GET(request: Request) {
    try {
        // Get username from the URL search parameters
        const { searchParams } = new URL(request.url);
        const username = searchParams.get('username');

        if (!username) {
            return NextResponse.json({ exists: false, message: 'Username parameter is required' }, { status: 400 });
        }

        const snapshot = await db
            .collection('users')
            .where('username', '==', username)
            .limit(1)
            .get();

        return NextResponse.json({ exists: !snapshot.empty });
    } catch (error) {
        console.error('Error checking username:', error);
        return NextResponse.json({ exists: false, message: 'Server error checking username' }, { status: 500 });
    }
}