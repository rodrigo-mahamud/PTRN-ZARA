// En tu componente del servidor
import { Product } from "@/Types/types";
import { fetchAPI, processImage } from "@/utils/actions";
import ProductsCarrousel from "./ProductsCarrousel";

export default async function ProductRelated({ id }: { id: string }) {
   const data: Product = await fetchAPI(`products/${id}`);

   if (!data || !data.similarProducts || data.similarProducts.length === 0) {
      return null;
   }

   const processedSimilarProducts = await Promise.all(
      data.similarProducts.map(async (product) => {
         const processedImageUrl = await processImage(product.imageUrl);
         return { ...product, processedImageUrl };
      })
   );
   console.log(processedSimilarProducts);

   return (
      <div className='pb-48 pt-24 overflow-hidden'>
         <div className='max-w-7xl mx-auto'>
            <h2 className='text-xl font-light tracking-tight'>PRODUCTOS SIMILARES</h2>
            <ProductsCarrousel similarProducts={processedSimilarProducts} />
         </div>
      </div>
   );
}
