import {
    get,
    query,
    orderByChild,
    limitToLast,
    endBefore,
    Database,
    ref as dbRef,
    type Query,
} from 'firebase/database';

import { writable } from "svelte/store";

export function forumListStore<T = any>(
    rtdb: Database,
    path: string,
    hydrate: T[] = [],
    orderBy: string,
    limit: number = 10,
    hasMore = true
) {

    const dataRef = dbRef(rtdb, path);
    const { subscribe, update } = writable<T[]>(hydrate, (set) => {

        let q: Query = query(
            dataRef,
            orderByChild(orderBy),
            limitToLast(limit)
        );

        get(q).then((snapshots) => {
            let posts: T[] = [];
            if (snapshots.exists()) {
                snapshots.forEach((child) => {
                    posts.push({ ...child.val(), key: child.key })
                });
            } else {
                console.log('No data available ' + path);
            }

            set(posts.reverse());
        })
    })

    async function fetch() {
        console.log('fetch new data');
        let q: Query = query(
            dataRef,
            orderByChild(orderBy),
            endBefore((hydrate[hydrate.length - 1] as any)[orderBy]),
            limitToLast(limit)
        );

        const snapshots = await get(q);

        if (snapshots.exists()) {
            let newPosts: Array<T> = [];
            snapshots.forEach((child) => {
                console.log();
                newPosts.push({ ...child.val(), key: child.key });
            });
            //// patch the store data
            update((n) => [...n, ...newPosts.reverse()]);
            hasMore = newPosts.length == limit;
        } else {
            hasMore = false;
            console.log('No more data found at ' + path);
        }
    }

    return {
        subscribe,
        ref: dataRef,
        fetch,
    }

}