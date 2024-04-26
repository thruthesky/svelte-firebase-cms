

<script lang="ts">
	import NotSignedIn from './NotSignedIn.svelte';
	import Value from './Value.svelte';
	import SignedIn from './SignedIn.svelte';


</script>



<SignedIn let:user>
    <Value path="users/{user.uid}" hydrate={{}} let:data>
       <slot my={data}></slot>
    </Value>
</SignedIn>

<NotSignedIn>
  <slot name="notSignIn">Sign In First</slot>
</NotSignedIn>



