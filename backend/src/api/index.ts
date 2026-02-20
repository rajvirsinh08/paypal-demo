// import app from "../server";
// import mongoose from "mongoose";

// let cached = (global as any).mongoose;

// if (!cached) {
//   cached = (global as any).mongoose = { conn: null, promise: null };
// }

// async function connectDB() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(process.env.MONGODB_URI!);
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default async function handler(req: any, res: any) {
//   await connectDB();
//   return app(req, res);
// }
import app from "../server";
import mongoose from "mongoose";

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    mongoose.set("bufferCommands", false); // 🔥 VERY IMPORTANT

    cached.promise = mongoose.connect(process.env.MONGODB_URI!, {
      serverSelectionTimeoutMS: 5000,
    });
  }
console.log("ENV MONGODB_URI:", process.env.MONGODB_URI);
  cached.conn = await cached.promise;
  return cached.conn;
}

export default async function handler(req: any, res: any) {
  await connectDB();
  return app(req, res);
}