<script lang="ts">
	import ValueList from './ValueList.svelte';
	import store from '$lib/store/value-list.store.js';

	export let category: string;
	export let initialData: any[] = [];

	function onFetch() {
		store.fetch();
	}
</script>

<ValueList path={'posts-summary' + '/' + category} hydrate={initialData} let:data>
	{#each data as item}
		<p style="padding: 3em;">
			{#each Object.keys(item) as key}
				{key}: {item[key]}
			{/each}
		</p>
	{/each}
</ValueList>

<button on:click={() => onFetch()}>Get More Posts</button>
