<script lang="ts">
	import { SvelteFirebaseCms } from '$lib/svelte-firebase-cms.js';

	export let data: any;
	SvelteFirebaseCms.init({ firebaseClientConfig: data.firebaseClientConfig });
</script>

<h1>+layout.svelte</h1>
<a href="/">Home</a> |
<a href="/forum">Forum</a>
<a href="/">Home</a>
<a href="/chat-room-list">Chat Room List</a>
<a href="/chat-room">Chat Room</a>
<hr />
<slot />
