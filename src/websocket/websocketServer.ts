import { Server } from "ws";
import { Server as HTTPServer } from "http";
import Redis from "ioredis";
import { WebSocket } from "ws";

const redisPub = new Redis(); // Publisher
const redisSub = new Redis(); // Subscriber

interface ClientMessage {
  type: string;
  data: any;
}

const clients = new Set<WebSocket>();

export function setupWebSocket(server: HTTPServer) {
  const wss = new Server({ server });

  wss.on("connection", (ws: WebSocket) => {
    console.log("New client connected");
    clients.add(ws);

    ws.on("message", (message) => {
      try {
        const parsedMessage: ClientMessage = JSON.parse(message.toString());

        // Publish message to Redis
        redisPub.publish("canvasUpdates", JSON.stringify(parsedMessage));
      } catch (error) {
        console.error("Error processing message:", error);
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected");
      clients.delete(ws);
    });
  });

  // Subscribe to Redis updates
  redisSub.subscribe("canvasUpdates");
  redisSub.on("message", (_channel, message) => {
    // Broadcast received message to all connected clients
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  console.log("WebSocket server started!");
}
