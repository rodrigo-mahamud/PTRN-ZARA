export default function SkeletonProductInfo() {
   return (
      <div className='max-w-7xl py-32 mx-auto px-4 sm:px-6 lg:px-8 animate-pulse'>
         <div className='lg:flex lg:items-center lg:justify-between lg:space-x-8 h-full'>
            {/* Left column with image skeleton */}
            <div className='lg:w-5/12'>
               <div className='aspect-square bg-gray-200'></div>
            </div>

            {/* Right column with product details skeleton */}
            <div className='flex flex-col gap-14 w-[30%]'>
               <div className='flex flex-col gap-5'>
                  <div className='h-8 bg-gray-200 w-3/4'></div>
                  <div className='h-5 bg-gray-200 w-1/2'></div>
               </div>

               {/* Product variations skeleton */}
               <div className='flex flex-col gap-8'>
                  <div className='flex flex-col w-full gap-4'>
                     <div className='h-8 bg-gray-200'></div>
                     <div className='flex'>
                        {[...Array(3)].map((_, index) => (
                           <div key={`variation-${index}`} className='h-16 w-full border border-gray-300 bg-gray-200'></div>
                        ))}
                     </div>
                  </div>
                  <div className='flex flex-col w-full gap-4'>
                     <div className='h-8 bg-gray-200'></div>
                     <div className='flex gap-4'>
                        {[...Array(4)].map((_, index) => (
                           <div key={`color-${index}`} className='h-8 w-8 border border-gray-300 bg-gray-200'></div>
                        ))}
                     </div>
                     <div className='h-4 w-28 bg-gray-200'></div>
                  </div>
               </div>
               <div className='h-14 bg-gray-200 w-full'></div>
            </div>
         </div>
      </div>
   );
}
