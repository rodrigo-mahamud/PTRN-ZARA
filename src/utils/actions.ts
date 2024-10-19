"use server";

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

import sharp from "sharp";

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
   const headers = {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      ...options.headers,
   };

   const response = await fetch(`${API_URL}/${endpoint}`, {
      ...options,
      headers,
   });

   if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
   }

   return response.json();
}

const FIXED_HEIGHT = 500;
const OUTPUT_QUALITY = 80;

export async function processImage(imageUrl: string): Promise<string> {
   try {
      const response = await fetch(imageUrl, { cache: "no-store" });
      if (!response.ok) {
         throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const processedImageBuffer = await sharp(buffer)
         .trim()
         .resize({
            height: FIXED_HEIGHT,
            fit: "contain",
            background: { r: 255, g: 255, b: 255, alpha: 0 },
         })
         .webp({ quality: OUTPUT_QUALITY })
         .toBuffer();

      const base64Image = processedImageBuffer.toString("base64");
      return `data:image/webp;base64,${base64Image}`;
   } catch (error) {
      console.error("Error processing image:", error);
      return imageUrl; // Fallback to original image if processing fails
   }
}
