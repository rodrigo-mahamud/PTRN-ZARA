import React, { Suspense } from "react";
import Bar from "./Bar";
import Search from "./Search";

export default function Header() {
   return (
      <header className='flex flex-col justify-between items-center sticky top-0 w-full bg-white z-50 py-6'>
         <Bar></Bar>
         <Suspense fallback={"...loading"}>
            <Search></Search>
         </Suspense>
      </header>
   );
}
