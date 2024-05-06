<script lang="ts">
	import InfiniteValueList from '$lib/components/InfiniteValueList.svelte';

	// import { page } from '$app/stores';
	// import { onDestroy, onMount } from 'svelte';

	export let data;

	// let controller: InfiniteValueList;
	// let unsubscribe: () => void;

	// onMount(() => {
	// 	// /// When categry changes, reset the store and fetch new data
	// 	// unsubscribe = page.subscribe(() => {
	// 	// 	controller?.onReset();
	// 	// });
	// });

	// onDestroy(() => {
	// 	// unsubscribe?.();
	// });
</script>

<nav style="display: flex;">
	<h1>{data.category}</h1>
	<a href="/forum/{data.category}/create">Create a post</a>
</nav>

<!-- <InfiniteValueList
	path={'post-summaries/' + data.category}
	hydrate={data.posts}
	let:value
	bind:this={controller}
> -->

<InfiniteValueList path={'post-summaries/' + data.category} hydrate={data.posts} let:value>
	<p style="padding: 2em;">
		<a href="/forum/{data.category}/{value.key}">{value.title}</a>
		<span>
			{value.content}
		</span>
		<span style="display: block;"></span>{value.key}
		<span style="display: block; margin-top:1em"
			>{new Date(value['createdAt']).toLocaleString()}</span
		>
	</p>

	<p slot="noMoreData" let:length>
		# No of post loaded: #{length}
		<br />
		No more posts
	</p>
	<p slot="loading">Loading data...</p>
</InfiniteValueList>
