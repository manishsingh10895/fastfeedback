import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config({ path: ".env.local" });

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            privateKey: process.env.FIREBASE_PRIVATE_KEY,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            projectId: process.env.FIREBASE_PROJECT_ID,
        }),
    });
}

export const auth = admin.auth();
export const firestore = admin.firestore();