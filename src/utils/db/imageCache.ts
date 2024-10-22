import mongoose, { Schema, model, Model } from "mongoose";

interface IImageCache {
   originalUrl: string;
   base64Data: string;
   lastUpdated: Date;
}

const imageCacheSchema = new Schema<IImageCache>(
   {
      originalUrl: {
         type: String,
         required: true,
         unique: true,
         index: true,
      },
      base64Data: {
         type: String,
         required: true,
      },
      lastUpdated: {
         type: Date,
         default: Date.now,
      },
   },
   { timestamps: true }
);

export const ImageCacheModel = (mongoose.models.ImageCache || model<IImageCache>("ImageCache", imageCacheSchema)) as Model<IImageCache>;
