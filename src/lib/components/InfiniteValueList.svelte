<svelte:options accessors />

<script lang="ts">
	import { page } from '$app/stores';
	import type { MapMap } from '$lib/interfaces.js';
	import { fetch, values, noMoreData, reset } from '$lib/store/infinite-value-list.store.js';

	import { getDatabase } from 'firebase/database';
	import { onDestroy, onMount } from 'svelte';

	export let hydrate: MapMap = {};
	export let path: string;

	let unsubscribe: () => void;

	const rtdb = getDatabase();

	fetch({ rtdb, path, limit: 10, hydrate });

	onMount(() => {
		console.log('InfiniteValueList mounted');

		/// When categry changes, reset the store and fetch new data
		unsubscribe = page.subscribe(() => {
			console.log('pageChange:Reset:InfiniteValueList');
			onReset();
		});
	});

	onDestroy(() => {
		console.log('InfiniteValueList destroyed');
		reset();

		unsubscribe?.();
	});

	export function onReset() {
		reset();
		fetch({ rtdb, path, limit: 10 });
	}

	function onScroll(e: Event) {
		const el = document.documentElement;
		const bottom = el.scrollHeight - el.clientHeight - el.scrollTop;
		const top = el.scrollTop;

		// Do something when the user scrolls to the top of the page
		if (top <= 300) {
			// console.log('--> (hit) reached at top;', top);
		}

		// Load more data when the user scrolls to the bottom of the page
		if (bottom <= 300) {
			console.log('--> (hit) reached at bottom;', bottom);
			fetch({ rtdb, path, limit: 5 });
		}
	}
</script>

<svelte:window on:scroll={onScroll} />

{#if $values}
	{#each Object.keys($values) as k (k)}
		<slot value={$values[k]} />
	{/each}

	{#if $noMoreData}
		<!-- Display this slot when there is no more data to load -->
		<slot name="noMoreData" length={Object.keys($values).length} />
	{/if}
{:else}
	<!-- Display this slot when data is loading -->
	<slot name="loading" />
{/if}
