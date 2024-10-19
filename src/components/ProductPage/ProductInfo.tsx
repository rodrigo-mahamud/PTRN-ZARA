import { Product } from "@/Types/types";

import ProductVariations from "./ProductVariations";
import ProductImage from "./ProductImage";
import { fetchAPI } from "@/utils/actions";

export default async function ProductInfo({ params }: { params: { segments: string[] } }) {
   const id = params.segments[params.segments.length - 1];
   const data: Product = await fetchAPI(`products/${id}`);
   return (
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
         <div className='lg:flex lg:items-start lg:space-x-8'>
            {/* Left column with image */}
            <div className='lg:w-1/2'>
               <ProductImage data={data}></ProductImage>
            </div>

            {/* Right column with product details */}
            <div className='mt-10 lg:mt-0 lg:w-1/2'>
               <h1 className='text-3xl font-extrabold tracking-tight text-gray-900'>{data.name}</h1>
               <p className='mt-3 text-base text-gray-500'>{data.description}</p>

               <p className='mt-4 text-3xl font-bold text-gray-900'>From {data.basePrice} EUR</p>

               <ProductVariations data={data}></ProductVariations>

               <div className='mt-10'>
                  <button
                     type='button'
                     className='w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
                     Add to bag
                  </button>
               </div>
            </div>
         </div>

         {/* Specifications */}
         <div className='mt-16'>
            <h2 className='text-2xl font-bold text-gray-900'>SPECIFICATIONS</h2>
            <div className='mt-4 border-t border-gray-200'>
               {Object.entries(data.specs).map(([key, value]) => (
                  <div key={key} className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-gray-200'>
                     <dt className='text-sm font-medium text-gray-500 uppercase'>{key}</dt>
                     <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>{value}</dd>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}
