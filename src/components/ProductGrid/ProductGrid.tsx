import { ProductTypes } from "@/Types/types";
import React from "react";
import ProductCard from "./ProductCard";

import { fetchAPI } from "@/utils/actions";

export default async function ProductGrid({ searchParam }: { searchParam?: string }) {
   const data: ProductTypes[] = await fetchAPI<ProductTypes[]>("products", {
      search: searchParam,
      useCache: true,
   });

   return (
      <>
         <section className='customcontainer'>
            <div className='grid grid-cols-1 border-l border-t mt-6 mb-12 border-black sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
               {data.map((productsData, index) => (
                  <ProductCard key={index} productsData={productsData}></ProductCard>
               ))}
            </div>
         </section>
      </>
   );
}
