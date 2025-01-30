import express from "express";
import { prisma } from "../config/prismaClient";

const router = express.Router();

router.get("/", async (req: any, res: any) => {
    try {
        const url = "http://localhost:5000"
        
        const session = await prisma.session.findUnique({
            where: { url },
            include: { strokes: true },
        });

        // if (!session) return res.status(404).json({ error: "Session not found" });

        res.json(session);
    } catch (error) {
        console.error("Error fetching session:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
