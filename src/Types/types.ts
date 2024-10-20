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
   slug: boolean;
   id: string;
   brand: string;
   name: string;
   description: string;
   basePrice: number;
   rating: number;
   specs: ProductSpecs;
   colorOptions: ColorOption[];
   storageOptions: StorageOption[];
   similarProducts: SimilarProduct[];
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
