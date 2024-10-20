"use client";
import { Product } from "@/Types/types";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";

export default function ProductVariations({ data }: { data: Product }) {
   const searchParams = useSearchParams();
   const pathname = usePathname();
   const { replace } = useRouter();

   const selectedColorName = searchParams.get("color") || data.colorOptions[0].name;
   const selectedStorageCapacity = searchParams.get("storage") || data.storageOptions[0].capacity;

   const selectedColor = data.colorOptions.find((color) => color.name === selectedColorName) || data.colorOptions[0];
   const selectedStorage = data.storageOptions.find((storage) => storage.capacity === selectedStorageCapacity) || data.storageOptions[0];

   const handleColorChange = (colorName: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("color", colorName);
      replace(`${pathname}?${params.toString()}`);
   };

   const handleStorageChange = (storageCapacity: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("storage", storageCapacity);
      replace(`${pathname}?${params.toString()}`);
   };
   return (
      <div className='flex flex-col gap-6'>
         {/* Storage options */}
         <div className='flex flex-col gap-3'>
            <h3 className='font-light'>STORAGE HOW MUCH SPACE DO YOU NEED?</h3>
            <div className='flex'>
               {data.storageOptions.map((option) => (
                  <button
                     key={option.capacity}
                     className={`h-16 w-28  text-sm ${
                        selectedStorage.capacity === option.capacity
                           ? "border border-black text-black"
                           : "border-black/25 border border-l-0 first:border-l text-gray-700"
                     }`}
                     onClick={() => handleStorageChange(option.capacity)}>
                     {option.capacity}
                  </button>
               ))}
            </div>
         </div>
         {/* Color options */}
         <div className='flex flex-col gap-3'>
            <h3 className='font-light'>COLOR: PICK YOUR FAVOURITE</h3>
            <div className='flex flex-col'>
               <div className='flex gap-4'>
                  {data.colorOptions.map((color) => (
                     <div
                        key={color.name}
                        className={`size-7 p-px border-2 ${selectedColor.name !== color.name ? "border-black/25 " : "border-black "}`}>
                        <button
                           className='size-full'
                           style={{ backgroundColor: color.hexCode }}
                           onClick={() => handleColorChange(color.name)}
                           aria-label={color.name}
                        />
                     </div>
                  ))}
               </div>
               <span className='text-xs mt-3'>{selectedColor.name}</span>
            </div>
         </div>
      </div>
   );
}
