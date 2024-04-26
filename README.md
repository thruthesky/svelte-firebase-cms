# SvelteFire

Svelte library for FireFlutter



## Initialization

The recommended way of intialization is that put the code `SvelteFire.init()` inside `src/routes/+layout.svelte`.

```ts
import { app } from '$lib/client/init.firebase.client';
import { SvelteFire } from '$lib/sveltefire/svelte-fire';
SvelteFire.init({ app });
```


Below is the `src/lib/client/init.firebase.client`.

```ts
import { initializeApp } from "firebase/app";
const firebaseConfig: { [key: string]: string; } = {
    apiKey: "AI....fU",
    authDomain: "silbus.firebaseapp.com",
    databaseURL: "https://silb.....st1.firebasedatabase.app",
    projectId: "silbus",
    storageBucket: "silbus.appspot.com",
    messagingSenderId: "575893880018",
    appId: "1:575.....fc10b",
    measurementId: "G-3KQTNK89WP"
};
export const app = initializeApp(firebaseConfig);
```


## Login

To use sveltefire, the user must login.
SvelteFire does not provide any login mechanism. It's up to you how you desgin your app. You may use email/password login or Phone sign-in, Google sign-in, etc.




## Common Patterns

### Fetch Data from Firestore for Authenticated Users

First, Use the `SignedIn` component to access the UID of the current user. Second, pass that UID to the `Doc` or `Collection` component to fetch a Firestore document owned by that user. 

```svelte
  <SignedIn let:user>
    <Doc ref={`users/${user.uid}`} let:data={user}>
        <h2>{user.displayName}</h2>
    </Doc>
  </SignedIn>
```


### Hydrate data from server side

The component `Doc`, `Collection`, `Value`, `ValueList` hydrates the SSR data.

Use the hydration data from svelte kit into the components of `Value`, `ValueList`, `Doc`, `Collection`. The HTML source code will have the data of the hydration.





## NotSignedIn

```svelte
<NotSignedIn>
	<a href="/user/sign-in">SignIn</a>
</NotSignedIn>
```


## SignedIn

The `SignedIn` component renders content for the current user. It is a wrapper around the `userStore`. If the user is not signed in, the children will not be rendered. 

### Slot Props

- `user` - The current Firebase user
- `auth` - The current Firebase auth instance
- `signOut` - A function to sign out the current user




```svelte
<SignedIn let:user let:signOut let:auth>
	You are signed in with {user.uid}
	<button on:click={signOut}>Sign Out</button>
	{auth.currentUser?.email}
</SignedIn>

```


## Value

Get a value of node and display

```svelte
<Value path="post-all-summaries/-NvgtY78Qcowz-zwjRnN" hydrate={{ title: 'THIS IS TITLE' }} let:data>
	{#each Object.keys(data) as key}
		{key}: {data[key]}
	{/each}
</Value>
```

## ValueList

Display a list of value node

```svelte
<ValueList path="post-all-summaries" let:data>
	{#each data as item}
		<p>
			{#each Object.keys(item) as key}
				{key}: {item[key]}
			{/each}
		</p>
	{/each}
</ValueList>
```


## Doc

Display a document.

## Collection

Display lists of documents in that collection

- `infiniteScroll` is an option to scroll infinitely.




## Upload

display a UI for file upload into storage

## MyValue

## UserDoc




## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Everything inside `src/lib` is part of your library, everything inside `src/routes` can be used as a showcase or preview app.

## Building

To build your library:

```bash
npm run package
```

To create a production version of your showcase app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Publishing

Go into the `package.json` and give your package the desired name through the `"name"` option. Also consider adding a `"license"` field and point it to a `LICENSE` file which you can create from a template (one popular option is the [MIT license](https://opensource.org/license/mit/)).

To publish your library to [npm](https://www.npmjs.com):

```bash
npm publish
```



## Forum List

- The `InfiniteValueList` component will not be `destroyed` and `mounted` if it is used in same page with different path. So, observe the chagnes of path and reset it.


```svelte
<script lang="ts">
	import { page } from '$app/stores';
	import InfiniteValueList from '$lib/components/InfiniteValueList.svelte';
	import { onMount } from 'svelte';

	export let data;

	let controller: InfiniteValueList;
	let unsubscribe: () => void;

	onMount(() => {
		/// When categry changes, reset the store and fetch new data
		unsubscribe = page.subscribe(() => {
			controller?.onReset();
		});
	});

	onDestroy(() => {
		unsubscribe?.();
	});
</script>

<InfiniteValueList
	path={'posts-summary/' + data.category}
	hydrate={data.posts}
	let:value
	bind:this={controller}
>
	<p style="padding: 2em;">
		<a href="/forum/{data.category}/{value.key}">{value.title}</a>
		<span style="display: block;"></span>{value.key}
		<span style="display: block; margin-top:1em"
			>{new Date(value['createdAt']).toLocaleString()}</span
		>
	</p>

	<p slot="noMoreData" let:length>
		# No of post loaded: #{length}
		<br />
		No more posts
	</p>
	<p slot="loading">Loading data...</p>
</InfiniteValueList>
```
