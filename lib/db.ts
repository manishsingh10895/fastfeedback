import firebase from "./firebase";
import { FormattedUser } from '@/infra/formatted-user';
import { Site } from "./models/site.model";
import { Feedback } from "./models/feedback.model";

const firestore = firebase.firestore();

export function createUser(uid: string, data: FormattedUser) {
    return firestore
        .collection('users')
        .doc(uid)
        .set({ uid, ...data }, { merge: true });
}

export function createSite(data: Partial<Site>) {
    return firestore
        .collection('sites')
        .add(data)
}

export function createFeedback(data: Partial<Feedback>) {
    return firestore
        .collection('feedback')
        .add(data);
}

export function removeFeedback(id: string) {
    return firestore
        .collection('feedback')
        .doc(id)
        .delete();
}