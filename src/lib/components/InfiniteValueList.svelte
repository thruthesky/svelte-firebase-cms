<svelte:options accessors />

<script lang="ts">
	import { fetch, unsubscribe, values } from '$lib/store/infinite-value-list.store.js';

	import { getDatabase } from 'firebase/database';
	import { onDestroy, onMount } from 'svelte';
	import { get } from 'svelte/store';

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

{#if $values.length > 0}
	<div style="">
		<slot values={get(values)} />
	</div>
	<button
		on:click={() =>
			fetch({
				rtdb,
				path,
				limit: 5,
				order: 'order',
				orderValue: get(values).at(get(values).length - 1)?.order
			})}>Fetch more</button
	>
{:else}
	<slot name="noData" />
{/if}
