import express from "express";
import { prisma } from "../config/prismaClient";

const router = express.Router();

router.post("/", async (req: any, res: any) => {
    try {
        const { hostId, sessionId } = req.body;

        //Can get the existing session from redis
        const existingSession = await prisma.session.findUnique({
            where: { sessionId }
        });

        if (existingSession) {
            return res.status(200).json(existingSession);
        }

        const session = await prisma.session.create({
            data: { sessionId, hostId, }
        });

        res.status(201).json(session);
    } catch (error) {
        console.error("Error creating session:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;