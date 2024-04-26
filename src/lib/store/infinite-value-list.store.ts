import type { MapMap } from "$lib/interfaces.js";
import {
    Database,
    limitToFirst,
    onValue,
    orderByChild,
    query,
    ref,
    startAt,
    type DatabaseReference,
    type Query,
    type Unsubscribe,
} from "firebase/database";
import { get, writable, type Writable } from "svelte/store";


// stores
export const noMoreData: Writable<boolean> = writable(false);
export const values: Writable<MapMap | undefined> = writable(undefined);

// default order field
const orderField = 'order';
// last order value
let lastOderValue: any | undefined = undefined;
let loading = false;


let subscriptions: Array<Unsubscribe> = [];

export const unsubscribe = () => {
    subscriptions.forEach((unsub) => unsub());
    subscriptions = [];
};

interface FetchOptions {
    rtdb: Database;
    path: string;
    limit: number;
}

/**
 * Resets the store. It does not fetch the first page of data. It only resets the store.
 * @returns void
 */
export function reset() {
    lastOderValue = undefined;
    loading = false;
    noMoreData.set(false);
    values.set(undefined);
    unsubscribe();
}

/**
 * fetches data from the database
 * @param o options
 * @returns void
 */
export function fetch(o: FetchOptions) {

    if (get(noMoreData)) {
        console.log("no more data. don't fetch. just return");
        return;
    }
    if (loading) {
        console.log("In loading. don't fetch. just return");
        return;
    }

    loading = true;
    console.log("fetching data with: ", o.path, o.limit);

    // Prepare the query
    const listRef: DatabaseReference = ref(o.rtdb, o.path);
    let q: Query = query(listRef);
    q = query(listRef, orderByChild(orderField));
    if (lastOderValue) q = query(q, startAt(lastOderValue));
    q = query(q, limitToFirst(o.limit));

    // Subscribe to the query
    subscriptions.push(onValue(q, (snapshot) => {

        // Process the snapshot. Save the data to the store.
        const data: MapMap = get(values) ?? {};
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            const key = childSnapshot.ref.key as string;
            // JSON has no order. So, we need to create a key that has the order value in it.
            const orderKey = childData[orderField] + '-' + key;
            data[orderKey] = typeof childData === "object" ? { key, ...childData } : {};
            lastOderValue = childData[orderField];
        });
        console.log(data);
        values.set(data);

        /** 다음 페이지를 로드 하는 중에, DB 가 업데이터 되어, loading 이 false 가 될 수 있다. 이 경우 무시해도 된다. */
        loading = false;

        if (snapshot.size === 0 || snapshot.size < o.limit) {
            noMoreData.set(true);
        }
    }));
}