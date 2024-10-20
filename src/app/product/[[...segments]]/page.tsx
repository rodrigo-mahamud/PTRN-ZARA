import ProductInfo from "@/components/ProductPage/ProductInfo";
import ProductRelated from "@/components/ProductPage/ProductRelated";
import ProductSpecs from "@/components/ProductPage/ProductSpecs";
import SkeletonProductInfo from "@/components/Skeletons/SkeletonProductInfo";
import SkeletonProductRelated from "@/components/Skeletons/SkeletonProductGrid";
import SkeletonProductSpecs from "@/components/Skeletons/SkeletonProductSpecs";
import { Suspense } from "react";
import { Product } from "@/Types/types";
import { fetchAPI } from "@/utils/actions";
import formatSlug from "@/utils/formatSlug";

async function getAllProducts(): Promise<Product[]> {
   const products: Product[] = await fetchAPI("products");
   return products;
}
export async function generateStaticParams() {
   const products = await getAllProducts();
   return products.map((product) => ({
      segments: [formatSlug(product.brand, product.name), product.id],
   }));
}

export default async function ProductPage({ params }: { params: { segments: string[] } }) {
   const id = params.segments[params.segments.length - 1];

   return (
      <>
         <Suspense fallback={<SkeletonProductInfo></SkeletonProductInfo>}>
            <ProductInfo id={id} />
         </Suspense>
         <Suspense fallback={<SkeletonProductSpecs></SkeletonProductSpecs>}>
            <ProductSpecs id={id} />
         </Suspense>
         <Suspense fallback={<SkeletonProductRelated></SkeletonProductRelated>}>
            <ProductRelated id={id} />
         </Suspense>
      </>
   );
}
