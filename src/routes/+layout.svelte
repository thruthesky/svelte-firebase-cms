<script lang="ts">
	import { app } from '../init.firebase.client.js';
	import { SvelteFirebaseCms } from '$lib/svelte-firebase-cms.js';

	SvelteFirebaseCms.init({ app: app });
</script>

<h1>+layout.svelte</h1>
<a href="/">Home</a> |
<a href="/forum">Forum</a>
<hr />
<slot />
