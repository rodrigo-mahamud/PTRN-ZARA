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
      <div className='aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden'>
         {selectedColor.imageUrl && selectedColor.imageUrl !== " " && (
            <Image
               src={selectedColor.imageUrl}
               alt='{`${data.name} in ${selectedColor.name}`}'
               width={500}
               height={500}
               layout='responsive'
               objectFit='contain'
               className='w-full h-full object-center object-cover'
            />
         )}
      </div>
   );
}
