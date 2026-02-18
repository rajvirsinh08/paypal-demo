import app from "../server";
import mongoose from "mongoose";

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!);
    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
}

export default async function handler(req: any, res: any) {
  await connectDB();   // 🔥 THIS IS THE IMPORTANT LINE
  return app(req, res);
}
