"use client";
import CartFooter from "@/components/CartComponents/CartFooter";
import CartItems from "@/components/CartComponents/CartItems";
import { useCart } from "@/utils/cartContext";
import groupCartItems from "@/utils/useGroupedCartItems";

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
                  <CartItems items={groupedCartItems} onRemove={handleRemove} />
               </div>
            </div>
            <CartFooter total={total} />
         </div>
      </div>
   );
}
