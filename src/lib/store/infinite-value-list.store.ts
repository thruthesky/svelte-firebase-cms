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
import { writable, type Writable } from "svelte/store";


export const values: Writable<Array<{ [key: string]: any }>> = writable([]);

let subscriptions: Array<Unsubscribe> = [];

export const unsubscribe = () => {
    subscriptions.forEach((unsub) => unsub());
    subscriptions = [];
};

interface FetchOptions {
    rtdb: Database;
    path: string;
    order?: string;
    orderValue?: any;
    limit: number;
}

export function fetch(o: FetchOptions) {


    const listRef: DatabaseReference = ref(o.rtdb, o.path);


    let q: Query = query(listRef);
    if (o.order) q = query(listRef, orderByChild(o.order));
    if (o.orderValue) q = query(q, startAt(o.orderValue));
    q = query(q, limitToFirst(o.limit));



    subscriptions.push(onValue(q, (snapshot) => {

        const arr: any[] = [];

        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            arr.push({
                nodeKey: childSnapshot.ref.key,
                ...(typeof childData === "object" ? childData : {}),
            });
        });

        values.update((v) => {
            v.push(...arr);
            return v;
        });
    }));
}