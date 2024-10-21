"use server";
import sharp from "sharp";

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

//Extend vercel runtime duration

export async function fetchAPI(endpoint: string, search?: string) {
   //To force the skeletons only
   // await new Promise((resolve) => setTimeout(resolve, 50000));

   if (API_KEY && API_URL) {
      const headers = {
         "Content-Type": "application/json",
         "x-api-key": API_KEY,
      };

      let url = `${API_URL}/${endpoint}`;
      if (search) {
         url += `?search=${encodeURIComponent(search)}`;
      }

      const response = await fetch(url, {
         headers,
      });

      if (!response.ok) {
         throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      return response.json();
   }
}

export async function fetchProductsCount(search?: string): Promise<number> {
   if (API_KEY && API_URL) {
      const headers = {
         "Content-Type": "application/json",
         "x-api-key": API_KEY,
      };

      let url = `${API_URL}/products`;
      if (search) {
         url += `?search=${encodeURIComponent(search)}`;
      }

      const response = await fetch(url, {
         headers,
      });

      if (!response.ok) {
         throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.count; // Asumiendo que la API devuelve un objeto con una propiedad 'count'
   }

   throw new Error("API_KEY o API_URL no están definidas");
}

export async function processImage(imageUrl: string): Promise<string> {
   try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
         throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const processedImageBuffer = await sharp(buffer)
         .trim()
         .resize({
            height: 225, // FIXED_HEIGHT
            fit: "contain",
            background: { r: 255, g: 255, b: 255, alpha: 0 },
         })
         .webp({ quality: 25 }) // OUTPUT_QUALITY
         .toBuffer();

      // Convert the processed image buffer to a Base64 string
      const base64Image = processedImageBuffer.toString("base64");

      // Return the Base64 string with the appropriate data URL prefix
      return `data:image/webp;base64,${base64Image}`;
   } catch (error) {
      console.error("Error processing image:", error);
      return imageUrl; // Fallback to original image URL if processing fails
   }
}
