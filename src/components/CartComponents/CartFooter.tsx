import Link from "next/link";

export default function CartFooter({ total }: { total: number }) {
   return (
      <div className='fixed  bottom-0 bg-white z-50 '>
         <div className='customcontainer flex flex-col md:flex-row justify-between items-center md:h-28'>
            <Link href='/' scroll={false} className=' hidden md:flex w-64 justify-center py-5 border border-gray-300 text-sm'>
               VOLVER A LA TIENDA
            </Link>
            <div className='flex items-center md:gap-20 w-full'>
               <div className='flex gap-6 w-full justify-between md:justify-end py-4'>
                  <p className='md:font-semibold text-sm md:text-base'>TOTAL</p>
                  <p className='md:font-semibold text-sm md:text-base'>{total.toFixed(2)} EUR</p>
               </div>
            </div>
            <div className='flex w-full md:w-fit gap-4 pb-4'>
               <Link href='/' scroll={false} className='w-1/2 md:hidden text-center py-4 border border-gray-300 text-sm'>
                  VOLVER
               </Link>
               <button className='w-1/2 md:w-64 md:ml-6 bg-black text-white py-4 md:py-5 text-sm'>PAGAR</button>
            </div>
         </div>
      </div>
   );
}
