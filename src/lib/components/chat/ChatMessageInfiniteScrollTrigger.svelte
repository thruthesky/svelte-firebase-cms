<!--
	@component
	InfiniteScroll trigger

	It needs to listened to element that has scroll event.
	
	To specify which element to listened,

	First you can provide the `elementId` as string e.g. `elementId='page'.

	Second you can set `usePageScroll` to true, then it will listend to element with `id='page'`. (Element must exist in the DOM)

	Third you can provide the `elementScroll` using `<div bind:this={component}>List</div>` then pass the component to elementScroll prop.

	If all above are not set, then by default it will listened to the parentNode.

	By default it will listen to parentNode ScrollEvent.

	If ElementScroll is provided it will listen from the elementScroll ScrollEvent.

	If userPageScroll is set to true, then it will look for the id with `page`.

	Usage:
	```tsx
	<InfiniteScroll
		{hasMore}
		usePageScroll={true}
		on:loadMore={() => {
			fetchData();
		}}
	></InfiniteScroll>
	```
-->

<script lang="ts">
	import { onDestroy, createEventDispatcher, onMount } from 'svelte';

	export let horizontal = false;
	export let hasMore = true;
	export let elementScroll: HTMLElement | null = null;
	export let usePageScroll: boolean = false;
	export let elementId: string | null = null;

	const dispatch = createEventDispatcher();
	let elementScrollListener: HTMLElement | null;
	let component: HTMLElement;

	const onScroll = (e: Event) => {
		const target = e.target as HTMLElement;

		const offset = horizontal
			? target.scrollWidth - target.clientWidth - target.scrollLeft
			: target.scrollHeight - target.clientHeight - target.scrollTop;

		console.log(offset);
		if (offset <= 0) {
			if (hasMore) {
				dispatch('loadMore');
			}
		}
	};

	onMount(() => {
		if (elementId) {
			elementScrollListener = document.getElementById(elementId);
		} else if (usePageScroll) {
			elementScrollListener = document.getElementById('page');
		} else if (elementScroll) {
			elementScrollListener = elementScroll;
		} else {
			elementScrollListener = component.parentNode as HTMLElement;
		}

		if (elementScrollListener) {
			elementScrollListener.addEventListener('scroll', onScroll);
		}
	});

	onDestroy(() => {
		if (elementScrollListener) {
			elementScrollListener.removeEventListener('scroll', onScroll);
		}
	});
</script>

<div bind:this={component} style="width:0px" />
