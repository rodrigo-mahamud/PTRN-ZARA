import CartClientWrapper from "@/components/CartComponents/CartClientWrapper";

import { Metadata } from "next";
export const metadata: Metadata = {
   title: "Carrito | PTRN Rodrigo ",
   description:
      "Creación de una aplicación web enfocada en la visualización,búsqueda y gestión de un catálogo de teléfonos móviles. La aplicación debe permitir a los usuarios consultar detalles específicos de cada dispositivo, así como gestionar un carrito de compras de manera eficiente",
   openGraph: {
      title: "Carrito | PTRN Rodrigo ",
      siteName: "Carrito | PTRN Rodrigo ",
      url: `${process.env.VERCEL_URL}`,
      description:
         "Creación de una aplicación web enfocada en la visualización,búsqueda y gestión de un catálogo de teléfonos móviles. La aplicación debe permitir a los usuarios consultar detalles específicos de cada dispositivo, así como gestionar un carrito de compras de manera eficiente ",

      images: [`https://${process.env.VERCEL_URL}/metaogimage.png`],
      locale: "es_ES",
      type: "website",
   },
   twitter: {
      card: "summary_large_image",
      title: "Carrito | PTRN Rodrigo ",
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
export default function CartPage() {
   return <CartClientWrapper></CartClientWrapper>;
}
