import Image from "next/image";
import React from "react";

export default function ProductCard() {
   return (
      <div className='hoverProduct group p-4 w-full bg-red border-r border-b border-black flex flex-col items-center justify-center relative'>
         <Image
            src='/placeholder.png'
            width={500}
            height={500}
            className='w-full object-cover'
            quality={25}
            sizes='(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 35vw'
            alt='some'
         />
         <div className='flex flex-col justify-center w-full gap-2 group-hover:invert ease-in-out duration-300'>
            <span className='line-clamp-1 text-muted text-xxs uppercase tracking-tight '>Apple</span>
            <div className='flex justify-between items-center'>
               <h2 className='uppercase line-clamp-1 text-xs'>IPHONE 15 pro</h2>
               <h3 className='uppercase line-clamp-1 text-xs'>1290 eur</h3>
            </div>
         </div>
      </div>
   );
}
