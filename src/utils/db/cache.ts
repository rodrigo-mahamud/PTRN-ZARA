import mongoose, { Schema, model, Model } from "mongoose";

export interface ICache {
   endpoint: string;
   searchQuery?: string | null;
   data: unknown;
   lastUpdated: Date;
}

const cacheSchema = new Schema<ICache>(
   {
      endpoint: { type: String, required: true },
      searchQuery: { type: String, default: null },
      data: { type: Schema.Types.Mixed, required: true },
      lastUpdated: { type: Date, default: Date.now },
   },
   { timestamps: true }
);

cacheSchema.index({ endpoint: 1, searchQuery: 1 }, { unique: true });

// Evitamos el error de modelo ya definido en desarrollo por hot reload
export const CacheModel = (mongoose.models.Cache || model<ICache>("Cache", cacheSchema)) as Model<ICache>;
