<script lang="ts">
	import { getAuth } from 'firebase/auth';
	import NotSignedIn from '../NotSignedIn.svelte';
	import SignedIn from '../SignedIn.svelte';
	import ValueList from '../ValueList.svelte';

	const auth = getAuth();
</script>

<NotSignedIn>Not Signed In</NotSignedIn>

<SignedIn let:user>
	Signed In with {user.uid}
	<div>
		<ValueList path="chat-joins/{user.uid}" let:data>
			{#each data as item}
				<a href="/chat-room?id={item.nodeKey}"
					><button>
						{#each Object.keys(item) as key}
							{key}: {item[key]}
						{/each}
					</button></a
				>
				<br />
			{/each}
		</ValueList>
	</div>
</SignedIn>
