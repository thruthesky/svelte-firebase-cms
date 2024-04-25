<script lang="ts">
	import ForumList from '$lib/components/ForumList.svelte';
	import InfiniteValueList from '$lib/components/InfiniteValueList.svelte';

	export let data;
	console.log(data.category);
</script>

<h1>{data.category}</h1>

<InfiniteValueList path={'posts-summary/' + data.category} let:value>
	<p style="padding: 3em;">
		{value['key']}, {value['title']}
	</p>

	<p slot="noMoreData">No more posts</p>
	<p slot="loading">Loading data...</p>
</InfiniteValueList>
