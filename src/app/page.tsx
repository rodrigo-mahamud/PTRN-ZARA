import ProductGrid from "@/components/ProductGrid/ProductGrid";
import SkeletonProductGrid from "@/components/Skeletons/SkeletonProductGrid";
import { Suspense } from "react";

export default function Home({ searchParams }: { searchParams?: { search?: string } }) {
   const search = searchParams?.search;
   return (
      <Suspense key={search} fallback={<SkeletonProductGrid></SkeletonProductGrid>}>
         <ProductGrid searchParam={search}></ProductGrid>
      </Suspense>
   );
}
