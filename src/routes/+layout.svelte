<script lang="ts">
	import { app } from '../init.firebase.client.js';
	import { SvelteFirebaseCms } from '$lib/svelte-firebase-cms.js';

	SvelteFirebaseCms.init({ app: app });
</script>

<slot />
