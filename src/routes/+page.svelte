<script>
	import NotSignedIn from '$lib/components/NotSignedIn.svelte';
	import SignedIn from '$lib/components/SignedIn.svelte';
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
