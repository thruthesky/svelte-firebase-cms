<script lang="ts">
	import { getAuth } from 'firebase/auth';
	import { getDatabase, ref, child, push, update, serverTimestamp } from 'firebase/database';
	import { goto } from '$app/navigation';

	let showCreateChatRoom = false;

	function show() {
		showCreateChatRoom = true;
	}

	// Chat room options
	let _open = false;
	let _name = '';
	let _description = '';
	const _isGroupChat = true;

	// TODO review
	const auth = getAuth();
	function getUserUid(): string {
		return auth.currentUser?.uid ?? '';
	}

	// TODO get users map

	// TODO put in the right place
	async function createRoom() {
		const db = getDatabase();
		// A chat room entry.
		const chatRoomData = {
			name: _name,
			//   if (iconUrl != null) Field.iconUrl: iconUrl,
			description: _description,
			createdAt: serverTimestamp(),
			//   Field.isVerifiedOnly: isVerifiedOnly,
			//   Field.urlVerifiedUserOnly: urlVerifiedUserOnly,
			//   Field.uploadVerifiedUserOnly: uploadVerifiedUserOnly,
			openGroupChatOrder: getMinusTime(),
			users: { [getUserUid()]: true },
			master: getUserUid()
		};
		// Get a key for a new Chat Room.
		const newChatRoomKey = push(child(ref(db), 'chat-rooms')).key;
		console.log('Created new chat room! Room ID: ' + newChatRoomKey);
		await update(ref(db, 'chat-rooms/' + newChatRoomKey), chatRoomData);
		goto('/chat-room?id=' + newChatRoomKey);
	}

	function getMinusTime() {
		const currentTimeEpoch = Math.floor(Date.now()); // Current time epoch in seconds
		return -1 * currentTimeEpoch;
	}
</script>

{#if showCreateChatRoom}
	<div>
		<label>
			Group Chat Name
			<input name="email" type="text" bind:value={_name} />
		</label>
		<br />
		<label>
			Description
			<input name="email" type="text" bind:value={_description} />
		</label>
		<br />
		<button on:click={createRoom}>Create</button>
	</div>
{:else}
	<button on:click={show}>Create Chat Room</button>
{/if}
