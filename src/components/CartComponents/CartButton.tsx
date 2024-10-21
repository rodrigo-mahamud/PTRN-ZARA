"use client";
import IconCart from "@/icons/IconCart";
import { useCart } from "@/utils/cartContext";
import Link from "next/link";
import React from "react";

export default function CartButton() {
   const { cartCount, isLoading } = useCart();

   if (isLoading) {
      return (
         <div className='relative'>
            <IconCart />
         </div>
      );
   }

   return (
      <Link href='/cart' className='relative flex gap-2 items-center'>
         <IconCart />

         {cartCount > 0 && <span className='text-sm'>{cartCount}</span>}
      </Link>
   );
}
