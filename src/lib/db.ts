import mongoose from "mongoose";

declare global {
  // allow global `mongoose` cache
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

const MONGO_URI = process.env.MONGO_URI


let cached = (globalThis as typeof globalThis & { mongoose?: any }).mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI!).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  console.log("MongoDB connected");
  
  return cached.conn;
}

export default dbConnect;
