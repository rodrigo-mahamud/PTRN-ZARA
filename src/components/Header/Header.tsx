"use client";
import Logo from "@/icons/Logo";
import CartButton from "../Cart/CartButton";

export default function Header() {
   return (
      <header className='flex flex-col justify-between items-center sticky top-0 w-full bg-white z-50 h-20'>
         <div className='container flex justify-between items-center h-full'>
            <Logo></Logo>
            <CartButton></CartButton>
         </div>
      </header>
   );
}
