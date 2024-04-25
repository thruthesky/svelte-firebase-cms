import { initializeApp } from "firebase/app";
const firebaseConfig: { [key: string]: string; } = {
    apiKey: "AIzaSyCnPH25HAoMhbIqqh-HpnhfemioGZJMRos",
    authDomain: "withcenter-silvers.firebaseapp.com",
    databaseURL: "https://withcenter-silvers-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "withcenter-silvers",
    storageBucket: "withcenter-silvers.appspot.com",
    messagingSenderId: "543108954889",
    appId: "1:543108954889:web:4997ca2b9b7d89992cb1d8",
    measurementId: "G-X55GDV9Z2T"
};
export const app = initializeApp(firebaseConfig);
