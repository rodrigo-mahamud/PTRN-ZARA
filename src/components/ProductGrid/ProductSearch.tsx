"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect } from "react";

export default function ProductSearch({ productsAmount }: { productsAmount: number }) {
   const searchParams = useSearchParams();
   const pathName = usePathname();
   const { replace } = useRouter();
   const [searchTerm, setSearchTerm] = useState("");

   useEffect(() => {
      setSearchTerm(searchParams.get("search") || "");
   }, [searchParams]);

   const handleSearch = useDebouncedCallback((term: string) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
         params.set("search", term);
      } else {
         params.delete("search");
      }
      replace(`${pathName}?${params.toString()}`);
   }, 375);

   const clearSearch = () => {
      setSearchTerm("");
      const params = new URLSearchParams(searchParams);
      params.delete("search");
      replace(`${pathName}?${params.toString()}`);
   };

   return (
      <div className='sticky top-20 bg-white z-50 w-full'>
         <div className='py-6 w-full customcontainer'>
            <div className='flex items-center'>
               <input
                  value={searchTerm}
                  onChange={(e) => {
                     setSearchTerm(e.target.value);
                     handleSearch(e.target.value);
                  }}
                  className='w-full mb-3 py-2 focus-visible:outline-none border-b border-black'
                  placeholder='Buscar smartphone...'
               />
               {searchTerm && (
                  <button onClick={clearSearch} className='-ml-3'>
                     x
                  </button>
               )}
            </div>
            <span className='tracking-tight text-sm font-light'>{productsAmount} RESULTADOS</span>
         </div>
      </div>
   );
}
