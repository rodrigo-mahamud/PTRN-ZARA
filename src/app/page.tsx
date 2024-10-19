import ProductCard from "@/components/ProductGrid/ProductCard";
import { ProductTypes } from "@/Types/types";
import { fetchAPI } from "@/utils/actions";

export default async function Home() {
   const data: ProductTypes[] = await fetchAPI("products");
   return (
      <section className='container'>
         <div className='grid grid-cols-1 border-l border-t mt-12 border-black sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {data.map((productsData, index) => (
               <ProductCard key={index} productsData={productsData}></ProductCard>
            ))}
         </div>
      </section>
   );
}
