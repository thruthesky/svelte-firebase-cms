import { postList } from '$lib/functions/post.functions.js';

export async function load({ params }) {

    const posts = postList();


    return {
        category: params.category,
        posts,
    }
}