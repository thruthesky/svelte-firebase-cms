<script lang="ts">
	import { SvelteFirebaseCms } from '$lib/svelte-firebase-cms.js';
	import { initializeApp } from 'firebase/app';

	export let data: any;
	const app = initializeApp(data.firebaseOptions);
	SvelteFirebaseCms.init({ app: app });
</script>

<h1>+layout.svelte</h1>
<a href="/">Home</a> |
<a href="/forum">Forum</a>
<hr />
<slot />
