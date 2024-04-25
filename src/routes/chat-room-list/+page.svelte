<script lang="ts">
	import ChatRoomList from '$lib/components/chat/ChatRoomList.svelte';
	import { getAuth } from 'firebase/auth';

	const auth = getAuth();
</script>

<h1>Chat Room Test</h1>

<p>UID: {auth.currentUser?.uid}</p>

<ChatRoomList />
