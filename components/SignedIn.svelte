<script lang="ts">
	import { getAuth, type User } from 'firebase/auth';
	import { loggedIn } from '../store/user.store';

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
