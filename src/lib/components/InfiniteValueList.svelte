<svelte:options accessors />

<script lang="ts">
	import {
		fetch,
		unsubscribe,
		values,
		noMoreData,
		reset
	} from '$lib/store/infinite-value-list.store.js';

	import { getDatabase } from 'firebase/database';
	import { onDestroy, onMount } from 'svelte';

	export let path: string;

	const rtdb = getDatabase();

	fetch({ rtdb, path, limit: 5 });

	onMount(() => {
		console.log('InfiniteValueList mounted');
	});

	onDestroy(() => {
		unsubscribe();
		console.log('InfiniteValueList destroyed');
	});

	export function onReset() {
		reset();
		fetch({ rtdb, path, limit: 5 });
	}

	function onScroll(e: Event) {
		const el = document.documentElement;
		const bottom = el.scrollHeight - el.clientHeight - el.scrollTop;
		const top = el.scrollTop;

		console.log('bottom', bottom);
		console.log('top', top);

		if (top <= 300) {
			// console.log('--> (boom) reached at top;', top);
		}

		if (bottom <= 300) {
			console.log('--> (boom) reached at bottom;', bottom);
			fetch({ rtdb, path, limit: 5 });
		}
	}
</script>

<svelte:window on:scroll={onScroll} />

{#if $values}
	{#each Object.keys($values) as k (k)}
		<p style="padding: 3em;">
			<slot value={$values[k]} />
		</p>
	{/each}

	{#if $noMoreData}
		<slot name="noMoreData" length={Object.keys($values).length} />
	{/if}
{:else}
	<slot name="loading" />
{/if}
