import mongoose from "mongoose";

declare global {
   interface GlobalWithMongoose extends Global {
      mongoose:
         | {
              conn: typeof mongoose | null;
              promise: Promise<typeof mongoose> | null;
           }
         | undefined;
   }
}

declare const global: GlobalWithMongoose;

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
   throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
   cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
   if (cached && cached.conn) {
      return cached.conn;
   }

   if (cached && !cached.promise) {
      const opts = {
         bufferCommands: false,
      };

      cached.promise = mongoose.connect(MONGODB_URI, opts);
   }
   if (cached) {
      try {
         cached.conn = await cached.promise;
      } catch (e) {
         cached.promise = null;
         throw e;
      }
      return cached.conn;
   }
}
