<script>
	import { page } from '$app/stores';
	$: chatRoomId = $page.data;
	console.log('chat room ID: ', chatRoomId);
</script>

<p>Chat Room ID: {chatRoomId}</p>
