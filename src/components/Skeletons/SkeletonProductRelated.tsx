import React from "react";

export default function SkeletonProductRelated() {
   return (
      <div className='pb-64 pt-32 overflow-hidden animate-pulse'>
         <div className='max-w-7xl mx-auto'>
            <div className='h-6 bg-gray-200 w-48 mb-8'></div>
            <div className='flex flex-col w-full mt-8'>
               <div className='flex justify-start h-full items-center'>
                  <div className='w-full'>
                     <div className='flex'>
                        {[...Array(5)].map((_, index) => (
                           <div key={index} className='flex-[0_0_28%] min-w-0 border border-r-0 last:border-r border-gray-200 p-4'>
                              <div className='flex flex-col items-center justify-center'>
                                 <div className='relative w-4/6 m-20 aspect-square bg-gray-200'></div>
                                 <div className='flex flex-col justify-center w-full gap-2'>
                                    <div className='h-3 bg-gray-200 w-1/2'></div>
                                    <div className='flex justify-between items-center'>
                                       <div className='h-4 bg-gray-200 w-1/3'></div>
                                       <div className='h-4 bg-gray-200 w-1/4'></div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
               <div className='w-full h-0.5 bg-gray-200 mt-12'>
                  <div className='h-full bg-gray-300 w-1/3'></div>
               </div>
            </div>
         </div>
      </div>
   );
}
