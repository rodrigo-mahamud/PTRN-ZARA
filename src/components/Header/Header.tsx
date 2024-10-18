import React from "react";
import Bar from "./Bar";

export default function Header() {
   return (
      <header className='flex justify-between h-20 items-center sticky top-0 w-full bg-white z-50'>
         <Bar></Bar>
      </header>
   );
}
