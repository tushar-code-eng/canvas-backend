import express from 'express'
import Redis from 'ioredis'

const redis = new Redis({
    host:"localhost",
    port:6379,
}); // Connects to Redis
const router = express.Router();

router.post("/", async (req:any, res:any) => {
  try {
    const { canvasData } = req.body;
    console.log(canvasData)
    // if (!canvasData) {
    //   return res.status(400).json({ error: "Canvas data is required" });
    // }

    // Save the latest canvas state to Redis
    await redis.set("canvas_state", JSON.stringify(canvasData));

    res.status(200).json({ message: "Canvas saved to Redis" });
  } catch (error) {
    console.error("Error saving canvas:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router
