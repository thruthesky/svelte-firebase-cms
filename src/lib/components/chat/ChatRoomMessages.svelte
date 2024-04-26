<script lang="ts">
	import { onMount, tick } from 'svelte';
	import InfiniteScroll from './InfiniteScroll.svelte';
	export let chatRoomId: string;

	let _messages: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
	let _nextNumber = 21;
	// For testing only
	async function loadMore() {
		// For testing only
		const additionalMessages = [
			_nextNumber++,
			_nextNumber++,
			_nextNumber++,
			_nextNumber++,
			_nextNumber++,
			_nextNumber++,
			_nextNumber++,
			_nextNumber++,
			_nextNumber++,
			_nextNumber++,
			_nextNumber++
		];

		// save the curent scroll position
		const _currentScrollHeight = messagesContainer.scrollHeight;

		// This will not move the scroll but scroll height
		_messages.unshift(...additionalMessages);
		_messages = _messages;

		// Wait for the next render cycle
		await tick();

		// Must maintain the height
		const _updatedScrollHeight = messagesContainer.scrollHeight;
		const _scrollHeightDelta = _updatedScrollHeight - _currentScrollHeight;

		// Set the scroll Top to position it to stay the position
		messagesContainer.scrollTop = messagesContainer.scrollTop + _scrollHeightDelta;

		console.log('_currentScrollHeight: ' + _currentScrollHeight);
		console.log('_updatedScrollHeight: ' + _updatedScrollHeight);
	}

	let messagesContainer: HTMLElement;

	onMount(() => {
		console.log('Just Mounted. Scrolling at bottomost');
		// TODO: The possible problem here is when the chat messages are delayed.
		messagesContainer.scrollTop = messagesContainer.scrollHeight;
	});

	/**
	 * For testing purposes only
	 */
	function testNewMessage() {
		_messages = [..._messages, 'New Message' + _nextNumber++];
		console.log('New message received');

		onNewMessage();
	}

	async function onNewMessage() {
		// Wait for the next render cycle
		await tick();
		const threshold = 100;
		const bottom =
			messagesContainer.scrollHeight - messagesContainer.clientHeight - messagesContainer.scrollTop;
		// Only move the scroll down if the user is at bottom
		if (bottom <= threshold) {
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
		}
	}
</script>

<p>
	Chat Room ID: {chatRoomId}
</p>
<div id="chat-room-messages" bind:this={messagesContainer}>
	{#if _messages}
		<div style="height:100%;"></div>
		<!-- TODO revise if we need it because this might be different case if we got the array in JSON  -->
		{#each _messages as k}
			<slot messageData={k} />
		{/each}
	{:else}
		<!-- Display this slot when data is loading -->
		<slot name="loading" />
	{/if}
	<InfiniteScroll on:topReach={loadMore} />
</div>

<!-- For testing purposes only -->
<div style="position: absolute; ">
	<button on:click={testNewMessage}>New Message</button>
</div>

<style>
	#chat-room-messages {
		/* TODO the flex here should be easily modified */
		display: flex;
		flex: 1;
		flex-flow: column;
		overflow-y: auto;
	}
</style>
