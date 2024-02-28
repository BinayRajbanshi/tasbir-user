export interface Frame {
  imageName: string;
  title: string;
  price: {
    originalPrice: number;
    discountedPrice: number;
  };
}
export interface Theme {
  imageName: string;
  title: string;
}

export interface ButtonItem {
  label: string;
  index: number;
}

export interface ImageItem {
  src: string;
  alt: string;
  index: number;
}

export interface IdeaItem {
  src: string;
  alt: string;
  index: number;
}
