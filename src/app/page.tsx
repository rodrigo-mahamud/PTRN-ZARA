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
      url: `https://${process.env.ROOT_DOMAIN}`,
      description:
         "Creación de una aplicación web enfocada en la visualización,búsqueda y gestión de un catálogo de teléfonos móviles. La aplicación debe permitir a los usuarios consultar detalles específicos de cada dispositivo, así como gestionar un carrito de compras de manera eficiente ",

      images: [`https://${process.env.ROOT_DOMAIN}/metaogimage.png`],
      locale: "es_ES",
      type: "website",
   },
   twitter: {
      card: "summary_large_image",
      title: "Inicio | PTRN Rodrigo ",
      description:
         "Creación de una aplicación web enfocada en la visualización,búsqueda y gestión de un catálogo de teléfonos móviles. La aplicación debe permitir a los usuarios consultar detalles específicos de cada dispositivo, así como gestionar un carrito de compras de manera eficiente",
      images: [`https://${process.env.ROOT_DOMAIN}/metaogimage.png`],
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

export default async function Home(props: { searchParams?: Promise<{ search?: string }> }) {
   const searchParams = await props.searchParams;
   const search = searchParams?.search;
   const productsAmount = await fetchProductsCount({
      search: search,
      useCache: true,
   });

   return (
      <>
         <ProductSearch productsAmount={productsAmount}></ProductSearch>
         <Suspense key={search} fallback={<SkeletonProductGrid></SkeletonProductGrid>}>
            <ProductGrid searchParam={search}></ProductGrid>
         </Suspense>
      </>
   );
}
