<script lang="ts">
	import InfiniteValueList from '$lib/components/InfiniteValueList.svelte';
	import { onMount } from 'svelte';

	export let data;

	let controller: InfiniteValueList;

	onMount(() => {
		console.log('Category post list page mounted');
		controller?.onReset();
	});
</script>

<nav style="display: flex;">
	<h1>{data.category}</h1>
	<a href="/forum/create/{data.category}">Create a post</a>
</nav>

<InfiniteValueList path={'posts-summary/' + data.category} let:value bind:this={controller}>
	<p style="padding: 2em;">
		<a href="/forum/{value.category}/{value.key}">{value.title}</a>
	</p>

	<p slot="noMoreData" let:length>
		# No of post loaded: #{length}
		<br />
		No more posts
	</p>
	<p slot="loading">Loading data...</p>
</InfiniteValueList>
