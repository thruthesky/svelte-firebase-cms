<script lang="ts">
	import { page } from '$app/stores';
	import { SvelteFirebaseCms } from '$lib/svelte-firebase-cms.js';
	import { getApp } from 'firebase/app';
	import { initializeFirebaseClient } from '../init.firebase.client.js';

	export let data: any;
	const app = initializeFirebaseClient(data.firebaseClientConfig);
	SvelteFirebaseCms.init({ app: getApp() });
</script>

<div class="app-container">
	<section class="app-header">
		<div style="display: flex;">
			<h1>App Header</h1>
			<a href="/">Home</a> |
			<a href="/user/sign-in">Sign In</a> |
			<a href="/forum">Forum</a> (<a href="/forum/discussion">Disucssion</a>
			<a href="/forum/qna">QnA</a>) |
			<a href="/user/profile">Profile</a>|
			<a href="/user/list">User List</a>
		</div>
	</section>

	<div class="app-content layout-width" style="display: flex;">
		<aside class="sidebar-left">
			<h2>App Sidebar</h2>
			<a href="/forum">Forum</a>

			<hr />
		</aside>
		<main>
			<slot />
		</main>
		<aside class="sidebar-right">
			<h2>App Sidebar</h2>
			<a href="/forum">Forum</a>

			<hr />
		</aside>
	</div>

	<section class="app-footer">
		<h2>App Footer</h2>
		<a href="/">Home</a>
		<a href="/forum">Forum</a>

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

	@media (max-width: 768px) {
		.sidebar-left {
			display: none;
		}

		.sidebar-right {
			display: none;
		}
	}
</style>
