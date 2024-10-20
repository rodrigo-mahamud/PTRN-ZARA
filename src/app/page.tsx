import ProductGrid from "@/components/ProductGrid/ProductGrid";
import { Suspense } from "react";

export default function Home({ searchParams }: { searchParams?: { search?: string } }) {
   const search = searchParams?.search;
   return (
      <Suspense key={search} fallback={"....loading"}>
         <ProductGrid searchParam={search}></ProductGrid>
      </Suspense>
   );
}
