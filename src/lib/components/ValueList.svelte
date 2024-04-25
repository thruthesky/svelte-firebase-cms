<script lang="ts">
	import { valueListStore } from '$lib/store/value.store.js';

	import { type DatabaseReference, type Database, getDatabase } from 'firebase/database';

	export let path: string;
	export let hydrate: any[] = [];

	const rtdb = getDatabase();
	let store = valueListStore(rtdb!, path, hydrate);
</script>

{#if $store !== undefined}
	<slot data={$store} ref={store.ref} count={$store?.length ?? 0} {rtdb} />
{:else}
	<slot name="loading" />
{/if}
