import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header/Header";
import { Toaster } from "sonner";
import { CartProvider } from "@/utils/cartContext";

const helveticaNeue = localFont({
   src: [
      {
         path: "./fonts/HelveticaNeueUltraLight.ttf",
         weight: "200",
         style: "normal",
      },
      {
         path: "./fonts/HelveticaNeueUltraLightItal.ttf",
         weight: "200",
         style: "italic",
      },
      {
         path: "./fonts/HelveticaNeueLight.ttf",
         weight: "300",
         style: "normal",
      },
      {
         path: "./fonts/HelveticaNeueLightItalic.ttf",
         weight: "300",
         style: "italic",
      },
      {
         path: "./fonts/HelveticaNeueMedium.ttf",
         weight: "500",
         style: "normal",
      },
      {
         path: "./fonts/HelveticaNeueBold.ttf",
         weight: "700",
         style: "normal",
      },
      {
         path: "./fonts/HelveticaNeueBoldItalic.ttf",
         weight: "700",
         style: "italic",
      },
      {
         path: "./fonts/HelveticaNeueCondensedBlack.ttf",
         weight: "900",
         style: "normal",
      },
      {
         path: "./fonts/HelveticaBlkIt.ttf",
         weight: "900",
         style: "italic",
      },
      {
         path: "./fonts/HelveticaNeueItalic.ttf",
         weight: "400",
         style: "italic",
      },
      {
         path: "./fonts/HelveticaNeueCondensedBold.ttf",
         weight: "600",
         style: "normal",
      },
   ],
   variable: "--font-helvetica-neue",
});

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang='es'>
         <body className={`${helveticaNeue.variable} arial sans-serif antialiased `}>
            <CartProvider>
               <Toaster
                  richColors
                  toastOptions={{
                     style: {
                        borderRadius: "0",
                     },
                  }}></Toaster>
               <Header></Header>
               {children}
            </CartProvider>
         </body>
      </html>
   );
}
