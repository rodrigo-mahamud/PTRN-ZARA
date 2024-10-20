import React from "react";
import Bar from "./Bar";
import Search from "./Search";

export default function Header() {
   return (
      <header className='flex border-b-2 border-black flex-col justify-between items-center sticky top-0 w-full bg-white z-50 py-6'>
         <Bar></Bar>
         <Search></Search>
      </header>
   );
}
