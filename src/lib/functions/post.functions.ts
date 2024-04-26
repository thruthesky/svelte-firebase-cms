import { PUBLIC_FIREBASE_CLIENT_CONFIG } from "$env/static/public";
import type { MapMap } from "$lib/interfaces.js";
import { DataSnapshot, Database, get, getDatabase, limitToFirst, orderByChild, push, query, ref, update, type DatabaseReference, type Query } from "firebase/database";
import { initializeFirebaseClient } from "../../init.firebase.client.js";
import { getAuth } from "firebase/auth";

export interface PostListOption {
    path: string,
    limit?: number,
    orderField?: string,
    lastOrderValue?: string
}

export interface PostInterface {
    title: string;
    content: string;
    category: string;
    createdAt?: number;
    order?: number;
    uid?: string;
}


export async function postGet(path: string) {
    const rtdb = getDatabase();
    const postsRef: DatabaseReference = ref(rtdb, path);
    const snapshot = await get(postsRef);
    return snapshot.val();
}

export async function postCreate(o: PostInterface) {

    const rtdb = getDatabase();
    const postsRef: DatabaseReference = ref(rtdb, `posts/${o.category}/`);
    const auth = getAuth();
    const uid = auth.currentUser!.uid;
    const now = Date.now();

    o.createdAt = now;
    o.order = now * -1;
    o.uid = uid;

    const newRef = await push(postsRef)
    await update(newRef, o);

    const snapshot = await get(newRef);
    console.log(snapshot.val());
    return snapshot.val();
}

export async function postList(o: PostListOption): Promise<MapMap> {

    o.limit = o.limit ?? 10;
    o.orderField = o.orderField ?? 'order';
    const rtdb: Database = getDatabase();

    const rtdbRef = ref(rtdb, o.path);


    let q: Query = query(rtdbRef, orderByChild(o.orderField), limitToFirst(10));
    console.log(q.ref.parent?.parent?.key, q.ref.parent?.key, q.ref.key);
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


