<script>
	import { page } from '$app/stores';
	import Value from '$lib/components/Value.svelte';

	export let data;

	console.log('data----', data);
</script>

<section class="post-view">
	{$page.params.category}/{$page.params.id}

	<a href="{$page.url.pathname}/edit">EDIT</a>
	<Value path="posts/{data.category}/{data.id}" hydrate={data.post} let:value>
		<h1>{value.title}</h1>
		<p>{value.content}</p>
	</Value>
</section>
