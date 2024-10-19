"use server";

import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";
import crypto from "crypto";

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
   const headers = {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      ...options.headers,
   };

   const response = await fetch(`${API_URL}`, {
      ...options,
      headers,
   });

   if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
   }

   return response.json();
}

export async function getProducts() {
   return fetchAPI("/products");
}

export async function getProduct(id: string) {
   return fetchAPI(`/products/${id}`);
}

const FIXED_HEIGHT = 500;
const OUTPUT_QUALITY = 80;
const THUMBNAIL_SIZE = 10;

export async function processImage(imageUrl: string): Promise<{ processedUrl: string; blurDataURL: string }> {
   const hash = crypto.createHash("md5").update(imageUrl).digest("hex");
   const outputFilename = `${hash}.webp`;
   const outputPath = path.join(process.cwd(), "public", "processed-images", outputFilename);

   try {
      // Comprueba si la imagen ya ha sido procesada
      await fs.access(outputPath);
      const blurDataURL = await generateThumbnail(outputPath);
      return {
         processedUrl: `/processed-images/${outputFilename}`,
         blurDataURL,
      };
   } catch {
      // La imagen no existe, procésala
   }

   try {
      const response = await fetch(imageUrl, { cache: "no-store" });
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Procesa la imagen principal
      await sharp(buffer)
         .trim()
         .resize({
            height: FIXED_HEIGHT,
            fit: "contain",
            background: { r: 255, g: 255, b: 255, alpha: 0 },
         })
         .webp({ quality: OUTPUT_QUALITY })
         .toFile(outputPath);

      // Genera el thumbnail
      const blurDataURL = await generateThumbnail(outputPath);

      return {
         processedUrl: `/processed-images/${outputFilename}`,
         blurDataURL,
      };
   } catch (error) {
      console.error("Error processing image:", error);
      return {
         processedUrl: imageUrl,
         blurDataURL: "",
      };
   }
}

async function generateThumbnail(imagePath: string): Promise<string> {
   const thumbnailBuffer = await sharp(imagePath).resize(THUMBNAIL_SIZE, THUMBNAIL_SIZE).webp({ quality: 80 }).toBuffer();

   return `data:image/webp;base64,${thumbnailBuffer.toString("base64")}`;
}
