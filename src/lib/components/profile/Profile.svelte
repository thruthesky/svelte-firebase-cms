<script lang="ts">
	import SignedIn from '$lib/components/SignedIn.svelte';
	import { uploadPhoto } from '$lib/functions/storage.function.js';
	import { userGet, userUpdate, type UserInterface } from '$lib/functions/user.functions.js';
	import { getAuth } from 'firebase/auth';
	import { update } from 'firebase/database';
	import { onMount } from 'svelte';
	import Value from '../Value.svelte';

	export let formData: UserInterface = {};

	onMount(async () => {
		console.log('Profile page mounted');
		getAuth().onAuthStateChanged(async (user) => {
			if (user) {
				formData = await userGet(user.uid);
			}
		});
	});

		function onChangeFile(event: any){
		uploadPhoto(event, formData.uid,{
		deleteUrl: formData.photoUrl,
		callback: (url)=> {
			userUpdate(
				{
					photoUrl: url
				}
			)
		},
		})

		}

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

	<slot></slot>
	<slot name="profile" value={formData} onSubmit={onSubmit} formData={formData}>
		<Value path='/users/{formData.uid}/photoUrl' let:value hydrate={formData.photoUrl}>
			<img src={value}  alt=""/>
		</Value>

		<input type="file" accept="image/png, image/jpeg, image/jpg" on:change={onChangeFile} >

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

