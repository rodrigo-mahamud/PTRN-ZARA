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
import { Metadata } from "next";

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

export async function generateMetadata({ params }: { params: { segments: string[] } }): Promise<Metadata> {
   const id = params.segments[params.segments.length - 1];
   const product: Product = await fetchAPI(`products/${id}`);

   return {
      title: `${product.brand} ${product.name} | PTRN Rodrigo`,
      description: `Detalles del ${product.brand} ${product.name}. ${product.description.slice(0, 150)}...`,
      openGraph: {
         title: `${product.brand} ${product.name} | PTRN Rodrigo`,
         siteName: "PTRN Rodrigo",
         url: `${process.env.VERCEL_URL}/${formatSlug(product.brand, product.name)}/${product.id}`,
         description: `Detalles del ${product.brand} ${product.name}. ${product.description.slice(0, 150)}...`,
         images: [{ url: product.colorOptions[0].imageUrl }],
         locale: "es_ES",
         type: "website",
      },
      twitter: {
         card: "summary_large_image",
         title: `${product.brand} ${product.name} | PTRN Rodrigo`,
         description: `Detalles del ${product.brand} ${product.name}. ${product.description.slice(0, 150)}...`,
         images: [product.colorOptions[0].imageUrl],
      },
      icons: [
         {
            url: "/images/favicon.ico",
            media: "(prefers-color-scheme: dark)",
         },
         {
            url: "/images/favicondark.ico",
            media: "(prefers-color-scheme: light)",
         },
      ],
   };
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
