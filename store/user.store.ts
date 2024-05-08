
import { writable, type Writable } from "svelte/store";


export const loggedIn: Writable<boolean> = writable(false);


export const setLogin = () => (loggedIn.set(true));
export const setLogout = () => (loggedIn.set(false));
