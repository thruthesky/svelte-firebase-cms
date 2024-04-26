<script lang="ts">
	import { goto } from '$app/navigation';
	import { RecaptchaVerifier, getAuth, signInWithPhoneNumber, type ConfirmationResult } from 'firebase/auth';
	import { onMount } from 'svelte';


    let phoneNumber : number;
    let smsCode : string;
    const auth = getAuth();
    auth.useDeviceLanguage();
    let recaptchaVerifier: RecaptchaVerifier;
    let recaptchaWidgetId: number;
    let globalConfirmationResult: ConfirmationResult;
    let isSmsSent : boolean = false;



	onMount(() => {
		// auth.languageCode = 'ko';
		recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
			size: 'invisible',
			callback: (response: any) => {
				console.log(response);
				// reCAPTCHA solved, allow signInWithPhoneNumber.

                
				//
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


    function onPhoneNumberSubmit(){
        signInWithPhoneNumber(auth, import.meta.env.MODE == "dev" ? '+1'+ phoneNumber : '+821011111111', recaptchaVerifier)
            .then((confirmationResult) => {
                // By here, phone number has verified and SMS code sent to the phone number.
                // Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                // const code = window.prompt('Enter the code sent to your phone:');
                globalConfirmationResult = confirmationResult;
                alert('sms code whas sent ')
                isSmsSent =  true;
                // ...
            })
            .catch((error) => {
                // Error; SMS not sent
                // ...
            }); 
    }

    function onSmsCodeSubmit(){
        globalConfirmationResult
			.confirm(smsCode)
			.then(async (result: any) => {
				// User signed in successfully.
            // const  user = await userGet(result.uid);
            alert('login successful' + result.user.uid);
            goto('/')
            
			})
			.catch((error: any) => {

				// User couldn't sign in (bad verification code?)
				// ...
				alert(
					'Invalid SMS Code. Please check your input SMS code if its correct or if you put the correct phone number'
				);
				smsCode = '';
			});
    }



</script>





{#if isSmsSent == false}
<input bind:value={phoneNumber} />

<button on:click={onPhoneNumberSubmit}>Verify Phone Number</button>
{:else if isSmsSent == true}
<input bind:value={smsCode} />
<button on:click={onSmsCodeSubmit}>Verify SMS Code</button>
{/if}



<div id="sign-in-button"></div>