export interface Banner {
  imageName: string;
}

export interface Settings {
  dots: boolean;
  arrows: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  prevArrow: any;
  nextArrow: any;
  beforeChange: (current: number, next: number) => void;
}

// export interface Product {
//   imageName: string;
//   title: string;
//   discount: string | null;
//   price: {
//     originalPrice: number;
//     discountedPrice: number | null;
//   };
// }

export interface Product {
  id: number;
  name: string;
  price: string;
  specialPrice: string | null;
  files: {
    fileThumbnailUrl: string;
    pivot: {
      model_id: number;
      file_id: number;
      model_type: string;
      id: number;
      zone: string;
      created_at: string;
      updated_at: string;
    };
  }[];
  slug: string;
}
