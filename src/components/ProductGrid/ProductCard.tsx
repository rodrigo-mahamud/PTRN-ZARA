import { ProductDataTypes } from "@/Types/types";

import Link from "next/link";
import React from "react";
import NormalizedImage from "../NormalizedImage";
import formatSlug from "@/utils/formatSlug";

export default async function ProductCard({ productsData }: ProductDataTypes) {
   const productSlug = formatSlug(productsData.brand, productsData.name);
   return (
      <Link
         href={`/product/${productSlug}/${productsData.id}`}
         className='hoverProduct group p-4 w-full border-r border-b border-black flex flex-col items-center justify-center relative'>
         <div className='relative w-4/6 m-16 aspect-square'>
            <NormalizedImage
               src={productsData.imageUrl}
               alt={productsData.name}
               fill
               className='size-full object-contain'
               quality={20}
               sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
            />
         </div>
         <div className='flex flex-col justify-center w-full gap-1 md:gap-2 group-hover:invert delay-300 group-hover:delay-0'>
            <span className='line-clamp-1 text-muted text-xxs uppercase tracking-tight'>{productsData.brand}</span>
            <div className='flex justify-between items-center'>
               <h2 className='uppercase line-clamp-1 text-sm md:text-xs'>{productsData.name}</h2>
               <h3 className='uppercase line-clamp-1 text-sm md:text-xs'>{productsData.basePrice} eur</h3>
            </div>
         </div>
      </Link>
   );
}
