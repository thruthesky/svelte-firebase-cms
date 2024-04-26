import { PUBLIC_FIREBASE_CLIENT_CONFIG } from "$env/static/public";


export function load() {
    return {
        firebaseClientConfig: JSON.parse(PUBLIC_FIREBASE_CLIENT_CONFIG),
    }
}

