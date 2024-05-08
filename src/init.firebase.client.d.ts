import { type FirebaseApp } from "firebase/app";
export declare function initializeFirebaseClient(firebaseConfig: {
    [key: string]: string;
}): FirebaseApp | undefined;
