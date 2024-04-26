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

<h1>{data.category}</h1>

<InfiniteValueList path={'posts-summary/' + data.category} let:value bind:this={controller}>
	<p style="padding: 3em;">
		{value['key']}, {value['title']}
	</p>

	<p slot="noMoreData" let:length>
		# No of post loaded: #{length}
		<br />
		No more posts
	</p>
	<p slot="loading">Loading data...</p>
</InfiniteValueList>
