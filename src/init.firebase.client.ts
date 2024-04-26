import { initializeApp, type FirebaseApp } from "firebase/app";
let initialized = false;
export function initializeFirebaseClient(firebaseConfig: { [key: string]: string; }) {
    if (initialized) return;
    const app = initializeApp(firebaseConfig);
    initialized = true;
    return app;
}