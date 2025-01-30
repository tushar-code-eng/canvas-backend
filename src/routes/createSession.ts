import express from "express";
import { prisma } from "../config/prismaClient";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { url,hostId } = req.body;
        
        const session = await prisma.session.create({
            data: { url, hostId }
        });

        res.status(201).json(session);
    } catch (error) {
        console.error("Error creating session:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
