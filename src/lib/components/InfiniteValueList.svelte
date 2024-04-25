<svelte:options accessors />

<script lang="ts">
	import { fetch, unsubscribe, values, noMoreData } from '$lib/store/infinite-value-list.store.js';

	import { getDatabase } from 'firebase/database';
	import { onDestroy, onMount } from 'svelte';

	export let path: string;

	const rtdb = getDatabase();

	fetch({ rtdb, path, limit: 5 });

	onMount(() => {
		console.log('InfiniteValueList mounted');
		// listen scroll event

		// if at bottom,

		// fetch more
	});

	onDestroy(() => {
		unsubscribe();
		console.log('InfiniteValueList destroyed');
	});
</script>

{#if $values}
	{#each Object.keys($values) as k (k)}
		<p style="padding: 3em;">
			<slot value={$values[k]} />
		</p>
	{/each}

	{Object.keys($values).length}

	<hr />

	{#if $noMoreData}
		<slot name="noMoreData" />
	{/if}

	<button
		on:click={() =>
			fetch({
				rtdb,
				path,
				limit: 5
			})}>Fetch more</button
	>
{:else}
	<slot name="loading" />
{/if}
