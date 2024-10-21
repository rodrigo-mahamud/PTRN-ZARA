import React from "react";

export default function SkeletonProductGrid() {
   return (
      <div className='container animate-pulse'>
         <div className='flex mt-12 flex-col w-full'>
            <div className='flex justify-start h-full items-center'>
               <div className='w-full'>
                  <div className='flex'>
                     {[...Array(5)].map((_, index) => (
                        <div key={index} className=' w-full min-w-0 border border-r-0 last:border-r border-gray-200 p-4'>
                           <div className='flex flex-col items-center justify-center'>
                              <div className='relative w-4/6 m-16 aspect-square bg-gray-200'></div>
                              <div className='flex flex-col justify-center w-full gap-3'>
                                 <div className='h-3 bg-gray-200 w-1/3'></div>
                                 <div className='flex justify-between items-center'>
                                    <div className='h-4 bg-gray-200 w-1/2'></div>
                                    <div className='h-4 bg-gray-200 w-1/4'></div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
                  <div className='flex'>
                     {[...Array(5)].map((_, index) => (
                        <div key={index} className=' w-full min-w-0 border border-r-0 last:border-r border-gray-200 p-4'>
                           <div className='flex flex-col items-center justify-center'>
                              <div className='relative w-4/6 m-16 aspect-square bg-gray-200'></div>
                              <div className='flex flex-col justify-center w-full gap-3'>
                                 <div className='h-3 bg-gray-200 w-1/3'></div>
                                 <div className='flex justify-between items-center'>
                                    <div className='h-4 bg-gray-200 w-1/2'></div>
                                    <div className='h-4 bg-gray-200 w-1/4'></div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
