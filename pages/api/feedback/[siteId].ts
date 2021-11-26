import { getAllFeedBack, getSite } from "@/lib/db-admin";

export default async function handler(req, res) {
    const siteId = req.query.siteId;
    const result = await getAllFeedBack(siteId);
    const site = await getSite(siteId);
    if (result['feedbacks']) {
        return res.json({ ...result, ...site });
    } else {
        return res.status(500).json(result);
    }
}