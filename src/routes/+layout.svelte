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
<a href="/">Home</a>
<a href="/chat-room-list">Chat Room List</a>
<a href="/chat-room">Chat Room</a>
<hr />
<slot />
