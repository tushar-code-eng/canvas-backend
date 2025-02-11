const Redis = require("ioredis");
const redis = new Redis({
  host:"localhost",
  port:6379
});

async function testRedis() {
  try {
    await redis.set("testKey", "Hello from Node.js!");
    const value = await redis.get("testKey");
    console.log("✅ Redis is working! Retrieved:", value);
  } catch (error) {
    console.error("❌ Redis error:", error);
  } finally {
    redis.quit();
  }
}

testRedis();