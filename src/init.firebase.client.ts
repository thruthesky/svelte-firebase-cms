import { initializeApp } from "firebase/app";
const firebaseConfig: { [key: string]: string; } = {
    apiKey: "AIzaSyA2q3ux4nqf2-iWY6nPTqqCRvqHQ70aWfU",
    authDomain: "silbus.firebaseapp.com",
    databaseURL: "https://silbus-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "silbus",
    storageBucket: "silbus.appspot.com",
    messagingSenderId: "575893880018",
    appId: "1:575893880018:web:7ce155406741346aefc10b",
    measurementId: "G-3KQTNK89WP"
};
export const app = initializeApp(firebaseConfig);
