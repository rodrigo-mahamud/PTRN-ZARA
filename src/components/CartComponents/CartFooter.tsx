import Link from "next/link";

type CartFooterProps = {
   total: number;
};

export default function CartFooter({ total }: CartFooterProps) {
   return (
      <div className='sticky bottom-0 bg-white z-50 '>
         <div className='container flex justify-between items-center h-28'>
            <Link href='/' scroll={false} className='px-14 py-5 border border-gray-300 text-sm'>
               CONTINUE SHOPPING
            </Link>
            <div className='flex items-center gap-20'>
               <div className='flex gap-6'>
                  <p className='font-semibold'>TOTAL</p>
                  <p className='font-semibold'>{total.toFixed(2)} EUR</p>
               </div>
               <button className='w-64 bg-black text-white py-5 text-sm'>PAY</button>
            </div>
         </div>
      </div>
   );
}
