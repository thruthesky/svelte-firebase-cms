<script lang="ts">
	import ValueList from './ValueList.svelte';

	export let category: string;
	export let initialData: any[] = [];

	let controller: ValueList;

	function onFetch() {
		console.log('store', controller.store?.fetch());
	}
</script>

<ValueList
	path={'posts-summary' + '/' + category}
	hydrate={initialData}
	let:data
	bind:this={controller}
>
	{#each data as item}
		<p style="padding: 3em;">
			{#each Object.keys(item) as key}
				{key}: {item[key]}
			{/each}
		</p>
	{/each}
</ValueList>

<button on:click={() => onFetch()}>Get More Posts</button>
