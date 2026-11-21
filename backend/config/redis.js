import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",

  // Don't queue commands when Redis is disconnected
  disableOfflineQueue: true,

  socket: {
    connectTimeout: 5000,

    // Limit automatic reconnection attempts
    reconnectStrategy: (retries) => {
      if (retries > 3) {
        console.log("Redis reconnect attempts exhausted.");
        return false;
      }

      return Math.min(retries * 500, 2000);
    },
  },
});

redisClient.on("error", (error) => {
  console.error("Redis Client Error:", error.message);
});

redisClient.on("ready", () => {
  console.log("Redis is ready");
});

redisClient.on("end", () => {
  console.log("Redis connection closed");
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis");
    return true;
  } catch (error) {
    console.error("Redis connection failed:", error.message);
    console.log("Continuing without Redis. MongoDB will be used.");
    return false;
  }
};

export default redisClient;
export { connectRedis };