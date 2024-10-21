import { ProductTypes } from "@/Types/types";
import { fetchAPI } from "@/utils/actions";
import React from "react";
import ProductCard from "./ProductCard";
import ProductSearch from "./ProductSearch";

export default async function ProductGrid({ searchParam }: { searchParam?: string }) {
   const data: ProductTypes[] = await fetchAPI("products", searchParam);
   const productsAmount = data.length;

   return (
      <>
         <ProductSearch productsAmount={productsAmount}></ProductSearch>
         <section className='container'>
            <div className='grid grid-cols-1 border-l border-t mt-12 border-black sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
               {data.map((productsData, index) => (
                  <ProductCard key={index} productsData={productsData}></ProductCard>
               ))}
            </div>
         </section>
      </>
   );
}
