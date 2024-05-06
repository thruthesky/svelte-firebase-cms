<script lang="ts">
	import PhoneSignIn from '$lib/components/user/PhoneSignIn.svelte';
	
	let inputPhoneNumber: string;
	let inputSmsCode: string;
	let phoneSignIn: any;

</script>

Signin
<!-- binding this components allow us to use the methods and properties inside the component -->
<PhoneSignIn bind:this={phoneSignIn} >
	<div slot="phoneNumberSlot">
	<p>Enter phone number </p>
	<input type="text" bind:value={inputPhoneNumber} />
	<br>
	<button on:click={()=> phoneSignIn.onPhoneNumberSubmit(inputPhoneNumber)}>Verify Phone Number</button>
	</div>
	<div slot="smsCodeSlot">
		this is custome
		{phoneSignIn.getPhoneNumber(inputPhoneNumber)}
		<input type="text" bind:value={inputSmsCode} />
		<br>
		<button on:click={()=> phoneSignIn.onSmsCodeSubmit(inputSmsCode)}>Verify SMS Code</button>
		<br>
		<button on:click={phoneSignIn.retryPhoneNumber }>Retry Phone Number</button>
	</div>
</PhoneSignIn>
