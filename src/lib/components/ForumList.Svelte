<script lang="ts">
	import { type DatabaseReference, type Database, getDatabase } from 'firebase/database';
	import ValueList from './ValueList.svelte';

	export let category: string;
	export let initialData: any[] = [];
</script>

<ValueList path={'post-summaries' + '/' + category} hydrate={initialData} let:data>
	{#each data as item}
		<p>
			{#each Object.keys(item) as key}
				{key}: {item[key]}
			{/each}
		</p>
	{/each}
</ValueList>
