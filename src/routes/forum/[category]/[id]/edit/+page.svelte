<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import {
		postGet,
		postUpdate,
		type PostInterface
	} from '$lib/svelte-firebase-cms/functions/post.functions';

	let formData: PostInterface;

	console.log('edit::');

	onMount(async () => {
		formData = await postGet(`${$page.params.category}/${$page.params.id}`);
	});

	async function onSubmit() {
		console.log(formData);
		await postUpdate(formData);
		alert('post updated');
		goto(`/forum/${$page.params.category}/${$page.params.id}`);
	}
</script>

<h1>Edit Post</h1>

{#if formData}
	<form on:submit|preventDefault={onSubmit}>
		<p>
			<label for="title">
				<input bind:value={formData.title} />
			</label>
		</p>

		<p>
			<label for="content">
				<input bind:value={formData.content} />
			</label>
		</p>
		<button>Update</button>
	</form>
{/if}
