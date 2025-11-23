import mongoose, { connect, disconnect, connection } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is missing in environment variables!");
}

let isConnected = false;

export const connectDB = async (): Promise<void> => {
  if (isConnected || connection.readyState === 1) {
 
    return;
  }

  try {
    await connect(MONGODB_URI);
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await disconnect();
    isConnected = false;
    console.log("🛑 MongoDB disconnected");
  } catch (error) {
    console.error("❌ MongoDB disconnection error:", error);
  }
};
