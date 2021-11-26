// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { auth, firestore as db } from '@/lib/firebase-admin';
import { getAllSites, getUserFeedbacks, getUserSites } from '../../lib/db-admin';

export default async function handler(req, res) {

    try {
        const token = req.headers['token'];

        const { uid } = await auth.verifyIdToken(token)

        const { feedbacks, error } = await getUserFeedbacks(uid);

        if (error) {
            throw error;
        }

        res.status(200).json({ feedbacks: feedbacks });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
}
