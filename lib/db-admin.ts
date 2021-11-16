
import { firestore as db } from '@/lib/firebase-admin';
import { compareDesc, parseISO } from 'date-fns';

export async function getAllSites(): Promise<{ sites, error }> {
    try {
        return db.collection('sites').get()
            .then(
                (snapshot) => {
                    let sites = [];
                    snapshot.forEach(
                        (doc) => {
                            sites.push({ id: doc.id, ...doc.data() });
                        }
                    );
                    return { sites, error: null };
                }
            );
    } catch (error) {
        console.error(error);
        return { error, sites: null }
    }
}

export async function getUserSites(userId): Promise<{ sites, error }> {
    try {
        return db.collection('sites')
            .where('authorId', '==', userId)
            .get()
            .then(
                (snapshot) => {
                    let sites = [];
                    snapshot.forEach(
                        (doc) => {
                            sites.push({ id: doc.id, ...doc.data() });
                        }
                    );
                    return { sites, error: null };
                }
            );
    } catch (error) {
        return { error, sites: null }
    }
}

export async function getUserFeedbacks(authorId: string): Promise<{ feedbacks, error }> {
    try {
        return db.collection('feedback')
            .where('authorId', '==', authorId)
            .get()
            .then(snapshot => {
                const feedbacks = [];
                snapshot.forEach(doc => {
                    feedbacks.push({
                        id: doc.id,
                        ...doc.data()
                    })
                });

                feedbacks.sort((a, b) => {
                    return compareDesc(parseISO(a.createdAt), parseISO(b.createdAt));
                })

                return { feedbacks, error: null };
            });
    } catch (error) {
        return { error, feedbacks: null }
    }
}

export async function getAllFeedBack(siteId: string): Promise<{ feedback, error }> {
    try {
        return db.collection('feedback')
            .where('siteId', '==', siteId)
            .get()
            .then(snapshot => {
                const feedback = [];
                snapshot.forEach(doc => {
                    feedback.push({
                        id: doc.id,
                        ...doc.data()
                    })
                });

                feedback.sort((a, b) => {
                    return compareDesc(parseISO(a.createdAt), parseISO(b.createdAt));
                })

                return { feedback, error: null };
            });
    } catch (error) {
        return { error, feedback: null }
    }
}