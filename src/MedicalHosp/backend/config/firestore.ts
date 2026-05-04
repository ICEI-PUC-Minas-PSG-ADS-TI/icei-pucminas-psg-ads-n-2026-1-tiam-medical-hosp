import * as FirebaseAdmin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from 'firebase-admin/auth';
import "dotenv/config";

const app = FirebaseAdmin.initializeApp({
    credential: FirebaseAdmin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID!,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
        privateKey: process.env.FIREBASE_PRIVATE_KEY!
    })
});


const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };