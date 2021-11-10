import firebase from "./firebase";
import { FormattedUser } from '../infra/formatted-user';

const firestore = firebase.firestore();

export function createUser(uid: string, data: FormattedUser) {
    return firestore
        .collection('users')
        .doc(uid)
        .set({ uid, ...data }, { merge: true });
}