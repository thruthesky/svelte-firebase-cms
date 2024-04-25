<script lang="ts">
	import { loggedIn } from '$lib/store/user.store.js';
	import { getAuth, type Auth, type User } from 'firebase/auth';

	const auth = getAuth();

	/**
	 * Returns the current user.
	 *
	 * @why - Nullable user object is needed.
	 */
	function getUser(): User {
		return auth.currentUser as User;
	}
</script>

{#if $loggedIn == true}
	<slot user={getUser()} {auth} signOut={() => auth.signOut()} />
{/if}
