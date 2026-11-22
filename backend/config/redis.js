import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL,

  disableOfflineQueue: true,

  socket: {
    connectTimeout: 10000,

    reconnectStrategy: (retries) => {
      if (retries > 5) {
        return new Error("Redis reconnect attempts exhausted");
      }

      return Math.min(retries * 1000, 5000);
    },
  },
});

redisClient.on("error", (error) => {
  console.error("Redis Client Error:", error.message);
});

redisClient.on("ready", () => {
  console.log("Redis is ready!");
});

redisClient.on("end", () => {
  console.log("Redis connection closed");
});

const connectRedis = async () => {
  try {
    if (!process.env.REDIS_URL) {
      throw new Error("REDIS_URL is missing in .env");
    }

    await redisClient.connect();

    console.log("Connected to Redis Cloud!");

    return true;
  } catch (error) {
    console.error("Redis connection failed:", error.message);
    console.log("Continuing without Redis. MongoDB will be used.");

    return false;
  }
};

export default redisClient;
export { connectRedis };