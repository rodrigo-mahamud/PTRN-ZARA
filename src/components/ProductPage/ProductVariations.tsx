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
      <>
         {/* Storage options */}
         <div className='mt-8'>
            <h3 className='text-sm font-medium text-gray-900'>STORAGE (HOW MUCH SPACE DO YOU NEED?)</h3>
            <div className='mt-4 flex space-x-3'>
               {data.storageOptions.map((option) => (
                  <button
                     key={option.capacity}
                     className={`px-4 py-2 border rounded-md  ${
                        selectedStorage.capacity === option.capacity ? "border-blue-500 text-blue-500" : "border-gray-300 text-gray-700"
                     }`}
                     onClick={() => handleStorageChange(option.capacity)}>
                     {option.capacity}
                  </button>
               ))}
            </div>
         </div>
         {/* Color options */}
         <div className='mt-8'>
            <h3 className='text-sm font-medium text-gray-900'>COLOR: PICK YOUR FAVOURITE</h3>
            <div className='mt-4 flex space-x-3'>
               {data.colorOptions.map((color) => (
                  <button
                     key={color.name}
                     className={`w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                        selectedColor.name === color.name ? "ring-2 ring-blue-500" : ""
                     }`}
                     style={{ backgroundColor: color.hexCode }}
                     onClick={() => handleColorChange(color.name)}
                     aria-label={color.name}
                  />
               ))}
            </div>
         </div>
      </>
   );
}
