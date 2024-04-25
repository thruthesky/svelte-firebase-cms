<script lang="ts">
	import ForumList from '$lib/components/ForumList.svelte';
	import InfiniteValueList from '$lib/components/InfiniteValueList.svelte';

	export let data;
	console.log(data.category);
</script>

<h1>{data.category}</h1>

<InfiniteValueList path={'posts-summary/' + data.category} let:values>
	{#each values as item}
		<p style="padding: 3em;">
			{#each Object.keys(item) as key}
				{key}: {item[key]}
			{/each}
		</p>
	{/each}

	<p slot="noData">No data</p>
</InfiniteValueList>
