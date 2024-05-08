<svelte:options accessors />

<script lang="ts">
	import { getDatabase } from 'firebase/database';
	import valueListStore from '../store/value-list.store';

	export let path: string;
	export let hydrate: any[] = [];

	const rtdb = getDatabase();
	export let store = valueListStore(rtdb!, path, hydrate);
</script>

{#if $store !== undefined}
	<slot data={$store} ref={store.ref} count={$store?.length ?? 0} {rtdb} />
{:else}
	<slot name="loading" />
{/if}
.
