<script>
	import NotSignedIn from '$lib/components/NotSignedIn.svelte';
	import SignedIn from '$lib/components/SignedIn.svelte';
	import Value from '$lib/components/Value.svelte';
	import ValueList from '$lib/components/ValueList.svelte';
</script>

<h1>+page.svelte</h1>
<SignedIn let:user let:signOut let:auth>
	You are signed in with {user.uid}
	<button on:click={signOut}>Sign Out</button>
	{auth.currentUser?.email}
</SignedIn>

<NotSignedIn>
	<a href="/user/sign-in">SignIn</a>
</NotSignedIn>

<p>
	<Value
		path="post-all-summaries/-NvgtY78Qcowz-zwjRnN"
		hydrate={{ title: 'THIS IS TITLE P' }}
		let:data
	>
		{#each Object.keys(data) as key}
			{key}: {data[key]} &nbsp;
		{/each}
	</Value>
</p>

<Value path="post-all-summaries/-NvgtY78Qcowz-zwjRnN" hydrate={{ title: 'THIS IS TITLE' }} let:data>
	{#each Object.keys(data) as key}
		{key}: {data[key]} &nbsp;
	{/each}
</Value>

<ValueList path="post-all-summaries" let:data>
	{#each data as item}
		<p>
			{#each Object.keys(item) as key}
				{key}: {item[key]}&nbsp;
			{/each}
		</p>
	{/each}
</ValueList>
