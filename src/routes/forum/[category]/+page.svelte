<script lang="ts">
	import InfiniteValueList from '$lib/components/InfiniteValueList.svelte';

	export let data;
</script>

<nav style="display: flex;">
	<h1>{data.category}</h1>
	<a href="/forum/{data.category}/create">Create a post</a>
</nav>

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
