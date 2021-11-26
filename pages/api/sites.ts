// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { auth, firestore as db } from '@/lib/firebase-admin';
import { getAllSites, getUserSites } from '../../lib/db-admin';

export default async function handler(req, res) {
  try {
    const token = req.headers['token'];

    const { uid } = await auth.verifyIdToken(token)

    const { sites, error } = await getUserSites(uid);

    if (error) {
      throw error;
    }

    res.status(200).json({ sites: sites });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
}
