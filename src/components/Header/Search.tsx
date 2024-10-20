"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
   const searchParams = useSearchParams();
   const PathName = usePathname();
   const { replace } = useRouter();

   const handleSearch = useDebouncedCallback((term: string) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
         params.set("search", term);
      } else {
         params.delete("search");
      }
      replace(`${PathName}?${params.toString()}`);
   }, 375);

   return (
      <div className='pt-6 w-full container'>
         <input
            defaultValue={searchParams.get("search")?.toString()}
            onChange={(e) => handleSearch(e.target.value)}
            className='w-full'
            placeholder='Buscar smartphonme'></input>
         <span>X resultados</span>
      </div>
   );
}
