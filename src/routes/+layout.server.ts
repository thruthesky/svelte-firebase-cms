import { FIREBASE_CLIENT_CONFIG } from "$env/static/private";

export function load() {

    console.log(JSON.stringify({
        apiKey: "AIzaSyBz2OFyac4LdNAA8jomtLlpSdBsO1BWyjY",
        authDomain: "withcenter-test-2.firebaseapp.com",
        databaseURL: "https://withcenter-test-2-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "withcenter-test-2",
        storageBucket: "withcenter-test-2.appspot.com",
        messagingSenderId: "817502397544",
        appId: "1:817502397544:web:c3089782f014d4032487dd"
    }));
    return {
        firebaseClientConfig: JSON.parse(FIREBASE_CLIENT_CONFIG),
    }
}

