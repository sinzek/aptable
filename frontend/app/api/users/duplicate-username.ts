import type { NextApiRequest, NextApiResponse } from 'next';
import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

// initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
    });
}

const db = getFirestore();

type ResponseData = {
    exists: boolean;
    message?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ exists: false, message: 'Method Not Allowed' });
    }

    try {
        const { username } = req.query;

        // Validate username parameter
        if (!username || typeof username !== 'string') {
            return res.status(400).json({ exists: false, message: 'Username parameter is required' });
        }

        // Query Firestore for the username
        const snapshot = await db
            .collection('users')
            .where('username', '==', username)
            .limit(1)
            .get();

        // Return whether the username exists
        return res.status(200).json({ exists: !snapshot.empty });
    } catch (error) {
        console.error('Error checking username:', error);
        return res.status(500).json({ exists: false, message: 'Server error checking username' });
    }
}