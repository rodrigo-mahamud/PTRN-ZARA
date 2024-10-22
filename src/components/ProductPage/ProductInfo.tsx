import { Product } from "@/Types/types";

import ProductVariations from "./ProductVariations";
import ProductImage from "./ProductImage";
import { fetchAPI } from "@/utils/actions";

export default async function ProductInfo({ id }: { id: string }) {
   const data: Product = await fetchAPI(`products/${id}`, { useCache: false });
   return (
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24'>
         <div className='lg:flex lg:items-center lg:justify-between lg:space-x-8 h-full'>
            {/* Left column with image */}
            <div className='lg:w-1/2'>
               <ProductImage data={data}></ProductImage>
            </div>

            {/* Right column with product details */}
            <div className='flex flex-col gap-14 lg:mt-0 lg:w-fit'>
               <div className='flex flex-col gap-3'>
                  <h1 className='text-3xl font-extralight tracking-tighter uppercase'>{data.name}</h1>
                  <p className='text-xl font-light tracking-tight'>Desde {data.basePrice} EUR</p>
               </div>

               <ProductVariations data={data}></ProductVariations>
            </div>
         </div>
      </div>
   );
}
