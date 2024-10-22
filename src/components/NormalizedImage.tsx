import React from "react";
import Image from "next/image";
import { processImage } from "@/utils/actions";
import { NormalizedImageProps } from "@/Types/types";

// Implement a simple in-memory cache
const imageCache = new Map<string, string>();

async function getCachedImage(url: string): Promise<string> {
   const base64Image = await processImage(url);
   imageCache.set(url, base64Image);
   return base64Image;
}

export default async function NormalizedImage({
   src,
   alt,
   width,
   height,
   fill = false,
   className = "",
   sizes = "100vw",
   quality = 75,
   priority = false,
}: NormalizedImageProps) {
   const base64Image = await getCachedImage(src);

   return (
      <Image
         src={base64Image}
         alt={alt}
         width={width}
         height={height}
         fill={fill}
         className={className}
         sizes={sizes}
         quality={quality}
         priority={priority}
         loading={priority ? "eager" : "lazy"}
      />
   );
}
