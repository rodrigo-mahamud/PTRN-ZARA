import { fetchAPI } from "@/utils/actions";
import type { MetadataRoute } from "next";
import type { ProductTypes } from "@/Types/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
   const baseUrl = `https://${process.env.ROOT_DOMAIN || "localhost:3000"}`;

   try {
      const products = await fetchAPI<ProductTypes[]>("products", { useCache: true });

      const staticRoutes: MetadataRoute.Sitemap = [
         {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
         },
         {
            url: `${baseUrl}/products`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
         },
      ];

      const productRoutes: MetadataRoute.Sitemap = products.map((product) => {
         return {
            url: `${baseUrl}/products/${product.id}`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.6,
         };
      });

      return [...staticRoutes, ...productRoutes];
   } catch (error) {
      console.error("Error generating sitemap:", error);

      return [
         {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
         },
      ];
   }
}
