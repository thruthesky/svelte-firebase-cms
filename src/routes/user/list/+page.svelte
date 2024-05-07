<script lang="ts">
	import InfiniteValueList from '$lib/components/InfiniteValueList.svelte';

const anonymousUrl =
    'https://raw.githubusercontent.com/thruthesky/fireship/main/assets/anonymous.jpg?raw=true&v=1';
	let searchUser: string = '';
</script>


<input type="text" bind:value={searchUser} /> 
<InfiniteValueList path={'users'} let:value autoFetch={true} orderField='displayName'>
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
