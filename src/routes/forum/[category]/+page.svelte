<script lang="ts">
	import ValueList from '$lib/components/ValueList.svelte';

	export let data;
	console.log(data.category);
</script>

<h1>{data.category}</h1>

<ValueList path={'posts-summary' + '/' + data.category} let:data>
	{#each data as item}
		<p style="padding: 3em;">
			{#each Object.keys(item) as key}
				{key}: {item[key]}
			{/each}
		</p>
	{/each}
</ValueList>

<button>Get More Posts</button>
