"use client";
import Logo from "@/icons/Logo";
import CartButton from "../Cart/CartButton";
import { usePathname } from "next/navigation";

export default function Header() {
   const pathname = usePathname();
   const isCartPage = pathname === "/cart";

   return (
      <header
         className={`flex flex-col justify-between items-center top-0 w-full bg-white z-50 h-20 ${
            isCartPage ? "border-b border-black  fixed" : "sticky"
         }`}>
         <div className='container flex justify-between items-center h-full'>
            <Logo></Logo>
            <CartButton></CartButton>
         </div>
      </header>
   );
}
