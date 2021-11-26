
import { firestore as db } from '@/lib/firebase-admin';
import { Site } from '@/lib/models/site.model';
import { compareDesc, parseISO } from 'date-fns';

export async function getSite(siteId: string): Promise<{ site: Site }> {
    try {
        const doc = await db.collection('sites').doc(siteId).get();

        const site: Site = { id: doc.id, ...doc.data() } as Site;
        return { site }
    } catch (error) {
        throw error;
    }
}

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
            .where('status', 'in', ['active', 'pending'])
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

export async function getAllFeedBack(siteId: string, route?: string): Promise<{ feedbacks, error }> {
    try {
        let ref = db.collection('feedback')
            .where('siteId', '==', siteId)
            .where('status', 'in', ['active', 'pending']);

        if (route) {
            ref = ref.where('route', '==', route);
        }

        return ref.get()
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

                return { feedbacks: feedback, error: null };
            });
    } catch (error) {
        return { error, feedbacks: null }
    }
}