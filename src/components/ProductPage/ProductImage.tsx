"use client";
import { Product } from "@/Types/types";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function ProductImage({ data }: { data: Product }) {
   const searchParams = useSearchParams();
   const selectedColorName = searchParams.get("color") || data.colorOptions[0].name;
   const selectedColor = data.colorOptions.find((color) => color.name === selectedColorName) || data.colorOptions[0];

   return (
      <div className='w-full aspect-square overflow-hidden relative'>
         {selectedColor.imageUrl && selectedColor.imageUrl !== " " && (
            <Image
               src={selectedColor.imageUrl}
               alt='{`${data.name} in ${selectedColor.name}`}'
               fill
               priority
               quality={75}
               sizes='(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw'
               className='w-full h-full object-center object-contain'
            />
         )}
      </div>
   );
}
