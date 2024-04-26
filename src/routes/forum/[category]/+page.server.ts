import { postList } from '$lib/functions/post.functions.js';

export async function load({ params }) {

    const posts = await postList({ path: 'posts-summary/' + params.category, });

    return {
        category: params.category,
        posts,
    }
}