import { getAuth } from "firebase/auth";
import { get, getDatabase, ref, update, type DatabaseReference } from "firebase/database";

export interface UserInterface {
    uid? : string;
    displayName?: string;
    photoUrl?: string;
    stateMessage?: string;
    lastLogin?: any;
}


export async function userGet(uid: string): Promise<UserInterface> {
    const rtdb = getDatabase();
    const userRef: DatabaseReference = ref(rtdb, 'users/' + uid);
    const snapshot = await get(userRef);
    return snapshot.val();
}


export async function userUpdate(data: UserInterface) {
    const auth = getAuth();
    const uid = auth.currentUser!.uid;

    const rtdb = getDatabase();
    const userRef: DatabaseReference = ref(rtdb, 'users/' + uid);

    console.log('userRef', userRef, 'data', data)
    return await update(userRef, data);
}

