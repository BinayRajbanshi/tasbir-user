export interface ProductAttribute {
  id: number;
  product_id: number;
  attribute_id: number;
  attribute: {
    id: number;
    name: string;
  };
  values: any[];
}

export interface ProductVariantValue {
  id: number;
  size: string;
  originalPrice: string;
  discountedPrice: string;
  product_variant_id: number;
  images: {
    id: number;
    baseImage: string;
    pivot: {
      model_id: number;
      file_id: number;
    };
  }[];
}

export interface ProductVariant {
  id: number;
  name: string;
  Url: string;
  isRequired: number;
  values: ProductVariantValue[];
  images: {
    id: number;
    baseImage: string;
    pivot: {
      model_id: number;
      file_id: number;
    };
  }[];
}

export interface ProductMediaFile {
  baseImage: string;
  additionalImage?: string[];
}

export interface ProductDetail {
  id: number;
  name: string;
  url: string;
  description: string;
  price: string;
  specialPrice: string;
  sku: string;
  inStock: number;
  shortDescription: string;
  attributes: ProductAttribute[];
  mediaFiles: ProductMediaFile[];
  variants: { variant: ProductVariant }[];
  relatedProductData: any[];
  upSellProductData: any[];
  crossSellProductData: any[];
}

export interface ApiResponse {
  code: number;
  message: string;
  data: ProductDetail;
}
