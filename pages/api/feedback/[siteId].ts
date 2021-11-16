import { getAllFeedBack } from "@/lib/db-admin";

export default async function handler(req, res) {
    const siteId = req.query.siteId;
    const result = await getAllFeedBack(siteId);
    if (result['feedback']) {
        return res.json(result);
    } else {
        return res.status(500).json(result);
    }
}