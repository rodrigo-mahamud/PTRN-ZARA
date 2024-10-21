"use client";
import Image from "next/image";
import { useCart } from "@/utils/cartContext";
import Link from "next/link";
import groupCartItems from "@/utils/useGroupedCartItems";
import { GroupedCartItem } from "@/Types/types";

export default function CartPage() {
   const { cartItems, removeAllById } = useCart();

   const groupedCartItems = groupCartItems(cartItems);

   const total = groupedCartItems.reduce((sum, group) => sum + group.totalItem, 0);

   const handleRemove = (id: string) => {
      removeAllById(id);
   };

   return (
      <div className='container h-screen font-sans'>
         <div className='flex flex-col justify-between h-full pt-20'>
            <div className='mb-8'>
               <div className='flex flex-col items-start'>
                  <h1 className='text-2xl font-normal my-16'>CART ({cartItems.length})</h1>

                  {groupedCartItems.map((group: GroupedCartItem, index: number) => (
                     <div key={index} className='flex flex-col w-full mb-8'>
                        <div className='flex h-64 gap-6 my-4'>
                           <div className='relative w-64'>
                              <Image
                                 src={group.image}
                                 alt={group.name}
                                 fill
                                 className='size-full object-contain'
                                 quality={75}
                                 sizes='(max-width: 768px) 100vw, 55vw'
                              />
                           </div>
                           <div className='flex flex-col tracking-tight h-full items-start'>
                              <div className='flex flex-col'>
                                 <h2 className='text-lg'>
                                    {group.brand} {group.name}
                                 </h2>
                                 <p className='text-sm mb-4'>
                                    {group.selectedStorage} {group.selectedColor}
                                 </p>
                                 <p className='text-sm mb-4'>
                                    {group.basePrice} € x {group.amount} = {group.totalItem}€
                                 </p>
                                 <button onClick={() => handleRemove(group.id)} className='px-4 py-2 bg-red-500 text-white rounded'>
                                    Remove
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className='flex justify-between items-center mb-8'>
               <Link href='/' scroll={false} className='px-14 py-5 border border-gray-300 text-sm'>
                  CONTINUE SHOPPING
               </Link>
               <div className='flex items-center gap-20'>
                  <div className='flex gap-6'>
                     <p className=' font-semibold'>TOTAL</p>
                     <p className=' font-semibold'>{total.toFixed(2)} EUR</p>
                  </div>
                  <button className='w-64 bg-black text-white py-5 text-sm'>PAY</button>
               </div>
            </div>
         </div>
      </div>
   );
}
