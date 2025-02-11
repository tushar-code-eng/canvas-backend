import express from "express";
import { prisma } from "../../config/prismaClient";

const router = express.Router();

router.get("/", async (req: any, res: any) => {
    try {
        const sessions = await prisma.session.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: { strokes: true },
        });

        res.json(sessions);
    } catch (error) {
        console.error("Error fetching sessions:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
