"use server";
import sharp from "sharp";
import { connectDB } from "@/utils/db/mongoose";
import { CacheModel } from "@/utils/db/cache";
import type { Product, ProductTypes } from "@/Types/types";

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

// Tipo para las opciones de las funciones
interface FetchOptions {
   search?: string;
   useCache?: boolean;
}

const logCacheEvent = (message: string, endpoint: string, search?: string) => {
   const timestamp = new Date().toISOString();
   const searchInfo = search ? ` with search "${search}"` : "";
   console.log(`[${timestamp}] Cache ${message} for endpoint "${endpoint}"${searchInfo}`);
};

async function getFromCache<T>(endpoint: string, search?: string) {
   const cacheKey = {
      endpoint,
      searchQuery: search || null,
   };

   const cachedData = await CacheModel.findOne(cacheKey);
   if (!cachedData) return null;
   const isCacheFresh = Date.now() - cachedData.lastUpdated.getTime() < 3600000;
   return {
      data: cachedData.data as T,
      isFresh: isCacheFresh,
   };
}

async function updateCache<T>(endpoint: string, search: string | undefined, newData: T) {
   const cacheKey = {
      endpoint,
      searchQuery: search || null,
   };

   await CacheModel.findOneAndUpdate(
      cacheKey,
      {
         data: newData,
         lastUpdated: new Date(),
      },
      { upsert: true, new: true }
   );
}

export async function fetchAPI<T = Product>(endpoint: string, options?: FetchOptions): Promise<T>;
export async function fetchAPI(endpoint: "products", options?: FetchOptions): Promise<ProductTypes[]>;
export async function fetchAPI(endpoint: `products/${string}`, options?: FetchOptions): Promise<Product>;
export async function fetchAPI<T>(endpoint: string, options?: FetchOptions): Promise<T> {
   const { search, useCache } = options || {};
   // Si useCache está activado, intentamos obtener de la caché
   if (useCache) {
      await connectDB();
      const cached = await getFromCache<T>(endpoint, search);

      if (cached) {
         if (cached.isFresh) {
            logCacheEvent("HIT (fresh)", endpoint, search);
            return cached.data;
         }
         logCacheEvent("HIT (stale) - initiating background refresh", endpoint, search);

         // Si ha pasado mas de 1h (configurado en isCacheFresh) disparamos la actualización en background
         Promise.resolve().then(async () => {
            try {
               logCacheEvent("BACKGROUND FETCH started", endpoint, search);
               const newData = await fetchAPI<T>(endpoint, { search });
               const hasChanged = JSON.stringify(newData) !== JSON.stringify(cached.data);

               if (hasChanged) {
                  await updateCache(endpoint, search, newData);
                  logCacheEvent("BACKGROUND UPDATE completed - data changed", endpoint, search);
               } else {
                  logCacheEvent("BACKGROUND CHECK completed - no changes needed", endpoint, search);
               }
            } catch (error) {
               console.error(`[${new Date().toISOString()}] Error updating cache for "${endpoint}":`, error);
            }
         });

         return cached.data;
      }

      logCacheEvent("MISS - fetching from API", endpoint, search);
   }

   // Si no está en cache hacemos Aetch a la api
   if (!API_KEY || !API_URL) {
      throw new Error("API_KEY o API_URL no están definidas");
   }

   const headers = {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
   };

   let url = `${API_URL}/${endpoint}`;
   if (search) {
      url += `?search=${encodeURIComponent(search)}`;
   }

   const response = await fetch(url, { headers });

   if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
   }

   const data = await response.json();

   // Si useCache está activado, guardamos en caché
   if (useCache) {
      await updateCache(endpoint, search, data);
      logCacheEvent("MISS - saved to cache", endpoint, search);
   }

   return data as T;
}

export async function fetchProductsCount(options?: FetchOptions): Promise<number> {
   const { search, useCache } = options || {};

   // Utilizamos fetchAPI con el caché si está activado
   const products = await fetchAPI<ProductTypes[]>("products", { search, useCache });
   return products.length;
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
            height: 475,
            fit: "contain",
            background: { r: 255, g: 255, b: 255, alpha: 0 },
         })
         .webp({ quality: 35 })
         .toBuffer();

      return `data:image/webp;base64,${processedImageBuffer.toString("base64")}`;
   } catch (error) {
      console.error("Error processing image:", error);
      return imageUrl;
   }
}
