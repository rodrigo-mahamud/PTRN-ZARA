// __mocks__/cartMocks.ts
import { GroupedCartItem } from "@/Types/types";
import { vi } from "vitest";

export const mockCartItems: GroupedCartItem[] = [
   {
      id: "1",
      brand: "Apple",
      name: "iPhone 12",
      image: "/mock-image.jpg",
      selectedStorage: "128GB",
      selectedColor: "Black",
      basePrice: 799,
      amount: 1,
      totalItem: 799,
   },
   {
      id: "2",
      brand: "Samsung",
      name: "Galaxy S21",
      image: "/mock-image-2.jpg",
      selectedStorage: "256GB",
      selectedColor: "Blue",
      basePrice: 899,
      amount: 2,
      totalItem: 1798,
   },
];

export const mockCartContext = {
   cartItems: mockCartItems,
   addToCart: vi.fn(),
   removeFromCart: vi.fn(),
   cartCount: 3,
   isLoading: false,
   total: 2597,
};

// Mock de la respuesta de la API
export const mockApiResponse = {
   id: "1",
   brand: "Apple",
   name: "iPhone 12",
   image: "https://example.com/iphone12.jpg",
   price: 799,
   storage: ["128GB", "256GB"],
   colors: ["Black", "White"],
};

// Mock de las server actions
export const mockActions = {
   fetchAPI: vi.fn().mockResolvedValue(mockApiResponse),
   fetchProductsCount: vi.fn().mockResolvedValue(10),
   processImage: vi.fn().mockResolvedValue("data:image/webp;base64,mockBase64String"),
};
