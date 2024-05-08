<script lang="ts">
	import { getDatabase } from 'firebase/database';
	import valueStore from '../store/value.store';

	export let path: string;
	export let hydrate: any = undefined;

	const rtdb = getDatabase();

	let store = valueStore(rtdb!, path, hydrate);
</script>

{#if $store !== undefined}
	<slot value={$store} ref={store.ref} {rtdb} />
{:else}
	<slot name="loading" />
{/if}
