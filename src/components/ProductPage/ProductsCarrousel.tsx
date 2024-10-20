"use client";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState, ReactNode } from "react";

interface ProductsCarrouselProps {
   children: ReactNode;
}

export default function ProductsCarrousel({ children }: ProductsCarrouselProps) {
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
               <div className='flex'>{children}</div>
            </div>
         </div>
         <div className='w-full h-0.5 bg-gray-200 mt-12'>
            <div className='h-full bg-black transition-all duration-200 ease-out' style={{ width: `${scrollProgress * 100}%` }} />
         </div>
      </div>
   );
}
