<script lang="ts">
	import { reset } from '$lib/store/infinite-value-list.store.js';
	import InfiniteValueList from '$lib/components/InfiniteValueList.svelte';
	import type { MapMap } from '$lib/interfaces.js';

const anonymousUrl =
    'https://raw.githubusercontent.com/thruthesky/fireship/main/assets/anonymous.jpg?raw=true&v=1';
	let searchUser: string = '';


 let  infiniteScroll: any;


 function onSearchUser(){

	infiniteScroll.onReset();

	
 }

 function onCancelSearch(){
	searchUser = '';
	infiniteScroll.onReset();
 }
</script>


<input type="text" bind:value={searchUser} />

<button on:click={onSearchUser}>Search</button>
<button on:click={onCancelSearch}>Cancel</button>
<InfiniteValueList path={'users'} let:value autoFetch={true} orderField='displayName' searchFilter={searchUser} bind:this={infiniteScroll}>
<p style="padding: 2em;">
	<img src={value.photoUrl == undefined ? anonymousUrl: value.photoUrl} alt="" srcset="" width="40" height="40">	{value.key}, {value.displayName}
	</p>
	<p slot="noMoreData" let:length>
		# No of post loaded: #{length}
		<br />
		No more posts
	</p>
	<p slot="loading">Loading data...</p>
</InfiniteValueList>
