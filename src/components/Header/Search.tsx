"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { fetchAPI } from "@/utils/actions";
import { ProductTypes } from "@/Types/types";

export default function Search() {
   const searchParams = useSearchParams();
   const pathName = usePathname();
   const { replace } = useRouter();
   const [resultCount, setResultCount] = useState(0);

   const handleSearch = useDebouncedCallback((term: string) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
         params.set("search", term);
      } else {
         params.delete("search");
      }
      replace(`${pathName}?${params.toString()}`);
   }, 375);

   useEffect(() => {
      const fetchResults = async () => {
         const searchTerm = searchParams.get("search")?.toString() || "";
         const data: ProductTypes[] = await fetchAPI("products", searchTerm);
         setResultCount(data.length);
      };

      fetchResults();
   }, [searchParams]);

   return (
      <div className='pt-12 w-full container'>
         <input
            defaultValue={searchParams.get("search")?.toString()}
            onChange={(e) => handleSearch(e.target.value)}
            className='w-full mb-3 py-2 focus-visible:outline-none border-b border-black'
            placeholder='Buscar smartphone...'
         />
         <span className='tracking-tight'>{resultCount} RESULTADOS</span>
      </div>
   );
}
