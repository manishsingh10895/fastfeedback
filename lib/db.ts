import firebase, { app } from "./firebase";
import { FormattedUser } from '@/infra/formatted-user';
import { Site } from "./models/site.model";
import { Feedback } from "./models/feedback.model";
import getStripe from "./stripe";

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

export async function createCheckoutSession(uid) {
    const docRef = await firestore
        .collection('users')
        .doc(uid)
        .collection('checkout_sessions')
        .add({
            price: 'price_1JxIwZEw1N2H28FmhTbFX5Bb',
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });

    docRef.onSnapshot(async (snap) => {
        const { sessionId } = snap.data();
        console.log(snap.data());

        if (sessionId) {
            const stripe = await getStripe();

            stripe.redirectToCheckout({
                sessionId,
            });
        }
    });
}

export async function getToBillingPortal() {
    const functionRef = firebase
        .app()
        .functions('us-central1')
        .httpsCallable('ext-firestore-stripe-payments-createPortalLink');

    const { data } = await functionRef({ returnUrl: window.location.origin });

    window.location.assign(data.url);
}