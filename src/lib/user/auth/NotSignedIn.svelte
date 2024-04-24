<script lang="ts">
	import { userStore } from '$lib/sveltefire/store/user.store.svelte';
	import { getAuth, type Auth } from 'firebase/auth';
	const user = userStore();

	interface $$Slots {
		default: { auth: Auth };
	}
</script>

{#if user.loggedIn == false}
	<div>
		<slot auth={getAuth()} />
	</div>
{/if}
