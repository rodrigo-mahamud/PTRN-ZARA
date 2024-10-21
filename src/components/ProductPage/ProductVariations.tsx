"use client";
import { Product } from "@/Types/types";
import { useCart } from "@/utils/cartContext";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function ProductVariations({ data }: { data: Product }) {
   const searchParams = useSearchParams();
   const pathname = usePathname();
   const { replace } = useRouter();
   const { addToCart } = useCart();

   const selectedColorName = searchParams.get("color");
   const selectedStorageCapacity = searchParams.get("storage");

   const selectedColor = data.colorOptions.find((color) => color.name === selectedColorName);
   const selectedStorage = data.storageOptions.find((storage) => storage.capacity === selectedStorageCapacity);

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
   const handleAddToCart = () => {
      if (selectedColor && selectedStorage) {
         addToCart({
            id: data.id,
            color: selectedColor.name,
            storage: selectedStorage.capacity,
         });
         toast.success(`${data.name} añadido al carrito`);
      }
   };

   return (
      <>
         <div className='flex flex-col gap-6'>
            {/* Storage options */}
            <div className='flex flex-col gap-3'>
               <h3 className='font-light'>STORAGE HOW MUCH SPACE DO YOU NEED?</h3>
               <div className='flex'>
                  {data.storageOptions.map((option) => (
                     <button
                        key={option.capacity}
                        className={`h-16 w-28  text-sm ${
                           selectedStorage?.capacity === option.capacity
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
                           className={`size-7 p-px border-2 ${selectedColor?.name !== color.name ? "border-black/25 " : "border-black "}`}>
                           <button
                              className='size-full'
                              style={{ backgroundColor: color.hexCode }}
                              onClick={() => handleColorChange(color.name)}
                              aria-label={color.name}
                           />
                        </div>
                     ))}
                  </div>
                  <span className='text-xs mt-3'>{selectedColor?.name}</span>
               </div>
            </div>
         </div>
         <button
            type='button'
            disabled={!selectedColorName || !selectedStorageCapacity}
            onClick={handleAddToCart}
            className='w-full py-4 px-8 flex items-center justify-center text-sm font-light tracking-tight bg-[#1B1A18] text-white ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-600'>
            AÑADIR AL CARRITO
         </button>
      </>
   );
}
