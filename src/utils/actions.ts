"use server";
import sharp from "sharp";
import path from "path";
import fs from "fs/promises";
import crypto from "crypto";
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
   // //To show the skeleton only
   // await new Promise((resolve) => setTimeout(resolve, 500000000));

   if (API_KEY && API_URL) {
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
}

const PROCESSED_IMAGES_DIR = path.join(process.cwd(), "public", "processed-images");
const FIXED_HEIGHT = 500;
const OUTPUT_QUALITY = 80;

function generateReadableFileName(url: string): string {
   const urlObj = new URL(url);
   const baseName = path.basename(urlObj.pathname).split(".")[0];
   const hash = crypto.createHash("md5").update(url).digest("hex").slice(0, 6);
   return `${baseName}-${hash}`;
}

async function getProcessedImagePath(fileName: string): Promise<string | null> {
   const processedPath = path.join(PROCESSED_IMAGES_DIR, `${fileName}.webp`);
   try {
      await fs.access(processedPath);
      return `/processed-images/${fileName}.webp`;
   } catch {
      return null;
   }
}

export async function processImage(imageUrl: string): Promise<string> {
   try {
      const fileName = generateReadableFileName(imageUrl);

      // Check if the processed image already exists
      const existingPath = await getProcessedImagePath(fileName);
      if (existingPath) {
         return existingPath;
      }

      const processedPath = path.join(PROCESSED_IMAGES_DIR, `${fileName}.webp`);

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

      // Ensure the processed-images directory exists
      await fs.mkdir(PROCESSED_IMAGES_DIR, { recursive: true });

      // Save the processed image
      await fs.writeFile(processedPath, processedImageBuffer);

      return `/processed-images/${fileName}.webp`;
   } catch (error) {
      console.error("Error processing image:", error);
      return imageUrl; // Fallback to original image if processing fails
   }
}
