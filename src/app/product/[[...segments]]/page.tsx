import ProductInfo from "@/components/ProductPage/ProductInfo";
import { Suspense } from "react";

export default async function ProductPage({ params }: { params: { segments: string[] } }) {
   return (
      <div>
         <Suspense fallback='...Loading'>
            <ProductInfo params={params} />
         </Suspense>
      </div>
   );
}
