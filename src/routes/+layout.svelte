<script lang="ts">
	import { page } from '$app/stores';
	import { SvelteFirebaseCms } from '$lib/svelte-firebase-cms.js';

	export let data: any;
	SvelteFirebaseCms.init({ firebaseClientConfig: data.firebaseClientConfig });
</script>

<div class="app-container" class:is-chat-room={$page.url.pathname === '/chat-room'}>
	<section class="app-header">
		<div style="display: flex;">
			<h1>App Header</h1>
			<a href="/">Home</a> |
			<a href="/forum">Forum</a> |
			<a href="/chat-room-list">Chat Room List</a> |
			<a href="/chat-room">Chat Room</a>
		</div>
	</section>

	<div class="app-content layout-width" style="display: flex;">
		<aside class="sidebar-left">
			<h2>App Sidebar</h2>
			<a href="/forum">Forum</a>
			<a href="/chat-room-list">Chat Room List</a>
			<a href="/chat-room">Chat Room</a>
			<hr />
		</aside>
		<main>
			<slot />
		</main>
		<aside class="sidebar-right">
			<h2>App Sidebar</h2>
			<a href="/forum">Forum</a>
			<a href="/chat-room-list">Chat Room List</a>
			<a href="/chat-room">Chat Room</a>
			<hr />
		</aside>
	</div>

	<section class="app-footer">
		<h2>App Footer</h2>
		<a href="/">Home</a>
		<a href="/forum">Forum</a>
		<a href="/chat-room-list">Chat Room List</a>
		<a href="/chat-room">Chat Room</a>
		<hr />
	</section>
</div>

<style>
	:root {
		--layout-width: 1200px;
		--left-sidebar-width: 300px;
		--right-sidebar-width: 300px;
		--header-height: 60px;
		--gap: 1rem;

		--theme-rounded-base: 8px;
	}

	.app-header {
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
		right: 0;
		height: var(--header-height);
		overflow: hidden;
		background-color: rgb(231, 242, 255);
	}

	.app-content {
		margin-top: var(--header-height);
	}

	.layout-width {
		margin-left: auto;
		margin-right: auto;
		width: 100%;
		max-width: var(--layout-width);
	}

	.sidebar-left {
		width: var(--left-sidebar-width);
		margin-top: var(--gap);
		background-color: burlywood;
	}

	.sidebar-right {
		width: var(--right-sidebar-width);
		margin-top: var(--gap);
		background-color: rgb(181, 204, 212);
	}

	main {
		display: flex;
		flex: 1;
		flex-direction: column;
		margin: var(--gap) 0 0 0;
		padding: var(--gap);
		overflow-y: hidden;
		background-color: rgb(228, 251, 236);
	}

	.is-chat-room .app-header {
		display: none;
	}
	.is-chat-room .app-footer {
		display: none;
	}
	.is-chat-room .app-content {
		margin-top: 0;
	}

	.is-chat-room main {
		padding: 0;
	}
	.is-chat-room .sidebar-left {
		display: none;
	}
	.is-chat-room .sidebar-right {
		display: none;
	}

	@media (max-width: 768px) {
		.sidebar-left {
			display: none;
		}

		.sidebar-right {
			display: none;
		}
	}
</style>
