<script lang="ts">
	import { loggedIn } from '$lib/store/user.store.svelte';
	import { getAuth, type Auth } from 'firebase/auth';

	interface $$Slots {
		default: { auth: Auth };
	}
</script>

{#if $loggedIn == false}
	<div>
		<slot auth={getAuth()} />
	</div>
{/if}
