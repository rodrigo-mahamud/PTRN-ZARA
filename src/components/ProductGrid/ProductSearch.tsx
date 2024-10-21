"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function ProductSearch({ productsAmount }: { productsAmount: number }) {
   const searchParams = useSearchParams();
   const pathName = usePathname();
   const { replace } = useRouter();

   const handleSearch = useDebouncedCallback((term: string) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
         params.set("search", term);
      } else {
         params.delete("search");
      }
      replace(`${pathName}?${params.toString()}`);
   }, 375);

   return (
      <div className='sticky top-20 bg-white z-50 w-full'>
         <div className='py-6 w-full container'>
            <input
               defaultValue={searchParams.get("search")?.toString()}
               onChange={(e) => handleSearch(e.target.value)}
               className='w-full mb-3 py-2 focus-visible:outline-none border-b border-black'
               placeholder='Buscar smartphone...'
            />
            <span className='tracking-tight'>{productsAmount} RESULTADOS</span>
         </div>
      </div>
   );
}
