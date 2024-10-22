import Image from "next/image";
import { GroupedCartItem } from "@/Types/types";

type CartItemsProps = {
   items: GroupedCartItem[];
   onRemove: (id: string, selectedStorage: string, selectedColor: string) => void;
};

export default function CartItems({ items, onRemove }: CartItemsProps) {
   return (
      <>
         {items.map((group: GroupedCartItem, index: number) => (
            <div key={index} className='flex flex-col w-full mb-8'>
               <div className='flex h-32 md:h-64 gap-6 my-4'>
                  <div className='relative w-36 md:w-64'>
                     <Image
                        src={group.image}
                        alt={group.name}
                        fill
                        className='size-full object-contain'
                        quality={20}
                        sizes='(max-width: 768px) 75vw, 25vw'
                     />
                  </div>
                  <div className='flex flex-col tracking-tight h-full items-start justify-between'>
                     <div className='flex flex-col gap-1'>
                        <h2 className='text-sm md:text-lg uppercase'>
                           {group.brand} {group.name}
                        </h2>
                        <p className='text-sm '>
                           {group.selectedStorage} {group.selectedColor}
                        </p>
                        <p className='text-sm '>
                           {group.basePrice} € x {group.amount} = {group.totalItem}€
                        </p>
                     </div>
                     <button onClick={() => onRemove(group.id, group.selectedStorage, group.selectedColor)} className='px-4 py-2 text-red-500'>
                        Eliminar
                     </button>
                  </div>
               </div>
            </div>
         ))}
      </>
   );
}
