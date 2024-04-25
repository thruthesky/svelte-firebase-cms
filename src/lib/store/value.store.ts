import { writable } from "svelte/store";
import { onValue, ref as dbRef, query, orderByChild, startAfter, limitToFirst } from "firebase/database";
import type { Database, DatabaseReference, Query } from "firebase/database";

/**
 * @param {Database} rtdb - Firebase Realtime Database instance.
 * @param {string} path - Path to the individual database node.
 * @param {T | undefined} hydrate - Optional default data.
 * @returns a store with realtime updates on individual database nodes.
 */
export function valueStore<T = any>(
    rtdb: Database,
    path: string,
    hydrate?: T
) {
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
    };
}





/**
 * @param {Database} rtdb - Firebase Realtime Database instance.
 * @param {string} path - Path to the list of nodes.
 * @param {T[]} hydrate - Optional default data.
 * @returns a store with realtime updates on lists of nodes.
 */
export function valueListStore<T = any>(
    rtdb: Database,
    path: string,
    hydrate: T[] = [],
    limit: number = 5,
    orderBy: string = 'order',
) {
    const listRef: DatabaseReference = dbRef(rtdb, path);





    let q: Query = query(
        listRef,
        orderByChild(orderBy),
    );

    if (hydrate.length > 0) q = query(q, startAfter((hydrate[hydrate.length - 1] as any)[orderBy]));

    q = query(q, limitToFirst(limit));


    const { subscribe } = writable<T[]>(hydrate, (set) => {
        const unsubscribe = onValue(q, (snapshot) => {
            const dataArr: T[] = [];
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
                dataArr.push({
                    nodeKey: childSnapshot.ref.key,
                    ...(typeof childData === "object" ? childData : {}),
                } as T);
            });
            set(dataArr);
        });

        return unsubscribe;
    });

    return {
        subscribe,
        ref: listRef,
    };
}
