import { CartItem, GroupedCartItem } from "@/Types/types";

export default function groupCartItems(cartItems: CartItem[]): GroupedCartItem[] {
   const groupedItems = cartItems.reduce<Record<string, GroupedCartItem>>((acc, item) => {
      const key = `${item.id}-${item.selectedColor}-${item.selectedStorage}`;

      if (!acc[key]) {
         const selectedColorOption = item.colorOptions.find((option) => option.name === item.selectedColor);

         acc[key] = {
            id: item.id,
            name: item.name,
            brand: item.brand,
            amount: 1,
            basePrice: item.basePrice,
            selectedColor: item.selectedColor,
            selectedStorage: item.selectedStorage,
            image: selectedColorOption ? selectedColorOption.imageUrl : "",
            totalItem: item.basePrice,
         };
      } else {
         acc[key].amount += 1;
         acc[key].totalItem = acc[key].basePrice * acc[key].amount;
      }

      return acc;
   }, {});

   return Object.values(groupedItems);
}
