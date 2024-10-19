import { ProductDataTypes } from "@/Types/types";
import { processImage } from "@/utils/actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function ProductCard({ productData }: ProductDataTypes) {
   const { processedUrl, blurDataURL } = await processImage(productData.imageUrl);

   return (
      <Link
         href={`/products/${productData.id}/${productData.brand.toLowerCase()}/${productData.name.toLowerCase().replace(/ /g, "-")}`}
         className='hoverProduct group p-4 w-full bg-red border-r border-b border-black flex flex-col items-center justify-center relative'>
         <div className='relative w-4/6 m-16 aspect-square'>
            <Image
               src={processedUrl}
               fill
               className='size-full object-contain'
               quality={100}
               sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
               alt={productData.name}
               placeholder='blur'
               blurDataURL={blurDataURL}
            />
         </div>
         <div className='flex flex-col justify-center w-full gap-2 group-hover:invert ease-in-out duration-300'>
            <span className='line-clamp-1 text-muted text-xxs uppercase tracking-tight'>{productData.brand}</span>
            <div className='flex justify-between items-center'>
               <h2 className='uppercase line-clamp-1 text-xs'>{productData.name}</h2>
               <h3 className='uppercase line-clamp-1 text-xs'>{productData.basePrice} eur</h3>
            </div>
         </div>
      </Link>
   );
}
