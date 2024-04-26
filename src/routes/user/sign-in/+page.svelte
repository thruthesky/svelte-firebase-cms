<script lang="ts">
	import { RecaptchaVerifier, getAuth, signInWithPhoneNumber } from 'firebase/auth';
	import { onMount } from 'svelte';

	let phoneNumber: string = '+11111111111';

	onMount(() => {
		const auth = getAuth();
		// auth.languageCode = 'ko';
		auth.useDeviceLanguage();

		let recaptchaVerifier: RecaptchaVerifier;
		let recaptchaWidgetId: number;

		recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
			size: 'invisible',
			callback: (response: any) => {
				console.log(response);
				// reCAPTCHA solved, allow signInWithPhoneNumber.
				signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
					.then((confirmationResult) => {
						// By here, phone number has verified and SMS code sent to the phone number.
						// Prompt user to type the code from the message, then sign the
						// user in with confirmationResult.confirm(code).
						const code = window.prompt('Enter the code sent to your phone:');
						console.log(code);
						confirmationResult
							.confirm(code as string)
							.then((result) => {
								// User signed in successfully.
								const user = result.user;
								alert('Login success');
								// ...
							})
							.catch((error) => {
								// User couldn't sign in (bad verification code?)
								// ...
								console.error(error);
								alert("User couldn't sign in (bad verification code?)");
							});

						// ...
					})
					.catch((error) => {
						// Error; SMS not sent
						// ...
					});
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
</script>

Signin

<input bind:value={phoneNumber} />
<button id="sign-in-button">Verify Phone Number</button>
