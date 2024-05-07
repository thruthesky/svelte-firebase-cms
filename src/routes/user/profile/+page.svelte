<script lang="ts">
	import { type UserInterface } from '$lib/functions/user.functions.js';

	import Profile from '$lib/components/user/Profile.svelte';

	let profile:any;
let formData: UserInterface = {
	displayName: '',
    stateMessage: '',
    photoUrl: '',
};

</script>

<Profile bind:this={profile} bind:formData={formData} >
<div  slot="imageUrl" let:value>
	<img  src={value} alt=""  width="200">
</div>
<div slot="profile">
	<input type="file" accept="image/png, image/jpeg, image/jpg" on:change={profile.onChangeFile} />
	<form on:submit|preventDefault={profile.onSubmit}>
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
</div>
</Profile>
