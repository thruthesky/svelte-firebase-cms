


<script lang="ts">
	import { type UserInterface } from '$lib/functions/user.functions.js';
	
	import Profile from "$lib/components/profile/Profile.svelte";


	let formData: UserInterface = {};






	function onNewSubmit(onSubmit: CallableFunction){

		onSubmit();
	}

	
</script>

<Profile formData={formData}>
	
</Profile>