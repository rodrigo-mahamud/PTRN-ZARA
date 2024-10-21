"use client";
import CartFooter from "@/components/CartComponents/CartFooter";
import CartItems from "@/components/CartComponents/CartItems";
import { useCart } from "@/utils/cartContext";
import groupCartItems from "@/utils/useGroupedCartItems";

export default function CartClientWrapper() {
   const { cartItems, removeAllById } = useCart();
   const groupedCartItems = groupCartItems(cartItems);
   const total = groupedCartItems.reduce((sum, group) => sum + group.totalItem, 0);

   const handleRemove = (id: string) => {
      removeAllById(id);
   };

   return (
      <>
         <div className='customcontainer h-screen font-sans w-screen'>
            <div className='flex flex-col justify-between py-20'>
               <div className='md:mb-8'>
                  <div className='flex flex-col items-start'>
                     <h1 className='text-2xl font-normal my-8 md:my-16'>CART ({cartItems.length})</h1>
                     <CartItems items={groupedCartItems} onRemove={handleRemove} />
                  </div>
               </div>
            </div>
            <CartFooter total={total} />
         </div>
      </>
   );
}
