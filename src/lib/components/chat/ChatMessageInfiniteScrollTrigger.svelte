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

	export let hasMore = true;
	export let elementScroll: HTMLElement | null = null;
	export let usePageScroll: boolean = false;
	export let elementId: string | null = null;
	// TODO: Reminder the offset should not be bigger than the element's total scrollable Height or height.
	export let threshhold: number = 100;

	const dispatch = createEventDispatcher();
	let elementScrollListener: HTMLElement | null;
	let component: HTMLElement;

	const onScroll = (e: Event) => {
		const target = e.target as HTMLElement;

		// measurement of the distance from the element's bottom's visible top to its topmost visible content
		const bottom = target.scrollHeight - target.clientHeight - target.scrollTop;

		// measurement of the distance from the element's top to its topmost visible content
		const top = target.scrollTop;

		// Do something when the user scrolls to the top of the page
		if (top <= threshhold) {
			console.log('--> (hit) reached at top;', top);
			if (hasMore) dispatch('topReach');
		}

		// Load more data when the user scrolls to the bottom of the page
		// Retain this code until we finalize if we don't really need it. (helpful in debugging)
		if (bottom <= threshhold) {
			console.log('--> (hit) reached at bottom;', bottom);
			// fetch({ rtdb, path, limit: 5 });
			if (hasMore) dispatch('bottomReach');
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
