import ProductInfo from "@/components/ProductPage/ProductInfo";
import ProductRelated from "@/components/ProductPage/ProductRelated";
import ProductSpecs from "@/components/ProductPage/ProductSpecs";
import { Suspense } from "react";

export default async function ProductPage({ params }: { params: { segments: string[] } }) {
   const id = params.segments[params.segments.length - 1];

   return (
      <>
         <Suspense fallback='...Loading'>
            <ProductInfo id={id} />
         </Suspense>
         <Suspense fallback='...Loading'>
            <ProductSpecs id={id} />
         </Suspense>
         <Suspense fallback='...Loading'>
            <ProductRelated id={id} />
         </Suspense>
      </>
   );
}
