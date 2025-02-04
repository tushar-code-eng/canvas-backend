// import express from "express";
// import { prisma } from "../config/prismaClient";
// import fabric from "fabric";

// const router = express.Router();

// router.post("/create", async (req: any, res: any) => {
//     try {
//         const { sessionUrl, userId, name, fabricObject } = req.body;

//         const session = await prisma.session.findUnique({
//             where: { url: sessionUrl },
//         });

//         if (!session) {
//             return res.status(404).json({ error: "Session not found" });
//         }

//         const strokeData = fabricObject ? fabric.Object.prototype.toJSON.call(fabricObject) : {};

//         const newStroke = await prisma.stroke.create({
//             data: {
//                 name,
//                 strokeData,
//                 userId,
//                 sessionId: session.id,
//             },
//         });

//         res.status(201).json(newStroke);
//     } catch (error) {
//         console.error("Error creating stroke:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// router.get("/:sessionUrl", async (req: any, res: any) => {
//     try {
//         const { sessionUrl } = req.params;

//         const session = await prisma.session.findUnique({
//             where: { url: sessionUrl },
//             include: { strokes: true },
//         });

//         if (!session) {
//             return res.status(404).json({ error: "Session not found" });
//         }

//         res.json(session.strokes);
//     } catch (error) {
//         console.error("Error fetching strokes:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// export default router;
