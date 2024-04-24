<script lang="ts">
	import { userStore } from '$lib/sveltefire/store/user.store.svelte';
	import { getAuth, type Auth, type User } from 'firebase/auth';
	const user = userStore();

	interface $$Slots {
		default: { user: User; auth: Auth; signOut: () => Promise<void> };
	}

	const auth = getAuth();
</script>

{#if user.loggedIn}
	<div>
		<slot user={auth.currentUser!} {auth} signOut={() => auth.signOut()} />
	</div>
{/if}
