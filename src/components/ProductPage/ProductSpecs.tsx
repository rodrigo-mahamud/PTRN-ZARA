import { Product } from "@/Types/types";
import { fetchAPI } from "@/utils/actions";
import React from "react";

export default async function ProductSpecs({ id }: { id: string }) {
   const data: Product = await fetchAPI(`products/${id}`);
   return (
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24'>
         <h2 className='text-xl font-light tracking-tight'>ESPECIFICACIONES</h2>
         <div className='mt-4'>
            {Object.entries(data.specs).map(([key, value]) => (
               <div key={key} className='flex flex-row justify-between gap-5 py-4 sm:grid sm:grid-cols-3 sm:gap-4 border-b border-black'>
                  <dt className='text-xs tracking-tight font-medium uppercase'>{key}</dt>
                  <dd className='mt-1 text-xs text-end md:text-start tracking-tight sm:mt-0 sm:col-span-2'>{value}</dd>
               </div>
            ))}
         </div>
      </div>
   );
}
