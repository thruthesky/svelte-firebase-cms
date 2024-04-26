<script>
	import { page } from '$app/stores';
	import ChatRoomMessages from '$lib/components/chat/ChatRoomMessages.svelte';
	$: chatRoomId = $page.url.searchParams.get('id') ?? '';
	console.log('chat room ID: ', chatRoomId);
</script>

<section class="chat-room">
	<header class="chat-room-header">Chat Room Header | <a href="/">[ HOME ]</a> ... [ MENU ]</header>

	<!-- <div class="chat-room-messages">
		{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] as i}
			<h1 style="padding: 3em;">{i}</h1>
		{/each}
	</div> -->
	<ChatRoomMessages {chatRoomId} let:messageData>
		<div>
			<p>{messageData}</p>
		</div>
		<p slot="loading">Loading data...</p>
	</ChatRoomMessages>

	<nav class="chat-room-footer">
		<input style="width: 100%;" />
		<button>Send</button>
	</nav>
</section>

<style>
	.chat-room {
		display: flex;
		flex-direction: column;
		background-color: beige;
		height: 100vh;
	}

	.chat-room-header {
		background-color: lightblue;
		padding: 1em;
	}

	/* .chat-room-messages {
		flex: 1;
		overflow-y: auto;
	} */

	.chat-room-footer {
		display: flex;
		padding: 1em;
		background-color: lightblue;
	}
</style>
