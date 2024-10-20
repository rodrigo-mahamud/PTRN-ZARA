"use client";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import formatSlug from "@/utils/formatSlug";
import { useCallback, useEffect, useState } from "react";

interface ProcessedProduct {
   id: string;
   brand: string;
   name: string;
   basePrice: number;
   processedImageUrl: string;
}

interface ProductsCarrouselProps {
   similarProducts: ProcessedProduct[];
}

export default function ProductsCarrousel({ similarProducts }: ProductsCarrouselProps) {
   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "center", dragFree: true });
   const [scrollProgress, setScrollProgress] = useState(0);

   const onScroll = useCallback(() => {
      if (!emblaApi) return;
      const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
      setScrollProgress(progress);
   }, [emblaApi]);

   useEffect(() => {
      if (!emblaApi) return;

      onScroll();
      emblaApi.on("scroll", onScroll);
      emblaApi.on("reInit", onScroll);

      return () => {
         emblaApi.off("scroll", onScroll);
         emblaApi.off("reInit", onScroll);
      };
   }, [emblaApi, onScroll]);

   return (
      <div className='flex flex-col w-full mt-8'>
         <div className='flex justify-start h-full items-center'>
            <div className='w-full' ref={emblaRef}>
               <div className='flex'>
                  {similarProducts.map((product) => (
                     <div key={product.id} className='flex-[0_0_28%] min-w-0 border border-r-0 last:border-r border-black'>
                        <Link
                           href={`/product/${formatSlug(product.brand, product.name)}/${product.id}`}
                           className='hoverProduct group p-4 w-full flex flex-col items-center justify-center relative'>
                           <div className='relative w-4/6 m-20 aspect-square'>
                              <Image
                                 src={product.processedImageUrl}
                                 alt={product.name}
                                 fill
                                 className='size-full object-contain'
                                 quality={25}
                                 sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
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
               </div>
            </div>
         </div>
         <div className='w-full h-0.5 bg-gray-200 mt-12'>
            <div className='h-full bg-black transition-all duration-200 ease-out' style={{ width: `${scrollProgress * 100}%` }} />
         </div>
      </div>
   );
}
