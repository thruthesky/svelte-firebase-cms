import { writable } from "svelte/store";
import { onValue, ref as dbRef } from "firebase/database";
import type { Database } from "firebase/database";

/**
 * @param {Database} rtdb - Firebase Realtime Database instance.
 * @param {string} path - Path to the individual database node.
 * @param {T | undefined} hydrate - Optional default data.
 * @returns a store with realtime updates on individual database nodes.
 */
export default function valueStore<T = any>(
    rtdb: Database,
    path: string,
    hydrate?: T
): T {
    const dataRef = dbRef(rtdb, path);

    const { subscribe } = writable<T | null>(hydrate, (set) => {
        const unsubscribe = onValue(dataRef, (snapshot) => {
            set(snapshot.val() as T);
        });
        return unsubscribe;
    });

    return {
        subscribe,
        ref: dataRef,
    } as T;
}



