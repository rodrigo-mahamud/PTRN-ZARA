import Link from "next/link";
import React from "react";

export default function NotFound() {
   return (
      <section className='bg-white'>
         <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
            <div className='mx-auto max-w-screen-sm text-center'>
               <h1 className='mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500'>404</h1>
               <p className='mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl '>UPS! Página no encontrada</p>
               <p className='mb-4 text-lg font-light text-gray-500 '>La pagina a la que estas accediendo no exsiste.</p>
               <Link href='/' className='inline-flex text-black border border-gray-300  hover:bg-black hover:text-white px-5 py-2.5 text-center my-4'>
                  Volver a inicio
               </Link>
            </div>
         </div>
      </section>
   );
}
