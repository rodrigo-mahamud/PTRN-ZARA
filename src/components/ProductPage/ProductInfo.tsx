import { Product } from "@/Types/types";

import ProductVariations from "./ProductVariations";
import ProductImage from "./ProductImage";
import { fetchAPI } from "@/utils/actions";

export default async function ProductInfo({ params }: { params: { segments: string[] } }) {
   const id = params.segments[params.segments.length - 1];
   const data: Product = await fetchAPI(`products/${id}`);
   return (
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 h-[80vh]'>
         <div className='lg:flex lg:items-center lg:justify-between lg:space-x-8 h-full'>
            {/* Left column with image */}
            <div className='lg:w-1/2'>
               <ProductImage data={data}></ProductImage>
            </div>

            {/* Right column with product details */}
            <div className='mt-10 lg:mt-0 lg:w-fit'>
               <h1 className='text-3xl font-extralight tracking-tighter uppercase'>{data.name}</h1>
               <p className='mt-3 mb-20 text-2xl font-light tracking-tight'>From {data.basePrice} EUR</p>

               <ProductVariations data={data}></ProductVariations>

               <div className='mt-20'>
                  <button
                     type='button'
                     className='w-full bg-black/5 py-4 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-black'>
                     Add to bag
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
