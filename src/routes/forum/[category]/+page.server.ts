// import { PUBLIC_FIREBASE_CLIENT_CONFIG } from '$env/static/public';
// import { postList } from '$lib/functions/post.functions.js';
// import { initializeFirebaseClient } from '../../../init.firebase.client.js';

// export async function load({ params }) {

//     initializeFirebaseClient(JSON.parse(PUBLIC_FIREBASE_CLIENT_CONFIG));

//     const posts = await postList({ path: 'post-summaries/' + params.category });

//     return {
//         category: params.category,
//         posts,
//     }
// }