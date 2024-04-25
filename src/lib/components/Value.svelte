<script lang="ts">
	import { valueStore } from '$lib/store/value.store.js';
	import { getDatabase } from 'firebase/database';

	export let path: string;
	export let hydrate: any = undefined;

	const rtdb = getDatabase();

	let store = valueStore(rtdb!, path, hydrate);
</script>

{#if $store !== undefined}
	<slot data={$store} ref={store.ref} {rtdb} />
{:else}
	<slot name="loading" />
{/if}
