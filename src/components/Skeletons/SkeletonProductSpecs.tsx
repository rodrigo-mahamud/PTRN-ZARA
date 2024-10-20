import React from "react";

export default function SkeletonProductSpecs() {
   return (
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse py-32'>
         <div className='h-6 bg-gray-200 w-1/4 mb-4'></div>
         <div className='mt-4'>
            {[...Array(5)].map((_, index) => (
               <div key={index} className='py-5 sm:grid sm:grid-cols-3 sm:gap-4 border-b border-gray-300'>
                  <div className='h-4 bg-gray-200 w-2/4'></div>
                  <div className='mt-1 sm:mt-0 sm:col-span-2'>
                     <div className='h-4 bg-gray-200 w-full'></div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}
