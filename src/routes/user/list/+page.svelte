<script>
	import InfiniteValueList from '$lib/components/InfiniteValueList.svelte';
</script>

<InfiniteValueList path={'users'} let:value>
	<p style="padding: 2em;">
		{value.uid}, {value.displayName}
	</p>

	<p slot="noMoreData" let:length>
		# No of post loaded: #{length}
		<br />
		No more posts
	</p>
	<p slot="loading">Loading data...</p>
</InfiniteValueList>
