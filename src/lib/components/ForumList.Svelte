<script lang="ts">
	import { type DatabaseReference, type Database, getDatabase } from 'firebase/database';

	export let path: string;
	export let hydrate: any[] = [];

	const rtdb = getDatabase();
	let store = forumListStore(rtdb, 'post-summaries-test/generated-data');
</script>

{#if $store !== undefined}
	<slot data={$store} ref={store.ref} count={$store?.length ?? 0} {rtdb} />
{:else}
	<slot name="loading" />
{/if}
