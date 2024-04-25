import { initializeApp } from "firebase/app";
const firebaseConfig: { [key: string]: string; } = import.meta.env.MODE == 'dev4' ? {
    apiKey: "AIzaSyBBtKOZkwQtXWu7QrjcLHYMg23sOvj6mdU",
    authDomain: "app-test-db-357d4.firebaseapp.com",
    projectId: "app-test-db-357d4",
    storageBucket: "app-test-db-357d4.appspot.com",
    messagingSenderId: "47750314707",
    appId: "1:47750314707:web:936d4838bbdb78cbe27226",
    measurementId: "G-QFWSWH12W4"
  } : {
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
