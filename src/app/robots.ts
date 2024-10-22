import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
   const baseUrl = `https://${process.env.ROOT_DOMAIN || "localhost:3000"}`;

   return {
      rules: {
         userAgent: "*",
         allow: "/",
      },
      sitemap: `${baseUrl}/sitemap.xml`,
   };
}
