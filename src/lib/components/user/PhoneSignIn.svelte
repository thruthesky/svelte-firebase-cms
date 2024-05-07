<script lang="ts">
	import { goto } from '$app/navigation';
	import { userGet, userUpdate } from '$lib/functions/user.functions.js';
	import { RecaptchaVerifier, getAuth, signInWithPhoneNumber, type ConfirmationResult } from 'firebase/auth';
	import { serverTimestamp } from 'firebase/database';
	import { onMount } from 'svelte';


	export let redirectPath: string = '/';


    let inputPhoneNumber : string;
    let inputSmsCode : string;
    const auth = getAuth();
    auth.useDeviceLanguage();
    let recaptchaVerifier: RecaptchaVerifier;
    let recaptchaWidgetId: number;
    let globalConfirmationResult: ConfirmationResult;
    let isSmsSent : boolean = false;
	let errorMessage: string ='';
	let successMessage: string = '';

	onMount(() => {
		// auth.languageCode = 'ko';
		recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
			size: 'invisible',
			callback: (response: any) => {
				console.log(response);
				// reCAPTCHA solved, allow signInWithPhoneNumber.
			},
			'expired-callback': () => {
				// Response expired. Ask user to solve reCAPTCHA again.
				alert('Response expired. Ask user to solve reCAPTCHA again.');
			}
		});
		(recaptchaVerifier as RecaptchaVerifier).render().then((widgetId) => {
			recaptchaWidgetId = widgetId;
		});
	});


	// get the phone number from the input field and trim it making sure that the user input is valid 
	// user might enter some spaces and other character like dashes and underscores
	export function  getPhoneNumber(number:string) {
		if(number == undefined || number == '') return '';
		number = number.replace(/[\s\-\(\)]/g, '');
		// if the number is Philippines phone number 
		number = number.replace(/^09/, '+639');
		// if the number is Korea phone number
		number = number.replace(/^01/, '+821');
		// if test number like 1111111111
		if(number.length == 10){
			number =  '+1' + number;
		}
		if (number.length === 13 || number.length === 12 || number[0] === '+' ){
			return number;
		}else if (number.length > 13){
			return 'long'
		}else if (number.length < 12){
			return 'short';
		}else{
			return 'invalid';
		}
	}

	// by exporting this function will allow the parent components to use this component 
   export function onPhoneNumberSubmit(inputPhoneNumber: string){
	errorMessage =''
		const phoneNumber = getPhoneNumber(inputPhoneNumber);
		if (phoneNumber == '') {
			errorMessage =  'Please enter a valid phone number. The phone number field cannot be empty. Please provide your phone number to proceed.'
			return;
		}else if (phoneNumber == 'long'){
		errorMessage = 'Invalid phone number, Phone number is too long'
		return;
		} 
		else if(phoneNumber == 'short'){
			errorMessage = 'Invalid phone number, Phone number is too short' 
			return;
		}
		else if(phoneNumber == 'invalid') {
			errorMessage = 'Invalid phone number, Please enter a valid phone number' 
			return;
		}

        signInWithPhoneNumber(auth, import.meta.env.MODE == "dev" ?  phoneNumber : '+821011111111', recaptchaVerifier)
            .then((confirmationResult) => {
                // By here, phone number has verified and SMS code sent to the phone number.
                // Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                // const code = window.prompt('Enter the code sent to your phone:');
                globalConfirmationResult = confirmationResult;

				errorMessage = '';
                successMessage = 'SMS Code sent successfully';
                isSmsSent =  true;
                // ...
            })
            .catch((error) => {
                // Error; SMS not sent
                // ...
				errorMessage = 'Invalid phone number, Please enter a valid phone number';
				console.log(error)
            }); 
    }


	// get the sms code from the input field and trim it making sure that the user input is valid sms code
	function getSmsCode(code : string){
		if(code == undefined) return '';
		code = code.replace(/\D/g, '');
		if (code.length == 6) {
			return code;
		}
		return '';
	}
	
	// sms code verification 
    export function onSmsCodeSubmit(inputSmsCode: string){
		successMessage  = ''
		const smsCode = getSmsCode(inputSmsCode)
		if(smsCode  == '') {
			errorMessage =  "SMS Code cannot be empty"
			return ;
		}
        globalConfirmationResult
			.confirm(smsCode)
			.then(async (result: any) => {
				// User signed in successfully.
				successMessage = 'Login successfully';
				alert(successMessage + " "+result.user.uid);

				const user = await userGet(result.user.uid);
				if(user.createdAt !=  null && user.createdAt != undefined){
					userUpdate({
						lastLogin : serverTimestamp(),
					});

				}else{
					userUpdate({
						lastLogin : serverTimestamp(),
						createdAt : serverTimestamp(),
					});


				}
				goto(redirectPath);
				})
			.catch((error: any ) => {
				// User couldn't sign in (bad verification code?)
				// ...
				successMessage = '';
				errorMessage = 'Invalid SMS Code. Please check your input SMS code if its correct or if you put the correct phone number' 
				// alert(
				// 	errorMessage
				// );
				inputSmsCode = '';
			});
    }

	// retry phone number function
    export function retryPhoneNumber(){
        isSmsSent = false;
        errorMessage = '';
        successMessage = '';
        inputSmsCode = '';
    }
</script>
{#if successMessage != ''}
	<slot name="successMessage" successMessage={successMessage}>
		<p style="color: green">{successMessage}</p>
	</slot>
{/if}
{#if errorMessage != ''}
	<slot name="errorMessage" errorMessage={errorMessage}>
		<p style="color: red">{errorMessage}</p>
	</slot>
{/if}
{#if isSmsSent == false}
<slot name="phoneNumberSlot">
	<p>Enter phone number </p>
	<input type="text" bind:value={inputPhoneNumber} />
	<br>
	<button on:click={()=>onPhoneNumberSubmit(inputPhoneNumber)}>Verify Phone Number</button>
</slot>
	
{:else if isSmsSent == true}
<slot name="smsCodeSlot">
	{getPhoneNumber(inputPhoneNumber)}
	<input type="text" bind:value={inputSmsCode} />
	<br>
	<button on:click={()=> onSmsCodeSubmit(inputSmsCode)}>Verify SMS Code</button>
	<br>
	<button on:click={()=> retryPhoneNumber}>Retry Phone Number</button>
</slot>
{/if}

<div id="sign-in-button"></div>