import { Product } from "@/Types/types";
import { fetchAPI, processImage } from "@/utils/actions";
import ProductsCarrousel from "./ProductsCarrousel";

import formatSlug from "@/utils/formatSlug";
import Link from "next/link";
import NormalizedImage from "../NormalizedImage";

export default async function ProductRelated({ id }: { id: string }) {
   const data: Product = await fetchAPI(`products/${id}`, { useCache: false });

   if (!data || !data.similarProducts || data.similarProducts.length === 0) {
      return null;
   }

   const processedSimilarProducts = await Promise.all(
      data.similarProducts.map(async (product) => {
         const processedImageUrl = await processImage(product.imageUrl);
         return { ...product, processedImageUrl };
      })
   );

   return (
      <div className='pb-24 md:pb-48 pt-12 md:pt-24 overflow-hidden'>
         <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 '>
            <h2 className='text-xl font-light tracking-tight'>PRODUCTOS SIMILARES</h2>
            <ProductsCarrousel>
               {processedSimilarProducts.map((product, index) => (
                  <div key={index} className='flex-[0_0_90%] md:flex-[0_0_28%] min-w-0 border border-r-0 last:border-r border-black'>
                     <Link
                        href={`/product/${formatSlug(product.brand, product.name)}/${product.id}`}
                        className='hoverProduct group p-4 w-full flex flex-col items-center justify-center relative'>
                        <div className='relative w-4/6 m-20 aspect-square'>
                           <NormalizedImage
                              src={product.processedImageUrl}
                              alt={product.name}
                              fill
                              className='size-full object-contain'
                              quality={75}
                              sizes='(max-width: 768px) 100vw, 55vw'
                           />
                        </div>
                        <div className='flex flex-col justify-center w-full gap-2 group-hover:invert ease-in-out duration-300'>
                           <span className='line-clamp-1 text-muted text-xs uppercase tracking-tight leading-3'>{product.brand}</span>
                           <div className='flex justify-between items-center'>
                              <h2 className='uppercase line-clamp-1 text-sm'>{product.name}</h2>
                              <h3 className='uppercase line-clamp-1 text-sm'>{product.basePrice} eur</h3>
                           </div>
                        </div>
                     </Link>
                  </div>
               ))}
            </ProductsCarrousel>
         </div>
      </div>
   );
}
