import { FIREBASE_OPTIONS } from "$env/static/private";

export function load() {
    return {
        firebaseOptions: JSON.parse(FIREBASE_OPTIONS),
    }
}
