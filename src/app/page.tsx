import ProductGrid from "@/components/ProductGrid/ProductGrid";
import SkeletonProductGrid from "@/components/Skeletons/SkeletonProductGrid";
import { Suspense } from "react";
import { Metadata } from "next";

import ProductSearch from "@/components/ProductGrid/ProductSearch";
import { fetchProductsCount } from "@/utils/actions";

export const metadata: Metadata = {
   title: "Inicio | PTRN Rodrigo ",
   description:
      "Creación de una aplicación web enfocada en la visualización,búsqueda y gestión de un catálogo de teléfonos móviles. La aplicación debe permitir a los usuarios consultar detalles específicos de cada dispositivo, así como gestionar un carrito de compras de manera eficiente",
   openGraph: {
      title: "Inicio | PTRN Rodrigo ",
      siteName: "Inicio | PTRN Rodrigo ",
      url: `${process.env.VERCEL_URL}`,
      description:
         "Creación de una aplicación web enfocada en la visualización,búsqueda y gestión de un catálogo de teléfonos móviles. La aplicación debe permitir a los usuarios consultar detalles específicos de cada dispositivo, así como gestionar un carrito de compras de manera eficiente ",

      images: [`https://${process.env.VERCEL_URL}/metaogimage.png`],
      locale: "es_ES",
      type: "website",
   },
   twitter: {
      card: "summary_large_image",
      title: "Inicio | PTRN Rodrigo ",
      description:
         "Creación de una aplicación web enfocada en la visualización,búsqueda y gestión de un catálogo de teléfonos móviles. La aplicación debe permitir a los usuarios consultar detalles específicos de cada dispositivo, así como gestionar un carrito de compras de manera eficiente",
      images: [`https://${process.env.VERCEL_URL}/metaogimage.png`],
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

export default async function Home({ searchParams }: { searchParams?: { search?: string } }) {
   const search = searchParams?.search;
   const productsAmount = await fetchProductsCount(search);

   return (
      <>
         <ProductSearch productsAmount={productsAmount}></ProductSearch>
         <Suspense key={search} fallback={<SkeletonProductGrid></SkeletonProductGrid>}>
            <ProductGrid searchParam={search}></ProductGrid>
         </Suspense>
      </>
   );
}
