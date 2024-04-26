<script lang="ts">
	import SignedIn from '$lib/components/SignedIn.svelte';
	import { userGet, userUpdate, type UserInterface } from '$lib/functions/user.functions.js';
	import { getAuth } from 'firebase/auth';
	import { onMount } from 'svelte';

	let formData: UserInterface = {};

	onMount(async () => {
		console.log('Profile page mounted');
		getAuth().onAuthStateChanged(async (user) => {
			if (user) {
				formData = await userGet(user.uid);
			}
		});
	});

	function onSubmit() {
		console.log('submit');
		userUpdate({
			displayName: formData.displayName,
			stateMessage: formData.stateMessage
		});
	}
</script>

<h1>Profile</h1>

<SignedIn let:user>
	{user.uid}

	<form on:submit|preventDefault={onSubmit}>
		<p>
			<label for="displayName">Display Name</label>
			<input id="displayName" type="text" bind:value={formData.displayName} />
		</p>

		<p>
			<label for="stateMessage">State message</label>
			<input id="stateMessage" type="text" bind:value={formData.stateMessage} />
		</p>

		<button> Save </button>
	</form>
</SignedIn>
