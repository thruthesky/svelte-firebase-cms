<!-- <script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import NotSignedIn from '$lib/components/NotSignedIn.svelte';
	import SignedIn from '$lib/components/SignedIn.svelte';
	import { postCreate, type PostInterface } from '$lib/functions/post.functions.js';

	let formData: PostInterface = {
		title: '',
		content: '',
		category: $page.params.category
	};

	async function onSubmit() {
		if (!formData.title && !formData.content)
			return alert('Post title and content cant be both empty');
		console.log('create post', formData);
		await postCreate(formData);
		alert('Post created');
		goto(`/forum/${$page.params.category}`);
	}
</script>

<h1>Create Post</h1>

<NotSignedIn>User must login to create post</NotSignedIn>

<SignedIn>
	<form on:submit|preventDefault={onSubmit}>
		<div>
			<label for="title">Title</label>
			<input type="text" bind:value={formData.title} />
		</div>
		<div>
			<label for="content">Content</label>
			<input type="text" bind:value={formData.content} />
		</div>

		<button>Submit</button>
	</form>
</SignedIn> -->
