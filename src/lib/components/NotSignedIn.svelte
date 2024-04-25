<script lang="ts">
	import { loggedIn } from '$lib/store/user.store.js';

	import { getAuth, type Auth } from 'firebase/auth';
</script>

{#if $loggedIn == false}
	<div>
		<slot auth={getAuth()} />
	</div>
{/if}
