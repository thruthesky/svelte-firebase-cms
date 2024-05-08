<script lang="ts">
	import { getAuth, type Auth } from 'firebase/auth';
	import { loggedIn } from '../store/user.store';
</script>

{#if $loggedIn == false}
	<div>
		<slot auth={getAuth()} />
	</div>
{/if}
