<script lang="ts">
	import ForumList from '$lib/components/ForumList.svelte';

	export let data;
	console.log(data.category);
</script>

<h1>{data.category}</h1>

<ForumList category={data.category}></ForumList>
