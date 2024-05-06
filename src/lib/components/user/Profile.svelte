<script lang="ts">
	import SignedIn from '$lib/components/SignedIn.svelte';
	import { uploadPhoto } from '$lib/functions/storage.function.js';
	import { userGet, userUpdate, type UserInterface } from '$lib/functions/user.functions.js';
	import { getAuth } from 'firebase/auth';
	import { onMount } from 'svelte';
	import Value from '../Value.svelte';
	export let formData: UserInterface = {};

	onMount(async () => {
		getAuth().onAuthStateChanged(async (user) => {
			if (user) {
				formData = await userGet(user.uid);
			}
		});
	});
 export function onChangeFile(event: any) {
console.log('change file')
		uploadPhoto(event, formData.uid, {
			deleteUrl: formData.photoUrl,
			callback: (url) => {
				userUpdate({
					photoUrl: url
				});
			}
		});
	}
export function onSubmit() {
		console.log('submit');
		userUpdate({
			displayName: formData.displayName,
			stateMessage: formData.stateMessage
		});
	}
</script>

<h1>Profile</h1>

<SignedIn let:user>
	<Value path='/users/{user.uid}/photoUrl' let:value hydrate={formData.photoUrl}>
		<slot name="imageUrl" value={value}>
			<img src={value}  alt=""/>
		</slot>

	</Value>
	<slot name="profile">
	
		<input type="file" accept="image/png, image/jpeg, image/jpg" on:change={onChangeFile} />
		<form on:submit|preventDefault={onSubmit}>
			<p>
				<label for="displayName">Display Name</label>
				<input name="displayName" type="text" bind:value={formData.displayName} />
			</p>
			<p>
				<label for="stateMessage">State message</label>
				<input type="text" bind:value={formData.stateMessage} />
			</p>
			<button> Save </button>
		</form>
	</slot>
</SignedIn>
