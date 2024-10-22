export interface ProductTypes {
   id: string;
   brand: string;
   name: string;
   basePrice: number;
   imageUrl: string;
}

export interface ProductDataTypes {
   productsData: ProductTypes;
}

//PRODUCT PAGE
export type ColorOption = {
   name: string;
   hexCode: string;
   imageUrl: string;
};

export type StorageOption = {
   capacity: string;
   price: number;
};

export type ProductSpecs = {
   screen: string;
   resolution: string;
   processor: string;
   mainCamera: string;
   selfieCamera: string;
   battery: string;
   os: string;
   screenRefreshRate: string;
};

export type SimilarProduct = {
   id: string;
   brand: string;
   name: string;
   basePrice: number;
   imageUrl: string;
};

export type Product = {
   id: string;
   brand: string;
   name: string;
   description: string;
   basePrice: number;
   rating: number;
   specs: ProductSpecs;
   colorOptions: ColorOption[];
   storageOptions: StorageOption[];
   similarProducts?: SimilarProduct[];
};

export type NormalizedImageProps = {
   src: string;
   alt: string;
   width?: number;
   height?: number;
   fill?: boolean;
   className?: string;
   sizes?: string;
   quality?: number;
   priority?: boolean;
};

export type CartItem = Product & {
   selectedColor: string;
   selectedStorage: string;
};

export type GroupedCartItem = {
   id: string;
   brand: string;
   name: string;
   basePrice: number;
   selectedColor: string;
   selectedStorage: string;
   image: string;
   amount: number;
   totalItem: number;
};

export type CartContextType = {
   cartItems: CartItem[];
   addToCart: (item: CartItem) => void;
   removeItem: (itemId: string, storage: string, color: string) => void;
   cartCount: number;
   isLoading: boolean;
};
