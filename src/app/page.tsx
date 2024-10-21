import ProductGrid from "@/components/ProductGrid/ProductGrid";
import SkeletonProductGrid from "@/components/Skeletons/SkeletonProductGrid";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Inicio | PTRN Rodrigo ",
   description: "ejmeplsf",
   openGraph: {
      title: "Inicio | PTRN Rodrigo ",
      description: "ejmeplsf",
      images: [
         {
            url: `https://${process.env.VERCEL_URL}/placeholder.png`,
            width: 1200,
            height: 630,
            alt: "Ejemplo",
         },
      ],
      locale: "es_ES",
      type: "website",
   },
   twitter: {
      card: "summary_large_image",
      title: "Inicio | PTRN Rodrigo ",
      description: "ejmeplsf",
      images: [`https://${process.env.VERCEL_URL}/placeholder.png`],
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

export default function Home({ searchParams }: { searchParams?: { search?: string } }) {
   const search = searchParams?.search;
   return (
      <Suspense key={search} fallback={<SkeletonProductGrid></SkeletonProductGrid>}>
         <ProductGrid searchParam={search}></ProductGrid>
      </Suspense>
   );
}
