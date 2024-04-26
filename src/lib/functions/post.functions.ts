import { PUBLIC_FIREBASE_CLIENT_CONFIG } from "$env/static/public";
import type { MapMap } from "$lib/interfaces.js";
import { DataSnapshot, Database, get, getDatabase, limitToFirst, orderByChild, query, ref, type Query } from "firebase/database";
import { initializeFirebaseClient } from "../../init.firebase.client.js";

interface PostListOption {
    path: string,
    limit?: number,
    orderField?: string,
    lastOrderValue?: string
}

export async function postList(o: PostListOption): Promise<MapMap> {

    o.limit = o.limit ?? 10;
    o.orderField = o.orderField ?? 'order';

    const rtdb: Database = getDatabase();

    const rtdbRef = ref(rtdb, o.path);

    let q: Query = query(rtdbRef, orderByChild(o.orderField), limitToFirst(10));
    const snapshots: DataSnapshot = await get(q);

    // let posts: Array<Map> = [];

    const posts: MapMap = {};
    if (snapshots.exists()) {
        snapshots.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            const key = childSnapshot.ref.key as string;
            // JSON has no order. So, we need to create a key that has the order value in it.
            const orderKey = childData[o.orderField!] + '-' + key;
            posts[orderKey] = typeof childData === "object" ? { key, ...childData } : {};
        });
    } else {
        console.log('No data available at ' + o.path);
    }
    return posts;
}