<script lang="ts">
	import { loggedIn } from '$lib/store/user.store.svelte';
	import { getAuth, type Auth, type User } from 'firebase/auth';

	interface $$Slots {
		default: { user: User; auth: Auth; signOut: () => Promise<void> };
	}

	const auth = getAuth();

	function getUser(): User {
		return auth.currentUser as User;
	}
</script>

{#if $loggedIn == true}
	<slot user={getUser()} {auth} signOut={() => auth.signOut()} />
{/if}
