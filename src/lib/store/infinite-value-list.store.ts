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



const orderField = 'order';
let lastOderValue: any | undefined = undefined;
export const noMoreData: Writable<boolean> = writable(false);

export const values: Writable<MapMap | undefined> = writable(undefined);

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

export function fetch(o: FetchOptions) {

    if (get(noMoreData)) return;


    const listRef: DatabaseReference = ref(o.rtdb, o.path);


    let q: Query = query(listRef);
    q = query(listRef, orderByChild(orderField));
    if (lastOderValue) q = query(q, startAt(lastOderValue));
    q = query(q, limitToFirst(o.limit));



    subscriptions.push(onValue(q, (snapshot) => {

        const data: MapMap = get(values) ?? {};

        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            const key = childData[orderField] + '-' + childSnapshot.ref.key as string;
            data[key] = typeof childData === "object" ? { key, ...childData } : {};
            lastOderValue = childData[orderField];
        });

        values.set(data);

        if (snapshot.size === 0 || snapshot.size < o.limit) {
            noMoreData.set(true);
        }

    }));
}