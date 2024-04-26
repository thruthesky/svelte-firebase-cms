import { Database, get, getDatabase, ref } from 'firebase/database';
import { initializeFirebaseClient } from '../../../../init.firebase.client.js';
import { PUBLIC_FIREBASE_CLIENT_CONFIG } from '$env/static/public';


export async function load({ params }) {

    initializeFirebaseClient(JSON.parse(PUBLIC_FIREBASE_CLIENT_CONFIG));
    const rtdb: Database = getDatabase();

    const category = params.category;
    const id = params.id;

    const postRef = ref(rtdb, 'posts/' + category + '/' + id);

    const snapshot = await get(postRef);

    return {
        category,
        id,
        post: snapshot.val(),
    };
}



