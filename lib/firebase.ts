import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/functions';

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    });
}

export const app = firebase.app();

export default firebase;


export const firebaseConfig = {
    apiKey: "AIzaSyBxHbc4FPG04vve45v5aSIVab1GRdWSBzk",
    authDomain: "fast-feedback-8db36.firebaseapp.com",
    projectId: "fast-feedback-8db36",
    storageBucket: "fast-feedback-8db36.appspot.com",
    messagingSenderId: "549504055123",
    appId: "1:549504055123:web:905cc5aa803bc1daa513a6"
};