import express from "express";
import cors from "cors";
import http from "http";
import { WebSocketServer } from "ws"; // Import ws
import { createClient } from "redis"; // Import Redis client
import createSession from "./routes/createSession";
import getSession from "./routes/getSession";
import strokeRoutes from "./routes/strokeRoutes";
import { prisma } from "./config/prismaClient";

import fabric from 'fabric'

// const redisClient = createClient();
// redisClient.connect().catch(console.error);

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server }); 
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/createSession",createSession );
app.use("/api/stroke", strokeRoutes);
app.use("/api/getSession", getSession);

// const pubSubChannel = "canvas-updates"; 
// redisClient.subscribe(pubSubChannel, (message) => {
//   const data = JSON.parse(message);

//   wss.clients.forEach((client) => {
//     if (client.readyState === client.OPEN) {
//       client.send(message);
//     }
//   });
// });

wss.on("connection", (ws) => {
  console.log("A new user connected");

  ws.on("message", async (message: string) => {
    try {
      console.log("message incomming")
      const data = JSON.parse(message);

      // Handle stroke creation
      if (data.type === "stroke-created") {
        console.log("in here")
        const { sessionUrl, userId, name, fabricObject } = data;
        console.log(sessionUrl)
        // Find the session by URL
        const session = await prisma.session.findUnique({
          where: { url: sessionUrl }
        });
        console.log(session)

        if (!session) {
          ws.send(JSON.stringify({ error: "Session not found" }));
          return;
        }

        // Serialize Fabric.js object
        const strokeData = fabricObject ? fabric.Object.prototype.toJSON.call(fabricObject) : {};
        console.log(strokeData)

        // Create a new stroke in the session
        const newStroke = await prisma.stroke.create({
          data: {
            name,
            strokeData,
            userId,
            sessionId: session.id,
          },
        });

        // Publish stroke data to Redis channel
        // const messageToPublish = JSON.stringify({
        //   type: "stroke-created",
        //   stroke: newStroke,
        // });
        // redisClient.publish(pubSubChannel, messageToPublish);
      }
    } catch (error) {
      console.error("Error handling message:", error);
      ws.send(JSON.stringify({ error: "Internal Server Error" }));
    }
  });

  ws.on("close", () => {
    console.log("A user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
