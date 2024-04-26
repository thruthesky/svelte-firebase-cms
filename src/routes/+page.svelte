<script lang="ts">
	import NotSignedIn from '$lib/components/NotSignedIn.svelte';
	import SignedIn from '$lib/components/SignedIn.svelte';
	import Value from '$lib/components/Value.svelte';
</script>

<div>+page.svelte</div>
<h1>Home page</h1>
<SignedIn let:user let:signOut let:auth>
	You are signed in with {user.uid}
	<button on:click={signOut}>Sign Out</button>
	{auth.currentUser?.phoneNumber}
</SignedIn>

<NotSignedIn>
	<a href="/user/sign-in">SignIn</a>
</NotSignedIn>

<p>
	<Value
		path="post-all-summaries/-NvgtY78Qcowz-zwjRnN"
		hydrate={{ title: 'THIS IS TITLE P' }}
		let:value
	>
		{#each Object.keys(value) as key}
			{key}: {value[key]} &nbsp;
		{/each}
	</Value>
</p>

<Value
	path="post-all-summaries/-NvgtY78Qcowz-zwjRnN"
	hydrate={{ title: 'THIS IS TITLE' }}
	let:value
>
	{#each Object.keys(value) as key}
		{key}: {value[key]} &nbsp;
	{/each}
</Value>

{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] as i}
	<h1 style="padding: 3em;">{i}</h1>
{/each}
