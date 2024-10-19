import React from "react";

export default function ProductSpecs() {
   return (
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
   );
}
