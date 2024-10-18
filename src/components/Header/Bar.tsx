import IconCart from "@/icons/IconCart";
import Logo from "@/icons/Logo";
import React from "react";

export default function Bar() {
   return (
      <div className='container flex justify-between items-center'>
         <Logo></Logo>
         <IconCart></IconCart>
      </div>
   );
}
