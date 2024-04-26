

<script lang="ts">
	import MyDoc from '$lib/components/MyDoc.svelte';


   

</script>
<MyDoc let:my >
<div>
    <img src={my['photoUrl']} width="200" alt=""/>
</div>
 <p>  {my['uid']}</p>
 <p>
    {my['displayName']}
 </p>
    <br />
    <div slot="notSignIn">You need to sign in first <a href="/user/sign-in">Sign In</a></div>
</MyDoc>